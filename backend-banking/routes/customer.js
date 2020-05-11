const express = require('express');
const customerModel = require('../models/customer.model');

const router = express.Router();

/* GET users listing. */
router.post('/add', async (req, res, next) => {
  let result;
  try {
    result = await customerModel.add(req.body);
  } catch (err) {
    console.log(err);
    res.status(422).json({ "err": err.sqlMessage});
    return;
  }

  const ret = {
    customer_id: result["insertId"],
    ...req.body
  }
  delete ret.hashed_password;
  res.status(201).json(ret);
});

module.exports = router;