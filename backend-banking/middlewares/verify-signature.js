const crypto = require('crypto');

const verifySignature = async (req, res, next) => {
  const sig = req.headers["authen-sig"];
  const base64_pubkey = req.headers["partnerPubkeyBase64"];
  const data = req.headers["dataToSign"];

  if (sig.length === 0) { // signature not exist
    res.status(400).json({ "err": "signature not found" });
    return;
  }

  // check signature is correct or not
  const publicKey =Buffer.from(base64_pubkey,"base64").toString("ascii") ;
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(data);
  if (!verify.verify(publicKey, sig, 'base64')) {  // verify signature fail
    res.status(400).json({ "err": "signature invalid" });
    return;
  }

  next();
}

module.exports = verifySignature;