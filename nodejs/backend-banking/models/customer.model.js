const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const randomstring = require('randomstring');
const creditAcountModel = require('./credit_account.model');

module.exports = {
  add: entity => {
    // entity = {
    //   "username": "admin",
    //   "password": "admin",
    //   "identity_number": "025895863",
    //   "phone_number": "0704468256",
    //   "firstname": "linh",
    //   "lastname": "nguyen van",
    //   "date_of_birth": "1998-11-12",
    //   "email_address": "linh1612340@gmail.com"
    // }
    entity["firstname"] = entity["firstname"].toUpperCase();
    entity["lastname"] = entity["lastname"].toUpperCase();

    const hash = bcrypt.hashSync(entity.password, 8);
    entity["hashed_password"] = hash;

    entity["refresh_secret"] = randomstring.generate(20);
    delete entity["password"];
    return db.add(entity, 'customer');
  },

  searchByUserName: userName => db.load(`select * from customer where username = '${userName}'`),
  searchByCustomerId: customerId => db.load(`select * from customer where customer_id = '${customerId}'`),
  searchByCreditNumber: async creditNum => {
    let result;
    try {
      result = await db.load(`select customer_id from credit_account where credit_number = '${creditNum}' limit 1`);
    } catch (err) {
      return err;
    }
    customer_id = result[0]["customer_id"];
    return db.load(`select * from customer where customer_id = '${customer_id}'`);
  },
  changePassword: (customerId, password) => {
    const hash = bcrypt.hashSync(password, 8);
    return db.load(`update customer set hashed_password = '${hash}' where customer_id = ${customerId}`)
  },
  getDepositTransactionHistory: credit_number => db.load(`select * from deposit_transaction_history where credit_number = '${credit_number}'`),
  getWithdrawTransactionHistory: credit_number => db.load(`select * from withdraw_transaction_history where credit_number = '${credit_number}'`),
  getSentToTransactionHistory: credit_number => db.load(`select * from sent_to_transaction_history where credit_number = '${credit_number}'`),
  getReceiveFromTransactionHistory: credit_number => db.load(`select * from receive_from_transaction_history where credit_number = '${credit_number}'`),
};
