const express = require('express');
const partnerModel = require('../models/partner.model');
const employeeModel = require('../models/employee.model');
const adminModel = require('../models/admin.model');
const config = require('../utils/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenLoginAdmin = async (req, res, next) => {
  const username = req.body["username"];
  const plain_password = req.body["password"];
  let result

  result = await adminModel.searchByUserName(username);

  const adminInfo = result[0]
  if (adminInfo === undefined) {
    res.status(401).json({ "err": "invalid username" });
    return;
  }

  result = await bcrypt.compare(plain_password, adminInfo["hashed_password"]);
  if (result === false) { // not match password hash
    res.status(401).json({ "err": "invalid password" });
    return;
  }
  req.headers["adminInfo"] = adminInfo;
  next();
}

const authenJWT = async (req, res, next) => { // xác thực jwt của admin
  const accesstoken = req.headers["access_token"];  // lấy chuỗi jwt từ request header
  const secret_text = config["secret_text"];  // lấy secret từ config

  let decoded;
  try {
    decoded = await jwt.verify(accesstoken, secret_text);
    /* decoded là cái jwt payload, một chuỗi jwt có 3 phần
    (header, payload, signature) chỉ quan tâm cái payload thôi 
    vì nó chứa thông tin mình cần, chẳng hạn như admin_id */
  } catch (err) {
    res.status(401).json({ "err": err }); // verify jwt fail, trả về lỗi (jwt expire chẳng hạn)
    return;
  }

  // thêm admin_id vào request body, chuyển cho middleware tiếp theo nếu có cần xài
  req.body["admin_id"] = decoded["admin_id"];

  next();
}

router.post("/login", authenLoginAdmin, async (req, res) => {
  const secret_text = config["secret_text"];
  const accesstoken_exp = config["accesstoken_exp"];
  const refreshtoken_exp = config["refreshtoken_exp"];

  const adminInfo = req.headers["adminInfo"];
  const admin_id = adminInfo["admin_id"];
  const refresh_secret = adminInfo["refresh_secret"];

  const accesstoken = jwt.sign({ admin_id: admin_id }, secret_text, { expiresIn: accesstoken_exp });

  const refreshtoken = jwt.sign({ admin_id: admin_id }, refresh_secret, { expiresIn: refreshtoken_exp });

  res.status(200).json({ "access_token": accesstoken, "refresh_token": refreshtoken });
})

/* POST request add partner_api to db */
router.post('/add-partner', authenJWT, async (req, res) => {
  let result;
  try {
    result = await partnerModel.add(req.body);
  } catch (err) { 
    res.status(422).json({ "err": err});
    return;
  }

  const ret = {
    partner_id: result["insertId"],
    ...req.body
  }
  res.status(201).json(ret);
})

/* POST request create employee to db */
router.post('/add-employee', authenJWT, async (req, res) => {
  let result;
  try {
    result = await employeeModel.add(req.body);
  } catch (err) {
    res.status(422).json({ "err": err });
    return;
  }

  const ret = {
    partner_id: result["insertId"],
    ...req.body
  }
  res.status(201).json(ret);
})

/* POST delete employee by ID */
router.post('/delete-employee', authenJWT, async (req,res) => {
    let result;

    try {
        result = await employeeModel.deleteEmployeeByID(req.body["employee_id"]);
    } catch (err) {
        res.status(422).json({ "err": err });
        return;
    }

    res.status(201).json(result);
})

/* POST update employee username */
router.post('/update-employee-username', authenJWT, async (req,res) => {
    let result;

    try {
        result = await employeeModel.updateUsername(req.body);
    } catch (err) {
        res.status(422).json({ "err": err });
        return;
    }

    res.status(201).json(result);
})

/* POST update employee password */
router.post('/update-employee-password', authenJWT, async (req,res) => {
    let result;

    try {
        result = await employeeModel.updatePassword(req.body);
    } catch (err) {
        res.status(422).json({ "err": err });
        return;
    }

    res.status(201).json(result);
})

/* GET request get employee list */
router.get("/employee-list", authenJWT, async (req, res) => {
  const employee_list = await employeeModel.getEmployeeList;
  res.status(200).json(employee_list);
})

/* GET request get employee info */
router.get("/get-employee-info", authenJWT, async (req, res) => {
    let employee_info

    try {
        employee_info = await employeeModel.getEmployeeInfo(req.query.employee_id);
    } catch (err) {
        res.status(422).json({ "err": err });
        return;
    }

    console.log(employee_info.length);

    if (employee_info.length > 0) {
        res.status(200).json(employee_info);
    }
    else {
        res.status(204).send();
    }
})

module.exports = router;
