const express = require('express');
const customerModel = require('../models/customer.model');
const creditAccountModel = require('../models/credit_account.model');
const verifySignatureMiddleware = require('../middlewares/verify-signature');
const verifyCreditMiddleware = require('../middlewares/verify-credit');

const router = express.Router();

/* GET request query account info using credit account number */
router.get('/get-account-info', verifyCreditMiddleware, async (req, res) => {
  const customer_id = req.headers["customer_id"];
  const customerInfo = await customerModel.searchByCustomerId(customer_id);

  const jsonRes = {
    "credit_number": req.body["credit_number"],
    "lastname": customerInfo[0]["lastname"],
    "firstname": customerInfo[0]["firstname"]
  };
  res.status(200).json(jsonRes);
})

/* POST request deposit account balance */
router.post('/deposit', verifySignatureMiddleware, verifyCreditMiddleware, async (req, res) => {
  const accountNumber = req.body["credit_number"];
  const amount = req.body["amount"];

  try {
    await creditAccountModel.deposit(accountNumber, amount);
  } catch (err) {
    console.log(err.sqlMessage);
    res.status(422).json({ "err": err.sqlMessage });
    return;
  }
  res.status(201).json({ "msg": "deposit success" });
})

/* POST request deposit account balance */
router.post('/withdraw', verifySignatureMiddleware, verifyCreditMiddleware, async (req, res) => {
  const accountNumber = req.body["credit_number"];
  const amount = req.body["amount"];

  try {
    await creditAccountModel.withdraw(accountNumber, amount);
  } catch (err) {
    console.log(err.sqlMessage);
    res.status(422).json({ "err": err.sqlMessage });
    return;
  }
  res.status(201).json({ "msg": "withdraw success" });
})

module.exports = router;