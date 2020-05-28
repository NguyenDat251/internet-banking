const db = require('../utils/db');
const randomstring = require('randomstring');

module.exports = {
  add: entity => {
    // entity = {
    //   "customer_id": 1,
    //   "from_credit_number": "565572661049",
    //   "to_credit_number": "025917154505",
    //   "amount": 50000
    // }

    delete entity["target_fullname"];
    entity["otp"] = randomstring.generate({
      length: 6,
      charset: 'numeric'
    });
    entity["status"] = "pending";
    entity["ts"] = Math.floor(Date.now() / 1000);
    return db.add(entity, 'transaction_otp');
  },
  searchTransactionByCustomerId: customer_id => db.load(`select * from transaction_otp where customer_id = ${customer_id} order by transaction_id desc limit 1`),
  updateTransactionStatus: (transaction_id, status) => db.load(`update transaction_otp set status = "${status}" where transaction_id = ${transaction_id}`)
};