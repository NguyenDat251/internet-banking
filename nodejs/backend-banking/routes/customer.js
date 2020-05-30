const express = require('express');
const customerModel = require('../models/customer.model');
const creditAccountModel = require('../models/credit_account.model');
const savingAccountModel = require('../models/saving_account.model');
const otpModel = require('../models/transaction_otp.model');
const transactionModel = require('../models/transaction.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const mustache = require('mustache');
const fs = require('fs');
const nodemailer = require('nodemailer');

const router = express.Router();

const authenLoginCustomer = async (req, res, next) => {
  const username = req.body["username"];
  const plain_password = req.body["password"];
  let customerInfo
  try { // find username
    customerInfo = await customerModel.searchByUserName(username);
  } catch{ // unknow username
    res.status(401).json({ "err": "invalid username" });
    return;
  }

  customerInfo = customerInfo[0]

  try {
    await bcrypt.compare(plain_password, customerInfo["hashed_password"]);
  } catch{ // not match password hash
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
  const credit_number = req.body["credit_number"];

  let result;
  try {
    result = await customerModel.searchByCreditNumber(credit_number);
  } catch (err) {
    res.status(401).json({ "err": "invalid customer_id" });
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
    res.status(401).json({ "err": "send email otp failed" });
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

module.exports = router;