const express = require('express');
const customerModel = require('../models/customer.model');
const creditAccountModel = require('../models/credit_account.model');
const randomString = require('randomstring');

const router = express.Router();

/* POST add customer */
router.post('/add-customer', async (req, res, next) => {
  let result;
  try {
    result = await customerModel.add(req.body);
  } catch (err) {
    console.log(err.sqlMessage);
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
  let account_number;
  do {
    account_number = randomString.generate({  // generate new account number
      length: 12,
      charset: 'numeric'
    })

    result = await creditAccountModel.searchByAccountNumber(account_number)
  } while (result.length > 0);

  creditAccountModel.add({ customer_id: ret["customer_id"], account_number: account_number })
});

module.exports = router;