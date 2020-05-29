const db = require('../utils/db')

module.exports = {
  add_deposit_history: entity => {
    // entity = {
    //   account_number: "112233445566",
    //   amount: 100000,
    //   partner_code: "abc"
    // }

    entity["ts"] = Date.now() / 1000
    return db.add(entity, 'deposit_transaction_history')
  },
  add_withdraw_history: entity => {
    // entity = {
    //   account_number: "112233445566",
    //   amount: 100000
    //   partner_code: "abc"
    // }

    entity["ts"] = Date.now() / 1000
    return db.add(entity, 'withdraw_transaction_history')
  }
}