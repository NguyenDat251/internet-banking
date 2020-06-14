const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const randomstring = require('randomstring');

module.exports = {
  add: entity => {
    // entity = {
    //   "username": "admin",
    //   "password": "admin",
    // }

    const hash = bcrypt.hashSync(entity.password, 8);
    entity["hashed_password"] = hash;

    entity["refresh_secret"] = randomstring.generate(20);
    delete entity["password"];
    return db.add(entity, 'employee');
  },

  searchByUserName: userName => db.load(`select * from employee where username = '${userName}'`),
  getEmployeeList: db.load(`select * from employee`),
  updateUsername: entity => {
    // entity = {
    //   "employee_id": "1",
    //   "username": "admin",
    // }

    return db.load(`update employee set username = '${entity["username"]}' where employee_id = '${employee_id}'`);
  },
  deleteEmployeeByID: employee_id => db.load(`delete from employee where employee_id = '${employee_id}'`)
};
