const express = require('express');
const customerModel = require('../models/customer.model');
const creditAccountModel = require('../models/credit_account.model');
const savingAccountModel = require('../models/saving_account.model');
const randomString = require('randomstring');

const router = express.Router();

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

module.exports = router;