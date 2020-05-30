const db = require('../utils/db');

module.exports = {
  add: entity => {
    // entity = {
    //   "customer_id": 1,
    //   "credit_number": "112233445566",
    //   "balance": 100000,
    //   "status: 1"
    // }

    if (!entity["balance"])
      entity["balance"] = 100000;
    entity["status"] = 1;
    return db.add(entity, 'credit_account');
  },

  searchByAccountNumber: creNum => db.load(`select * from credit_account where credit_number = '${creNum}'`),
  searchByCustomerId: customer_id => db.load(`select * from credit_account where customer_id = '${customer_id}'`),
  deposit: (creNum, amount) => db.load(`call deposit("${creNum}", ${amount})`),
  withdraw: (creNum, amount) => db.load(`call withdraw("${creNum}", ${amount})`)
};