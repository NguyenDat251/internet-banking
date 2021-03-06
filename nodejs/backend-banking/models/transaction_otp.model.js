const db = require('../utils/db');
const randomstring = require('randomstring');

module.exports = {
  add: entity => {
    // entity = {
    //   "customer_id": 1,
    //   "from_credit_number": "565572661049",
    //   "to_credit_number": "025917154505",
    //   "amount": 50000,
    //   "message": "bobo",
    //   "fee_payer": "receiver",
    //   "partner_code": "local"
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
  searchTransaction: (transaction_id) => db.load(`select * from transaction_otp where transaction_id = ${transaction_id}`),
  updateTransactionStatus: (transaction_id, status) => db.load(`update transaction_otp set status = "${status}" where transaction_id = ${transaction_id}`)
};