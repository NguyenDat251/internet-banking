const db = require('../utils/db');

module.exports = {
  add: entity => {
    // entity = {
    //   "customer_id": 1,
    //   "credit_number": "123455465445",
    //   "remind_name": "noob user",
    //   "partner_code": "idkbank"
    // }
    return db.add(entity, "remind_list");
  },
  update: (remind_id, entity) => {
    // entity = {
    //   "credit_number":"324234234",
    //   "remind_name":"changed",
    //   "partner_code":"kiantobank"
    // }
    return db.load(`update remind_list set credit_number = '${entity["credit_number"]}', remind_name='${entity["remind_name"]}', partner_code='${entity["partner_code"]}' where remind_id = ${remind_id}`);
  },
  get: customer_id => db.load(`select * from remind_list where customer_id = ${customer_id}`),
  delete: remind_id => db.load(`delete from remind_list where remind_id = ${remind_id}`)
}