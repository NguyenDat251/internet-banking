const express = require('express');
const customerModel = require('../models/customer.model');
const employeeModel = require('../models/employee.model');
const creditAccountModel = require('../models/credit_account.model');
const savingAccountModel = require('../models/saving_account.model');
const randomString = require('randomstring');
const config = require('../utils/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenLoginEmployee = async (req, res, next) => {
  const username = req.body["username"];
  const plain_password = req.body["password"];
  let result

  result = await employeeModel.searchByUserName(username);

  const employeeInfo = result[0]
  if (employeeInfo === undefined) {
    res.status(401).json({ "err": "invalid username" });
    return;
  }

  result = await bcrypt.compare(plain_password, employeeInfo["hashed_password"]);
  if (result === false) { // not match password hash
    res.status(401).json({ "err": "invalid password" });
    return;
  }
  req.headers["employeeInfo"] = employeeInfo;
  next();
}

/* POST add customer */
router.post('/add-customer', async (req, res, next) => {
  let result;
  try {
    result = await customerModel.add(req.body);
  } catch (err) {
    res.status(422).json({ "err": err.sqlMessage });
    return;
  }

  const ret = {
    customer_id: result["insertId"],
    ...req.body
  }
  delete ret["hashed_password"];
  res.status(201).json(ret);

  // add new credit account
  let credit_number;
  do {
    credit_number = randomString.generate({  // generate new account number
      length: 12,
      charset: 'numeric'
    })

    result = await creditAccountModel.searchByAccountNumber(credit_number)
  } while (result.length > 0);

  creditAccountModel.add({ customer_id: ret["customer_id"], credit_number: credit_number })
});

/* POST create saving account */
router.post("/add-saving-account", async (req, res) => {
  let result;
  try {
    result = await savingAccountModel.add(req.body);
  } catch (err) {
    res.status(401).json({ "err": err.sqlMessage });
    return;
  }

  const account_id = result["insertId"];
  result = await savingAccountModel.searchByAccountId(account_id);
  const saveAcc = result[0];
  res.status(201).json(saveAcc);
})

router.post("/login", authenLoginEmployee, async (req, res) => {
  const secret_text = config["secret_text"];
  const accesstoken_exp = config["accesstoken_exp"];
  const refreshtoken_exp = config["refreshtoken_exp"];

  const employeeInfo = req.headers["employeeInfo"];
  const employee_id = employeeInfo["employee_id"];
  const refresh_secret = employeeInfo["refresh_secret"];

  const accesstoken = jwt.sign({ employee_id: employee_id }, secret_text, { expiresIn: accesstoken_exp });

  const refreshtoken = jwt.sign({ employee_id: employee_id }, refresh_secret, { expiresIn: refreshtoken_exp });

  res.status(200).json({ "access_token": accesstoken, "refresh_token": refreshtoken });
})

module.exports = router;
