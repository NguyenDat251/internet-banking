const db = require('../utils/db');
const randomstring = require('randomstring');

module.exports = {
  add: entity => {
    // entity = {
    //   "partner_code": "kianto",
    //   "public_key": "xxx",
    //   "bankname": "kiantobank",
    //   "partner_secret": "asdad"
    // }
    entity["bank_secret"] = randomstring.generate(20);
    return db.add(entity, 'partner_api');
  },

  searchByPartnerCode: partnerCode => db.load(`select * from partner_api where partner_code = '${partnerCode}'`),
};