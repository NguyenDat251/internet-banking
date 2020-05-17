const express = require('express');
const partnerModel = require('../models/partner.model');

const router = express.Router();

/* POST request add partner_api to db */
router.post('/add-partner', async (req, res) => {
  let result;
  try {
    result = await partnerModel.add(req.body);
  } catch (err) {
    console.log(err);
    res.status(422).json({ "err": err.sqlMessage });
    return;
  }

  const ret = {
    partner_id: result["insertId"],
    ...req.body
  }
  res.status(201).json(ret);
})

module.exports = router;