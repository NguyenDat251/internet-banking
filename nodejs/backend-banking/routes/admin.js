const express = require('express');
const partnerModel = require('../models/partner.model');
const employeeModel = require('../models/employee.model');

const router = express.Router();

/* POST request add partner_api to db */
router.post('/add-partner', async (req, res) => {
  let result;
  try {
    result = await partnerModel.add(req.body);
  } catch (err) { 
    res.status(422).json({ "err": err.sqlMessage });
    return;
  }

  const ret = {
    partner_id: result["insertId"],
    ...req.body
  }
  res.status(201).json(ret);
})

/* POST request create employee to db */
router.post('/add-employee', async (req, res) => {
  let result;
  try {
    result = await employeeModel.add(req.body);
  } catch (err) {
    res.status(422).json({ "err": err.sqlMessage });
    return;
  }

  const ret = {
    partner_id: result["insertId"],
    ...req.body
  }
  res.status(201).json(ret);
})

/* GET request get employee list */
router.get("/employee-list", async (req, res) => {
  const employee_list = await employeeModel.getEmployeeList;
  console.log(employee_list)
  res.status(200).json(employee_list);
})

module.exports = router;
