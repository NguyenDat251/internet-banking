const db = require('../utils/db');

module.exports = {
  add: entity => {
    // entity = {
    //   "customer_id": 1,
    //   "account_number": "112233445566",
    //   "balance": 100000,
    //   "status: 1"
    // }

    entity["balance"] = 100000;
    entity["status"] = 1;
    return db.add(entity, 'credit_account');
  },

  searchByAccountNumber: accNum => db.load(`select * from credit_account where account_number = '${accNum}'`),
  deposit: (accNum, amount) => db.load(`call deposit(${accNum}, ${amount})`),
  withdraw: (accNum, amount) => db.load(`call withdraw(${accNum}, ${amount})`)
};