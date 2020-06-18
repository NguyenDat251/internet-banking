const express = require('express');
const customerModel = require('../models/customer.model');
const creditAccountModel = require('../models/credit_account.model');
const transactionModel = require('../models/transaction.models');
const verifySignatureMiddleware = require('../middlewares/verify-signature');
const verifyCreditMiddleware = require('../middlewares/verify-credit');
const verifySecretMiddleware = require('../middlewares/verify-secret');

const router = express.Router();

/* GET request query account info using credit account number */
router.get('/get-account-info', verifySecretMiddleware, async (req, res) => {
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
router.post('/deposit', verifySecretMiddleware, verifySignatureMiddleware, async (req, res) => {
  const creditNumber = req.body["credit_number"];
  const amount = req.body["amount"];
  const partnerCode = req.headers["partner-code"];

  try {
    await creditAccountModel.deposit(creditNumber, amount);
  } catch (err) {
    res.status(422).json({ "err": err });
    return;
  }
  transactionModel.add_deposit_history({ credit_number: creditNumber, amount: amount, partner_code: partnerCode })
  res.status(201).json({ "msg": "deposit success" });
})

/* POST request withdraw account balance */
router.post('/withdraw', verifySecretMiddleware, verifySignatureMiddleware, async (req, res) => {
  const creditNumber = req.body["credit_number"];
  const amount = req.body["amount"];
  const partnerCode = req.headers["partner-code"];

  let result;

  try {
    result = await creditAccountModel.withdraw(creditNumber, amount);
  } catch (err) {
    res.status(422).json({ "err": err });
    return;
  }

  transactionModel.add_withdraw_history({ credit_number: creditNumber, amount: amount, partner_code: partnerCode })
  res.status(201).json({ "msg": "withdraw success" });
})

module.exports = router;