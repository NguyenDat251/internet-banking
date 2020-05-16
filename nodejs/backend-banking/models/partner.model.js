const db = require('../utils/db');
const randomstring = require('randomstring');

module.exports = {
  add: entity => {
    // entity = {
    //   "partner_code": "admin",
    //   "public_key": "xxx",
    // }
    entity["secret_text"] = randomstring.generate(20);
    return db.add(entity, 'partner_api');
  },

  searchByPartnerCode: partnerCode => db.load(`select * from partner_api where partner_code = '${partnerCode}'`),
};