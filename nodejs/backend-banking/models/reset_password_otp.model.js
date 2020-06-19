const db = require('../utils/db');
const randomstring = require('randomstring');

module.exports = {
  add: entity => {
    // entity = {
    //   "customer_id": 1
    //   "otp": "123456"
    // }

    entity["status"] = "pending";
    entity["ts"] = Math.floor(Date.now() / 1000);
    return db.add(entity, 'reset_password_otp');
  },
  searchResetPasswordRequest: (reset_id) => db.load(`select * from reset_password_otp where reset_id = ${reset_id}`),
  updateResetPasswordRequest: (reset_id, status) => db.load(`update reset_password_otp set status = "${status}" where reset_id = ${reset_id}`)
};