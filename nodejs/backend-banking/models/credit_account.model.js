const db = require('../utils/db');

module.exports = {
  add: entity => {
    // entity = {
    //   "customer_id": "1",
    //   "account_number": "112233445566",
    //   "balance": "100000",
    // }

    entity["balance"] = 100000;
    return db.add(entity, 'credit_account');
  },

  searchByAccountNumber: accNUm => db.load(`select * from credit_account where account_number = '${accNUm}'`),
};