const creditAccountModel = require('../models/credit_account.model')

const verifyCredit = async (req, res, next) => {
  const customer_id = req.query["credit_number"];
  let accountInfo;
  try {
    accountInfo = await creditAccountModel.searchByAccountNumber(customer_id);
    if (accountInfo.length === 0) { // cant not find account
      res.status(400).json({ "err": "not found" }); // return no content json
      return;
    }
  } catch (error) {
    res.status(500).json({ "err": "server error" }); // server internal error
    return;
  }

  req.headers["customer_id"] = accountInfo[0]["customer_id"]; // customer_id to header
  next();
}

module.exports = verifyCredit;