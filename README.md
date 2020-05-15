# Internet Banking
## Thuật toán
- encode sử dụng **base64** cho chuỗi hash và signature
- Signature sử dụng **rsa-sha256**, ví dụ chương trình tạo signature và verify bằng nodejs
```js
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

var dataToSign = '1589375966kQYtFpj7pJfi5VVfoeGD{"credit_number":"565572661049","action":"query"}';
var signature = RSASign(privateKey, dataToSign);
RSAVerify(publicKey, signature, dataToSign);
```

```html
OUTPUT
VHK0y+eStXu6w2IgbmusOYxbRN27SzH6r1erVLaf7dr4PkBGgGPYGDkQ5PvAXaE+YhqiDhqz/eww8dJWwnZz3/Dn/j39kZs9CAUD0SwZ8Mv30Le5BgXGF/t8cK5LvesbxaU8bVjMpKGanqNgYKULXOdKx9etcXzM+0dVRxUnltg=
truee
```
- Hash algo (cho **secret_text**) sử dụng **sha256**, ví dụ chương trình tạo chuỗi hash bằng nodejs
```js
const crypto = require('crypto');

const dataToHash = '1589375966kQYtFpj7pJfi5VVfoeGD{"credit_number":"565572661049","action":"query"}';
let hashString = crypto.createHash('sha256').update(dataToHash).digest('base64');
console.log(hashString);
```
```html
OUTPUT
JZW8OACrtoaW6JQSqAEWLEcHpKgSlnOfZYtGhVg2giw=
```

- Ví dụ cách encode and decode base64 bằng nodejs
```js
console.log(Buffer.from("Hello World").toString('base64'));
console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
```
```html
OUTPUT
SGVsbG8gV29ybGQ=
Hello World
```

## Cách sử dụng api
### Api GET
#### GET thông tin số dư tài khoản bằng số tài khoản tín dụng
```json
GET /api/public/customer/get-account-balance

HEADER
"partner-code": "linh"
"timestamp": 1589368255
"authen-hash": "8phLIi2wPSkb9EqTAVeUHlhk4YktFeckeKzFdOgwGqU="

BODY
{
    "credit_number": "565572661049",
    "action": "query"
}
```
- timestamp sử dụng unix utc second, có thể  xem ở https://www.epochconverter.com/, lưu ý timestamp không được **lớn hơn** hoặc nhỏ hơn quá **60**s so với thời gian thực
- partner-code là chuỗi code để xác định partner nào đã đăng kí api
- authen-hash là chuỗi hash sha256 của **timestamp+secret+body**,sau đó được encode base64 lại và gửi đi, ví dụ ở trên
- Không yêu cầu **authen-sig**

#### POST thay đổi số dư tài khoản
- authen-sig là chuỗi signature được tạo bởi thuật toán **RSA-SHA256** của chuỗi **timestamp+secret+body**, xem ví dụ ở trên
- Deposit
```js
GET /api/public/customer/deposit

HEADER
"partner-code": "linh"
"timestamp": 1589368255
"authen-hash": "InTLIODx1Iee5MvZGaOlxbYEJ0Ke0yD40cv52iNNLC4="
"authen-sig": "Wcp96NHVFGbkv15qwQ3Qum62huzcavIqdx70Tk41wY001Z4plxN7DylF4K8atZ+GQ1bASw1hGvHF4aMSnKd1rgVcqFypRrrX94yfrk/MExTN1Wg26Tl+9+Ald+8ptF52uVcWhkG6KFBkXG5aST8ZWWpDt4/CtfVcOkjew6gBlLs="

BODY
{
    "credit_number": "565572661049",
    "action": "deposit",
    "amount": 200000
}
```
- Witchdraw
```js
GET /api/public/customer/deposit

HEADER
"partner-code": "linh"
"timestamp": 1589368255
"authen-hash": "/uofr5Awgf2mXwfZZ24wyqEid1KrK3Z0Pu5h3eLPnKo="
"authen-sig": "RQkDNwy8pjOd2wpzrp7Uk0OLt5psHDVRhdIYfx7ydOGiqE02dwIwLgPafvnZkcOirB3M2NiuXJmPD7y53EmbppctqHJf/ZGb6sw9s/G1DxgTB5qWEaZRaZQxY/8uizi2HoVYDbEUysf8uwQXj5bE9WVbuURsvDVqIRQx5xa0Exs="

BODY
{
    "credit_number": "565572661049",
    "action": "withdraw",
    "amount": 100000
}
```

### Api POST
#### POST thêm mới customer
```json
POST /api/customer/add

BODY
{
    "username": "linh",
    "password": "linh",
    "identity_number": "025895863",
    "phone_number": "0704468257",
    "firstname": "linh",
    "lastname": "nguyen van",
    "date_of_birth": "1998-11-12",
    "email_address": "linh1612340@gmail.com"
}
```
#### POST thêm mới partner
```json
POST /api/partner/add

BODY
{
    "partner_code": "linh",
    "public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDSmxRWi9tMStpTGZLL2xwWURtaWNsZTZ2MApsbExXdGRZaFNrSDZidWlPck5iYVhWSC8vWmNHOVRwT0xVMXZMK1BrdnByQ1ovTjFTdHF6MHhOcnpjZFQwekZJCnhRU3IzMWZCMXF6RDIrVDRuakJjR1JPU3R2MHV4aGFhcm1XVkp3akxpYTBybEw3Z3JSTDBheHc0ckVTTTluc04KYmU4WG5KR1ZLdEZ5OU1YSEJ3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ=="
}
```
- Hệ thống sẽ tự động tạo 1 secret_text trả về

## Một số thông tin mặc định được khởi tạo cùng với project, dùng để test api
- Thông tin khách hàng linh
```json
{
    "customer_id": 1,
    "username": "linh",
    "password": "linh",
    "identity_number": "025895863",
    "phone_number": "0704468257",
    "firstname": "LINH",
    "lastname": "NGUYEN VAN",
    "date_of_birth": "1998-11-12",
    "email_address": "linh1612340@gmail.com"
}
```
- credit account gắn liền với khách hàng
```json
{
    "customer_id": 1,
    "account_number": "565572661049",
    "balance": 100000
}
```
- Thông tin partner linh mặc định, public key ở dạng **base64**
```json
{
    "partner_id": 1,
    "partner_code": "linh",
    "public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDSmxRWi9tMStpTGZLL2xwWURtaWNsZTZ2MApsbExXdGRZaFNrSDZidWlPck5iYVhWSC8vWmNHOVRwT0xVMXZMK1BrdnByQ1ovTjFTdHF6MHhOcnpjZFQwekZJCnhRU3IzMWZCMXF6RDIrVDRuakJjR1JPU3R2MHV4aGFhcm1XVkp3akxpYTBybEw3Z3JSTDBheHc0ckVTTTluc04KYmU4WG5KR1ZLdEZ5OU1YSEJ3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==",
    "secret_text": "kQYtFpj7pJfi5VVfoeGD"
}
```
- partner linh public key
```
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJlQZ/m1+iLfK/lpYDmicle6v0
llLWtdYhSkH6buiOrNbaXVH//ZcG9TpOLU1vL+PkvprCZ/N1Stqz0xNrzcdT0zFI
xQSr31fB1qzD2+T4njBcGROStv0uxhaarmWVJwjLia0rlL7grRL0axw4rESM9nsN
be8XnJGVKtFy9MXHBwIDAQAB
-----END PUBLIC KEY-----
```
- partner linh secret key
```
-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgGFkPDYzYPPrWGryFdZXEXtjRFlBycKW/cAdiBLUCcNQMYgyB3Kc
+oPRy7TV17xsuZC8qovx6P1XT9CXOHg63j1bJtyEQRkCXr/V2l2tkJxtjcHYjtDd
j2uupLYqodZ3Sb+UMi0LkRdk8fVE+taVk/Fn6ny/lLvcRhNPb01/yevBAgMBAAEC
gYA88EoYo/djSHwvlsCBOEOxEADhVJ/ZCT9HaXMOTOy68D+994ffeEfsGWa8BR4T
QXivDs4r+LcPZgWEAEsON898j83HjClnvpAKPzPwuJch+fQz26DPau6UQWdfMm5q
1GVx1yYOujjwi2gETb1hGlhagiZV1X+APm84bry7knDgAQJBALFqWZqFjGBUO2ro
liFsnY52vtl/xdfTwRqhwW98uEfi9xiM8D634abaYWlGAOZDDOpSgvxRgoKsxqF6
lrYvbUECQQCMh76mrbjYTh9DeEaPlNGfcWvwgKZggpsKNAiNoxpcBglS2WJ67psH
yQgx7AQgg7XMGsNetQa7xVGPyhxoRl6BAkB72kl5NNfde5ALPxlndgK7rKvo/Gjq
FZqN8/Qs1z1yecCT8/fXYNj3eSZdro/8Lzy57CYi7OgWP3Vez0ydHJjBAkAzcqro
qKcIgalOcSUcAbawsbx7ow3GPWp3VM9g0zqeQBN/wlgce2hEdGPMqwRjxvRykcW+
0XVynu2aP7sgrcqBAkEAsIWp2vZJvbJnqHoJX0qEQECEVj49PmscBpKIJZZL8FVf
gP78h6zdxHh1xq/oLavoZue7xpP6nFMQmRrqPek8+A==
-----END RSA PRIVATE KEY-----
```
- bank public key
```
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJlQZ/m1+iLfK/lpYDmicle6v0
llLWtdYhSkH6buiOrNbaXVH//ZcG9TpOLU1vL+PkvprCZ/N1Stqz0xNrzcdT0zFI
xQSr31fB1qzD2+T4njBcGROStv0uxhaarmWVJwjLia0rlL7grRL0axw4rESM9nsN
be8XnJGVKtFy9MXHBwIDAQAB
-----END PUBLIC KEY-----
```
- bank secret key
```
-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCJlQZ/m1+iLfK/lpYDmicle6v0llLWtdYhSkH6buiOrNbaXVH/
/ZcG9TpOLU1vL+PkvprCZ/N1Stqz0xNrzcdT0zFIxQSr31fB1qzD2+T4njBcGROS
tv0uxhaarmWVJwjLia0rlL7grRL0axw4rESM9nsNbe8XnJGVKtFy9MXHBwIDAQAB
AoGAFxRq3KlB58DxgfZPABeyDXWrqQI2r1Ids8PzQYGtfZG9ETCqetkdpssolsi+
vrI39r2K1KX/j2OZQKVeEq2YjFR+etusQzCRF6jqbk5O+/ajLL4veyxKQmTQXDVx
DwjsRDc1MvMsfqmnk5b0uYs9ntnT/iaqkLVtEwKMpnjFW/ECQQDvfz1wpjRKCduV
sdaH1JxqKw2mYu79Cyp7LkHKz0fvfg6SP7EAPt4j7dlBuA0n99OAklcvtfVpiXF3
rQOauC99AkEAkw/+JX4dfvGXOQ+fZerFamOUjVLEhH7I19wrHU4y56SDC2uQ1Q9n
xvxH81CxFTN7HXOKQ8uFNY06kyfzWNif0wJAd+dhMEPVy/eReymU+V4ljTXO2K2R
bxinBRLMl6gdILcgvnGqwS+4cY6EBdYKqCb4OdeKVPWpT1QjfcIeGtj51QJAMZgC
F/i4z7d/TOHk2kTbAG7GiQYxeZEcABeifoaBijajbrV+qStBzwwC454BqemrihoN
taErsgyHhVrCqOKcuwJAWyuluw+LXjvwY/sFgPXLqCPMfEP4kBXhqM/+hHK7ZerR
aLvYFAwzssSuUGlksRon0xjQ7M9P2+Bld3gcV6hUyg==
-----END RSA PRIVATE KEY-----
```

## Trang web hữu ích
- Tạo signature https://8gwifi.org/rsasignverifyfunctions.jsp
- utc timestamp https://www.epochconverter.com/
- Hex to base64 https://base64.guru/converter/encode/hex
- Beautify và minify json https://codebeautify.org/jsonviewer
- Hash, encode decode https://emn178.github.io/online-tools/sha256.html