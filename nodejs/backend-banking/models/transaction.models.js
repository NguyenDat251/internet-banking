const db = require('../utils/db')

module.exports = {
  add_deposit_history: entity => {
    // entity = {
    //   credit_number: "112233445566",
    //   amount: 100000,
    //   partner_code: "abc"
    // }

    entity["ts"] = Date.now() / 1000
    return db.add(entity, 'deposit_transaction_history')
  },
  add_withdraw_history: entity => {
    // entity = {
    //   credit_number: "112233445566",
    //   amount: 100000
    //   partner_code: "abc"
    // }

    entity["ts"] = Date.now() / 1000
    return db.add(entity, 'withdraw_transaction_history')
  },
  add_sent_to_history: entity => {
    // entity = {
    //   credit_number: "112233445566",
    //   to_credit_number: "665544332211",
    //   amount: 100000,
    //   message: "fuck you bro",
    //   partner_code: "abc"
    // }

    entity["ts"] = Date.now() / 1000
    return db.add(entity, 'sent_to_transaction_history')
  },
  add_receive_from_history: entity => {
    // entity = {
    //   credit_number: "112233445566",
    //   from_credit_number: "665544332211",
    //   amount: 100000,
    //   message: "fuck you bro",
    //   partner_code: "abc"
    // }

    entity["ts"] = Date.now() / 1000
    return db.add(entity, 'receive_from_transaction_history')
  }
}