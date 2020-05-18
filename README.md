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

## Danh sách các ngân hàng  liên  kết
### Ngân hàng đại diện nhóm chẵn:
- Tên ngân hàng:
```
NaniBank
```
- Public key:
```
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
ZGUNTlkge6l6=YqQ3
```

## Docker và Kubernetes

### Môi trường lập trình local

Cài đặt `docker` và `docker-compose`

Chạy app bao gồm frontend, backend, database trong các container:

```sh
docker-compose up --build
```

Restore database bằng script có sẵn:

```sh
cd mariadb
./restore.sh
```

### Deploy lên Kubernetes cluster trên Google Cloud

Cài đặt `kubectl`

Build image nodejs và push lên [Docker Hub](https://hub.docker.com/repository/docker/khuedoan/node-kubernetes):

```sh
docker login -u khuedoan
docker build -t khuedoan/node-kubernetes .
docker push khuedoan/node-kubernetes
```

Deploy lên Google Kubernetes Engine:

```sh
kubectl apply -f kubernetes/
```

Restore database bằng script có sẵn:

```sh
cd mariadb
./restore-kubernetes.sh
```

### CI/CD

TODO

## Trang web hữu ích

- Tạo signature https://8gwifi.org/rsasignverifyfunctions.jsp
- utc timestamp https://www.epochconverter.com/
- Hex to base64 https://base64.guru/converter/encode/hex
- Beautify và minify json https://codebeautify.org/jsonviewer
- Hash, encode decode https://emn178.github.io/online-tools/sha256.html
- Hash online https://quickhash.com/ 
