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

/* POST delete employee by ID */
router.post('/delete-employee', async (req,res) => {
    let result;

    try {
        result = await employeeModel.deleteEmployeeByID(req.body["employee_id"]);
    } catch (err) {
        res.status(422).json({ "err": err.sqlMessage });
        return;
    }

    res.status(201).json(result);
})

/* POST update employee username */
router.post('/update-employee-username', async (req,res) => {
    let result;

    try {
        result = await employeeModel.updateUsername(req.body);
    } catch (err) {
        res.status(422).json({ "err": err.sqlMessage });
        return;
    }

    res.status(201).json(result);
})

/* GET request get employee list */
router.get("/employee-list", async (req, res) => {
  const employee_list = await employeeModel.getEmployeeList;
  res.status(200).json(employee_list);
})

module.exports = router;
