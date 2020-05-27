const express = require('express');
const customerModel = require('../models/customer.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenCustomer = async (req, res, next) => {
  const username = req.body["username"];
  const plain_password = req.body["password"];
  let customerInfo
  try { // find username
    customerInfo = await customerModel.searchByUserName(username);
  } catch{ // unknow username
    res.status(401).json({ "err": "invalid username" })
  }

  customerInfo = customerInfo[0]

  try {
    await bcrypt.compare(plain_password, customerInfo["hashed_password"]);
  } catch{ // not match password hash
    res.status(401).json({ "err": "invalid password" })
  }
  req.headers["customerInfo"] = customerInfo;
  next();
}

/* POST request login */
router.post("/login", authenCustomer, async (req, res) => {
  const customerInfo = req.headers["customerInfo"]

  const jwttoken = jwt.sign({
    customer_id: customerInfo["customer_id"]
  }, customerInfo["secret"], { expiresIn: 60 * 10 });

  res.status(200).json({ "jwttoken": jwttoken })
})


module.exports = router;