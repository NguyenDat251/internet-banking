const express = require('express');
const customerModel = require('../models/customer.model');
const creditAccountModel = require('../models//credit_account.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

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

  req.headers["customer_id"] = decoded["customer_id"];

  next();
}

/* GET list credit account */
router.get("/list-credit-info", authenJWT, async (req, res) => {
  const customer_id = req.headers["customer_id"];

  let creditInfo;
  try {
    creditInfo = await creditAccountModel.searchByCustomerId(customer_id);
  } catch (err) {
    res.status(401).json({ "err": err });
    return;
  }

  res.status(200).json({ "data": creditInfo });
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
router.post("/local-transfer", authenJWT, async (req, res) => {
  let result;
  const customer_id = req.headers["customer_id"];

  const from_credit_number = req.body["from_credit_number"];
  const to_credit_number = req.body["to_credit_number"];
  const amount = req.body["amount"];
  const target_fullname = req.body["target_fullname"].toUpperCase();

  let from_customer_info;
  let to_customer_info;
  try {
    from_customer_info = await customerModel.searchByCreditNumber(from_credit_number);
  } catch (err) {
    res.status(401).json({ "err": "invalid from_credit_number" });
    return;
  }
  try {
    to_customer_info = await customerModel.searchByCreditNumber(to_credit_number);
  } catch (err) {
    res.status(401).json({ "err": "invalid to_credit_number" });
    return;
  }

  from_customer_info = from_customer_info[0];
  to_customer_info = to_customer_info[0];

  // verify request
  if (from_customer_info["customer_id"] != customer_id) {
    res.status(401).json({ "err": "from_credit_number value and customer_id not match" });
    return;
  }

  const fullName = to_customer_info["lastname"] + " " + to_customer_info["firstname"];
  if (fullName.toUpperCase() != target_fullname) {
    res.status(401).json({ "err": "target_fullname value and to_credit_number info not match" });
    return;
  }

  result = await creditAccountModel.searchByAccountNumber(from_credit_number);
  const credit_info = result[0];
  if (credit_info["balance"] - amount < 50000) {
    res.status(401).json({ "err": "balance insufficient" });
    return;
  }

  

  res.status(200).json({ "msg": "otp created successfully" });
})


module.exports = router;