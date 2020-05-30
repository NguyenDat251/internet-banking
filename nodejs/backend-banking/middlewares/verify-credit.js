const creditAccountModel = require('../models/credit_account.model')

const verifyCredit = async (req, res, next) => {
  let accountInfo;
  try {
    accountInfo = await creditAccountModel.searchByAccountNumber(req.body["credit_number"]);
    if (accountInfo.length === 0) { // cant not find account
      res.status(204).json(); // return no content json
      return;
    }
  } catch (error) {
    res.status(500).json(); // server internal error
    return;
  }

  req.headers["customer_id"] = accountInfo[0]["customer_id"]; // customer_id to header
  next();
}

module.exports = verifyCredit;