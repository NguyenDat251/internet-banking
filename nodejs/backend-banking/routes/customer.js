const express = require('express');
const customerModel = require('../models/customer.model');
const creditAccountModel = require('../models/credit_account.model');
const savingAccountModel = require('../models/saving_account.model');
const otpModel = require('../models/transaction_otp.model');
const resetPassOtpModel = require('../models/reset_password_otp.model');
const transactionModel = require('../models/transaction.models');
const remindListModel = require('../models/remind.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');

const config = require('../utils/config');
const mustache = require('mustache');
const fs = require('fs');
const nodemailer = require('nodemailer');

const router = express.Router();

const authenLoginCustomer = async (req, res, next) => {
  const username = req.body["username"];
  const plain_password = req.body["password"];
  let result

  result = await customerModel.searchByUserName(username);

  const customerInfo = result[0]
  if (customerInfo === undefined) {
    res.status(401).json({ "err": "invalid username" });
    return;
  }

  result = await bcrypt.compare(plain_password, customerInfo["hashed_password"]);
  if (result === false) { // not match password hash
    res.status(401).json({ "err": "invalid password" });
    return;
  }
  req.headers["customerInfo"] = customerInfo;
  next();
}


const authenJWT = async (req, res, next) => {
  const accesstoken = req.headers["access_token"];
  const secret_text = config["secret_text"];

  let decoded;
  try {
    decoded = await jwt.verify(accesstoken, secret_text);
  } catch (err) {
    res.status(401).json({ "err": err });
    return;
  }

  req.body["customer_id"] = decoded["customer_id"];

  next();
}

const verifyOTP = async (req, res, next) => {
  const transaction_id = req.body["transaction_id"];
  const otp = req.body["otp"];
  let result;
  try {
    result = await otpModel.searchTransaction(transaction_id);
  } catch (err) {
    res.status(401).json({ "err": "invalid transaction_id" });
    return;
  }

  if (result.length === 0 || result === undefined) {
    res.status(401).json({ "err": "invalid transaction_id" });
    return
  }

  const transaction = result[0];

  if (transaction["status"] !== "pending") {  // this transaction invalid
    res.status(401).json({ "err": "transaction already success or being canceled" });
    return
  }

  if (otp != transaction["otp"]) {
    res.status(401).json({ "err": "invalid otp" });
    return;
  }

  const current_ts = Math.floor(Date.now() / 1000);
  if (current_ts - transaction["ts"] > config["otp_exp"]) { // otp expired
    res.status(401).json({ "err": "otp expired" });
    return;
  }

  req.body = transaction;
  next();
}

/* GET fullname of credit account owner */
router.get("/get-credit-info", authenJWT, async (req, res) => {
  const credit_number = req.query["credit_number"];

  let result;
  try {
    result = await customerModel.searchByCreditNumber(credit_number);
  } catch (err) {
    res.status(401).json({ "err": "invalid credit_number" });
    return;
  }
  const creditInfo = result[0];

  res.status(200).json({ "firstname": creditInfo["firstname"], "lastname": creditInfo["lastname"] });
})

/* POST request login */
router.post("/login", authenLoginCustomer, async (req, res) => {
  const secret_text = config["secret_text"];
  const accesstoken_exp = config["accesstoken_exp"];
  const refreshtoken_exp = config["refreshtoken_exp"];

  const customerInfo = req.headers["customerInfo"];
  const customer_id = customerInfo["customer_id"];
  const refresh_secret = customerInfo["refresh_secret"];

  const accesstoken = jwt.sign({ customer_id: customer_id }, secret_text, { expiresIn: accesstoken_exp });

  const refreshtoken = jwt.sign({ customer_id: customer_id }, refresh_secret, { expiresIn: refreshtoken_exp });

  res.status(200).json({ "access_token": accesstoken, "refresh_token": refreshtoken });
})

/* POST request local transfer */
router.post("/transfer-fund", authenJWT, async (req, res) => {
  let result;
  const customer_id = req.body["customer_id"];

  const from_credit_number = req.body["from_credit_number"];
  const to_credit_number = req.body["to_credit_number"];
  const amount = req.body["amount"];
  const target_fullname = req.body["target_fullname"].toUpperCase();

  try {
    result = await customerModel.searchByCreditNumber(from_credit_number);
  } catch (err) {
    res.status(401).json({ "err": "invalid from_credit_number" });
    return;
  }
  const from_customer_info = result[0];

  if (req.body["partner_code"] === "local") { // verify to_customer_info (local transfer only)
    try {
      result = await customerModel.searchByCreditNumber(to_credit_number);
    } catch (err) {
      res.status(401).json({ "err": "invalid to_credit_number" });
      return;
    }
    const to_customer_info = result[0];
    const fullName = to_customer_info["lastname"] + " " + to_customer_info["firstname"];
    if (fullName.toUpperCase() != target_fullname) {
      res.status(401).json({ "err": "target_fullname value and to_credit_number info not match" });
      return;
    }
  }

  // verify request
  if (from_customer_info["customer_id"] != customer_id) {
    res.status(401).json({ "err": "from_credit_number value and customer_id not match" });
    return;
  }

  result = await creditAccountModel.searchByAccountNumber(from_credit_number);
  const credit_info = result[0];
  if (credit_info["balance"] - amount < 50000) {
    res.status(401).json({ "err": "balance insufficient" });
    return;
  }

  try {
    result = await otpModel.add(req.body);
  } catch (err) {
    res.status(401).json({ "err": "can not create otp" });
    return;
  }

  const transaction_id = result["insertId"];
  result = await otpModel.searchTransaction(transaction_id);
  transactionInfo = result[0];
  const otp = transactionInfo["otp"];
  const template = fs.readFileSync('./template/email/otp.html', 'utf8');
  const html = mustache.render(template, { otp: otp });
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config["bankmail_address"],
      pass: config["bankmail_password"]
    }
  });

  const mailOptions = {
    from: "no-reply <kianto@bank.com>",
    to: from_customer_info["email_address"],
    subject: 'KiantoBank Email OTP verification !!!',
    html: html
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    res.status(401).json({ "err": err });
    return;
  }

  res.status(200).json({ "transaction_id": transaction_id });
})

/* POST request verify transaction id */
router.post("/verify-otp", authenJWT, verifyOTP, async (req, res) => {
  const transaction_id = req.body["transaction_id"];
  const from_credit_number = req.body["from_credit_number"];
  const to_credit_number = req.body["to_credit_number"];
  let amount = req.body["amount"];
  const fee_payer = req.body["fee_payer"];
  const partner_code = req.body["partner_code"];
  const message = req.body["message"] || "";
  let transfer_fee;

  result = await creditAccountModel.searchByAccountNumber(from_credit_number);
  const credit_info = result[0];
  if (credit_info["balance"] - amount < 50000) {
    res.status(401).json({ "err": "balance insufficient" });
    return;
  }

  if (partner_code === "local") {
    transfer_fee = config["local_transfer_fee"];
  } else {
    transfer_fee = config["interbank_transfer_fee"];
    res.status(401).json({ "err": "chua ho tro tinh nang interbank nhe anh em" });
    return;
  }

  if (fee_payer === "sender") {
    amount += transfer_fee;
  }

  otpModel.updateTransactionStatus(transaction_id, "success");
  creditAccountModel.withdraw(from_credit_number, amount);
  creditAccountModel.deposit(to_credit_number, amount - transfer_fee);
  transactionModel.add_sent_to_history({
    credit_number: from_credit_number,
    to_credit_number: to_credit_number,
    amount: amount - transfer_fee,
    message: message,
    partner_code: partner_code
  })
  transactionModel.add_receive_from_history({
    credit_number: to_credit_number,
    from_credit_number: from_credit_number,
    amount: amount - transfer_fee,
    message: message,
    partner_code: partner_code
  })

  res.status(200).json({ "msg": "transaction success" });

})

/* GET request get list account */
router.get("/get-list-account", authenJWT, async (req, res) => {
  const customer_id = req.body["customer_id"];

  const list_cre_acc = await creditAccountModel.searchByCustomerId(customer_id);
  const list_save_acc = await savingAccountModel.searchByCustomerId(customer_id);
  res.status(200).json({ "credit_account": list_cre_acc, "saving_account": list_save_acc });
})

/* POST request forget password */
router.post("/reset-password", async (req, res) => {
  const username = req.body["username"];
  const identity_number = req.body["identity_number"];
  let result;

  try {
    result = await customerModel.searchByUserName(username);
  } catch{
    res.status(401).json({ "message": "can not verify username" });
  }
  if (result.length === 0 || result === undefined) {
    res.status(401).json({ "err": "invalid username" });
    return;
  }

  const customerInfo = result[0];
  if (customerInfo["identity_number"] !== identity_number) {
    res.status(401).json({ "err": "invalid identity number" });
    return;
  }

  try {
    result = await resetPassOtpModel.add({ "customer_id": customerInfo["customer_id"] });
  } catch{
    res.status(401).json({ "err": "can not complete reset password action" });
    return;
  }
  const reset_id = result["insertId"];

  const otp = randomstring.generate({
    length: 6,
    charset: 'numeric'
  });
  const template = fs.readFileSync('./template/email/reset-pass-otp.html', 'utf8');
  const html = mustache.render(template, { otp: otp });
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: false,
    secure: false,
    service: 'gmail',
    auth: {
      user: config["bankmail_address"],
      pass: config["bankmail_password"]
    }
  });

  const mailOptions = {
    from: "no-reply <kianto@bank.com>",
    to: customerInfo["email_address"],
    subject: 'KiantoBank Email OTP verification !!!',
    html: html
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    res.status(401).json({ "err": err });
    return;
  }

  res.status(200).json({ "reset_id": reset_id });
})

/* POST request verify reset password action id */
router.post("/verify-otp-resetpass", async (req, res) => {
  const reset_id = req.body["reset_id"];
  const otp = req.body["otp"];

  let result;
  try {
    result = await resetPassOtpModel.searchResetPasswordRequest(reset_id);
  } catch (err) {
    res.status(401).json({ "err": "invalid reset_id" });
    return;
  }

  if (result.length === 0 || result === undefined) {
    res.status(401).json({ "err": "invalid reset_id" });
    return
  }

  const resetAction = result[0];

  result = await customerModel.searchByCustomerId(resetAction["customer_id"]);
  const customerInfo = result[0];

  if (resetAction["status"] !== "pending") {
    res.status(401).json({ "err": "reset action already success or being canceled" });
    return
  }

  if (otp != resetAction["otp"]) {
    res.status(401).json({ "err": "invalid otp" });
    return;
  }

  const current_ts = Math.floor(Date.now() / 1000);
  if (current_ts - resetAction["ts"] > config["otp_exp"]) { // otp expired
    res.status(401).json({ "err": "otp expired" });
    return;
  }

  const newpass = randomstring.generate(12);

  const template = fs.readFileSync('./template/email/reset-pass-success.html', 'utf8');
  const html = mustache.render(template, { newpass: newpass });
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: false,
    secure: false,
    service: 'gmail',
    auth: {
      user: config["bankmail_address"],
      pass: config["bankmail_password"]
    }
  });

  const mailOptions = {
    from: "no-reply <kianto@bank.com>",
    to: customerInfo["email_address"],
    subject: 'KiantoBank Email new password',
    html: html
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    res.status(401).json({ "err": "send email failed" });
    return;
  }

  customerModel.changePassword(resetAction["customer_id"], newpass);
  resetPassOtpModel.updateResetPasswordRequest(reset_id, "success");
  res.status(200).json({ "msg": "reset password success, please check mail for new password" });
})

/* POST request change password */
router.post("/change-password", authenJWT, async (req, res) => {
  const customer_id = req.body["customer_id"];
  const oldpass = req.body["old_password"];
  const newpass = req.body["new_password"];
  const confirm = req.body["confirm_new_password"];
  let result;

  if (newpass !== confirm) {
    res.status(401).json({ "err": "" });
    return;
  }

  result = await customerModel.searchByCustomerId(customer_id);
  const customerInfo = result[0];

  if (customerInfo === undefined) {
    res.status(401).json({ "err": "invalid username" });
    return;
  }

  result = await bcrypt.compare(oldpass, customerInfo["hashed_password"]);
  if (result === false) { // not match password hash
    res.status(401).json({ "err": "invalid old password" });
    return;
  }

  customerModel.changePassword(customer_id, newpass);

  res.status(200).json({ "message": "change password success" });
})

/* GET transaction history */
router.get("/transaction-history", authenJWT, async (req, res) => {
  const customer_id = req.body["customer_id"];
  let result;

  result = await creditAccountModel.searchByCustomerId(customer_id);
  const creditInfo = result[0];

  const depositHis = await customerModel.getDepositTransactionHistory(creditInfo["credit_number"]);
  const withdrawHis = await customerModel.getWithdrawTransactionHistory(creditInfo["credit_number"]);
  const sendtoHis = await customerModel.getSentToTransactionHistory(creditInfo["credit_number"]);
  const receivefromHis = await customerModel.getReceiveFromTransactionHistory(creditInfo["credit_number"]);

  res.status(200).json({ "deposit_history": depositHis, "withdraw_history": withdrawHis, "sendto_history": sendtoHis, "receivefrom_history": receivefromHis });
})

/* GET remind list */
router.get("/remind-list", authenJWT, async (req, res) => {
  const customer_id = req.body["customer_id"];
  let result = await remindListModel.get(customer_id);

  return res.status(201).json({ "remind-list": result });
})

/* POST remind list */
router.post("/remind-list", authenJWT, async (req, res) => {
  let result

  try {
    result = await remindListModel.add(req.body);
  } catch (err) {
    res.status(401).json({ "err": err })
  }

  return res.status(201).json({ "remind_id": result.insertId })
})

/* DELETE remind list */
router.delete("/remind-list", authenJWT, async (req, res) => {
  remind_id = req.body["remind_id"];
  remindListModel.delete(remind_id);
  return res.status(201).json({"message": "success"});
})

/* UPDATE remind list */
router.put("/remind-list", authenJWT, async (req, res) => {
  remind_id = req.body["remind_id"];
  remindListModel.update(remind_id, req.body);
  return res.status(201).json({"message": "success"});
})

module.exports = router;