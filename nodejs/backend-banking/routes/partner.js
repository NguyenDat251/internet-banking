const express = require('express');
const creditAccountModel = require('../models/credit_account.model');
const customerModel = require('../models/customer.model');
const verifySignatureMiddleware = require('../middlewares/verify-signature');

const router = express.Router();

/* GET request query account info using credit account number */
router.get('/get-account-info', async (req, res) => {
  let accountInfo;
  try {
    accountInfo = await creditAccountModel.searchByAccountNumber(req.body["credit_number"]);
    if (accountInfo.length === 0) { // cant not find account
      res.status(204).json(); // return no content json
      return;
    }
  } catch (error) {
    console.log(error)
  }

  // get fullname using customer_id
  const customer_id = accountInfo[0]["customer_id"];
  const customerInfo = await customerModel.searchByCustomerId(customer_id);

  const jsonRes = {
    "credit_number": req.body["credit_number"],
    "lastname": customerInfo[0]["lastname"],
    "firstname": customerInfo[0]["firstname"]
  };
  res.status(200).json(jsonRes);
})

/* POST request change account balance */
router.post('/deposit', verifySignatureMiddleware, async (req, res) => {
  res.status(200).json({ "ok": "ok" });
})

module.exports = router;