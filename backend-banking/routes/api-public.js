const express = require('express');
const creditAccount = require('../models/credit_account.model');
const verifySignatureMiddleware = require('../middlewares/verify-signature');

const router = express.Router();

/* GET request query account info using credit account number */
router.get('/customer/get-account-balance', async (req, res) => {
  const accountInfo = await creditAccount.searchByAccountNumber(req.body["credit_number"]);
  if (accountInfo.length === 0) { // cant not find account
    res.status(204).json(); // return no content json
    return;
  }

  res.status(200).json(accountInfo[0]);
})

/* POST request change account balance */
router.post('/customer/deposit', verifySignatureMiddleware, async (req, res) => {
  res.status(200).json({ "ok": "ok" });
})

module.exports = router;