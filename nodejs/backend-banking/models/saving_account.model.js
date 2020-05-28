const db = require('../utils/db');
const randomstring = require('randomstring');

module.exports = {
  add: entity => {
    // entity = {
    //   "customer_id": 1,
    // }

    entity["balance"] = 0;
    entity["credit_number"] = randomstring.generate({
      length: 14,
      charset: 'numeric'
    });;
    return db.add(entity, 'saving_account');
  },

  searchByCustomerId: customer_id => db.load(`select * from saving_account where customer_id = '${customer_id}'`)
};