const crypto = require('crypto');
const fs = require('fs');

function RSASign(privateKey, data) {
  const sign = crypto.createSign('RSA-SHA256')
  const signature = sign.update(data).sign(privateKey, 'base64');
  console.log(signature);
  return signature;
}

function RSAVerify(publicKey, signature, data) {
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(data);
  console.log(verify.verify(publicKey, signature, 'base64'));
}

const privateKey = fs.readFileSync('linh.private.key');
const publicKey = fs.readFileSync('linh.public.key');

var dataToSign = '1589520986kQYtFpj7pJfi5VVfoeGD{"credit_number":"565572661049","amount":200000}';
var signature = RSASign(privateKey, dataToSign);
RSAVerify(publicKey, signature, dataToSign);

const dataToHash = '1589520986kQYtFpj7pJfi5VVfoeGD{"credit_number":"565572661049","amount":200000}';
let hashString = crypto.createHash('sha256').update(dataToHash).digest('base64');
console.log(hashString);

console.log(Buffer.from("Hello World").toString('base64'));
console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
