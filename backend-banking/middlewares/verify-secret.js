const crypto = require('crypto');
const partnerModel = require('../models/partner.model');

const verifySecret = async (req, res, next) => {
  const reqts = req.headers["timestamp"];
  const partnerCode = req.headers["partner-code"];
  const authenHash = req.headers["authen-hash"];

  // let current = Math.floor(Date.now() / 1000)
  // if (current < reqts || current - reqts > 60) {  // req timestamp out of time > 1 minute
  //   res.status(400).json({ "err": "request out of time" })
  //   return;
  // }

  const partner_info = await partnerModel.searchByPartnerCode(partnerCode);
  if (partner_info.length === 0) { // partner code not found
    res.status(400).json({ "err": "invalid partner code" })
    return;
  }

  let text = reqts + partner_info[0]["secret_text"] + JSON.stringify(req.body);
  let hash = crypto.createHash("sha256").update(text).digest("base64");

  if (hash !== authenHash) {  // check hash same or not
    res.status(400).json({ "err": "invalid request" })
    return;
  }

  // pass this below info for next verify signature
  req.headers["dataToSign"] = text; 
  req.headers["partnerPubkeyBase64"] = partner_info[0]["public_key"];

  next()
}

module.exports = verifySecret