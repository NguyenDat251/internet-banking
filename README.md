# Internet Banking

- [Internet Banking](#internet-banking)
  - [Thuật toán bảo mật API](#thu%e1%ba%adt-to%c3%a1n-b%e1%ba%a3o-m%e1%ba%adt-api)
  - [Hướng dẫn sử dụng api](#h%c6%b0%e1%bb%9bng-d%e1%ba%abn-s%e1%bb%ad-d%e1%bb%a5ng-api)
    - [API dành cho partner](#api-d%c3%a0nh-cho-partner)
      - [Lấy thông tin tài khoản khách hàng bằng số tài khoản](#l%e1%ba%a5y-th%c3%b4ng-tin-t%c3%a0i-kho%e1%ba%a3n-kh%c3%a1ch-h%c3%a0ng-b%e1%ba%b1ng-s%e1%bb%91-t%c3%a0i-kho%e1%ba%a3n)
      - [Nạp tiền vào tài khoản](#n%e1%ba%a1p-ti%e1%bb%81n-v%c3%a0o-t%c3%a0i-kho%e1%ba%a3n)
      - [Rút tiền từ tài khoản](#r%c3%bat-ti%e1%bb%81n-t%e1%bb%ab-t%c3%a0i-kho%e1%ba%a3n)
    - [API dành cho customer](#api-d%c3%a0nh-cho-customer)
    - [API dành cho employee](#api-d%c3%a0nh-cho-employee)
      - [Thêm thông tin khách hàng vào hệ thống](#th%c3%aam-th%c3%b4ng-tin-kh%c3%a1ch-h%c3%a0ng-v%c3%a0o-h%e1%bb%87-th%e1%bb%91ng)
    - [API dành cho admin](#api-d%c3%a0nh-cho-admin)
      - [Thêm thông tin partner vào hệ thống](#th%c3%aam-th%c3%b4ng-tin-partner-v%c3%a0o-h%e1%bb%87-th%e1%bb%91ng)
  - [Một số thông tin mặc định được khởi tạo cùng với project, dùng để test api](#m%e1%bb%99t-s%e1%bb%91-th%c3%b4ng-tin-m%e1%ba%b7c-%c4%91%e1%bb%8bnh-%c4%91%c6%b0%e1%bb%a3c-kh%e1%bb%9fi-t%e1%ba%a1o-c%c3%b9ng-v%e1%bb%9bi-project-d%c3%b9ng-%c4%91%e1%bb%83-test-api)
  - [Docker và Kubernetes](#docker-v%c3%a0-kubernetes)
    - [Môi trường lập trình local](#m%c3%b4i-tr%c6%b0%e1%bb%9dng-l%e1%ba%adp-tr%c3%acnh-local)
    - [Deploy lên Kubernetes cluster trên Google Cloud](#deploy-l%c3%aan-kubernetes-cluster-tr%c3%aan-google-cloud)
    - [CI/CD](#cicd)
  - [Trang web hữu ích](#trang-web-h%e1%bb%afu-%c3%adch)

## Thuật toán bảo mật API

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

var dataToSign = '1589520986kQYtFpj7pJfi5VVfoeGD{"credit_number":"565572661049","amount":200000}';
var signature = RSASign(privateKey, dataToSign);
RSAVerify(publicKey, signature, dataToSign);
```

```html
OUTPUT
EpQlSKV/gkr41Y1I3XmyBtdxS51l3po1QZA19X2CQm6jSKkLecVVrlr6SNrXPSLMeRp+dBEdI+XIdwynTaiyrCY53MF/vm6cJAZ3ZkUb9a5p9nv3Qq4NzRTEJkZApviU7FZBbfxsV5wsqesTHtKeMGF9K5nh0sq5CXowGkwxtR8=
true
```

- Hash algo (cho **secret_text**) sử dụng **sha256**, ví dụ chương trình tạo chuỗi hash bằng nodejs

```js
const crypto = require('crypto');

const dataToHash = '1589520986kQYtFpj7pJfi5VVfoeGD{"credit_number":"565572661049","amount":200000}';
let hashString = crypto.createHash('sha256').update(dataToHash).digest('base64');
console.log(hashString);
```

```html
OUTPUT
d1JAmSmW2fXBElQ/NjXT7Yk+xQM1oWthn0iItHfL0io=
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

## Hướng dẫn sử dụng api

### API dành cho partner

#### Lấy thông tin tài khoản khách hàng bằng số tài khoản

```json
GET /api/partner/get-account-info

HEADER
"partner-code": "linh"
"timestamp": 1589520986
"authen-hash": "1IMI0cZpABCeG3zehxQMml2J2L3ypWTRe44j+hm0A9M="

BODY
{"credit_number":"565572661049"}
```

- timestamp là thời điểm gởi request, format sử dụng unix utc second, có thể  xem ở <https://www.epochconverter.com/,> lưu ý timestamp không được **lớn hơn** hoặc nhỏ hơn quá **60**s so với thời gian thực
- partner-code là chuỗi code để xác định partner nào đã đăng kí api
- authen-hash là chuỗi hash sha256 của **timestamp+secret+body**,sau đó được encode base64 lại và gửi đi, ví dụ ở trên
- Không yêu cầu **authen-sig**

#### Nạp tiền vào tài khoản

```json
POST /api/partner/deposit

HEADER
"partner-code": "linh"
"timestamp": 1589520986
"authen-hash": "d1JAmSmW2fXBElQ/NjXT7Yk+xQM1oWthn0iItHfL0io="
"authen-sig": "EpQlSKV/gkr41Y1I3XmyBtdxS51l3po1QZA19X2CQm6jSKkLecVVrlr6SNrXPSLMeRp+dBEdI+XIdwynTaiyrCY53MF/vm6cJAZ3ZkUb9a5p9nv3Qq4NzRTEJkZApviU7FZBbfxsV5wsqesTHtKeMGF9K5nh0sq5CXowGkwxtR8="

BODY
{"credit_number":"565572661049","amount":200000}
```

- authen-sig là chuỗi signature được tạo bởi thuật toán **RSA-SHA256** của chuỗi **timestamp+secret+body**, xem ví dụ ở trên
  
#### Rút tiền từ tài khoản

```json
POST /api/partner/withdraw

HEADER
"partner-code": "linh"
"timestamp": 1589520986
"authen-hash": "d1JAmSmW2fXBElQ/NjXT7Yk+xQM1oWthn0iItHfL0io="
"authen-sig": "EpQlSKV/gkr41Y1I3XmyBtdxS51l3po1QZA19X2CQm6jSKkLecVVrlr6SNrXPSLMeRp+dBEdI+XIdwynTaiyrCY53MF/vm6cJAZ3ZkUb9a5p9nv3Qq4NzRTEJkZApviU7FZBbfxsV5wsqesTHtKeMGF9K5nh0sq5CXowGkwxtR8="

BODY
{"credit_number":"565572661049","amount":200000}
```

### API dành cho customer

### API dành cho employee

#### Thêm thông tin khách hàng vào hệ thống

```json
POST /api/employee/add-customer

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

### API dành cho admin

#### Thêm thông tin partner vào hệ thống

```json
POST /api/admin/add-partner

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

```html
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJlQZ/m1+iLfK/lpYDmicle6v0
llLWtdYhSkH6buiOrNbaXVH//ZcG9TpOLU1vL+PkvprCZ/N1Stqz0xNrzcdT0zFI
xQSr31fB1qzD2+T4njBcGROStv0uxhaarmWVJwjLia0rlL7grRL0axw4rESM9nsN
be8XnJGVKtFy9MXHBwIDAQAB
-----END PUBLIC KEY-----
```

- partner linh secret key

```html
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

```html
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJlQZ/m1+iLfK/lpYDmicle6v0
llLWtdYhSkH6buiOrNbaXVH//ZcG9TpOLU1vL+PkvprCZ/N1Stqz0xNrzcdT0zFI
xQSr31fB1qzD2+T4njBcGROStv0uxhaarmWVJwjLia0rlL7grRL0axw4rESM9nsN
be8XnJGVKtFy9MXHBwIDAQAB
-----END PUBLIC KEY-----
```

- bank secret key

```html
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
### Ngân hàng đại diện nhóm chẵn (PGP):
- Tên ngân hàng:
```
NaniBank
```
- Public key (RSA):
```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgsRrmYvqFeXGntLRa/84
Zx7I5iJkDYNVlCXCxr2WVAoYKkiQWW/jlDD4OEhKCZCJgVVGT43XxUkQ3sv7+eVO
1MO1iSbMql96VSBLwybIfPrFjMXnoXE4lgRy06lAmCSTmjvWZW6xrlGRwdkWNxIb
ktR6eRiI//ERKqhFM+XZ2ur/xTyv28hZhj8UInyHJogfPiX/cal1dr/7GKzqyqUp
/mRnta31hVZZsXb1LCQtynZI6pfUKLZ7jok4L7Lm+S9+D3dhcMxBwJD15IjCDtQE
37lhuaRWB72hOpNFXFEUWXl408SMRyqbGPps/u+TEmstyo9qyUvdwWEbMg3GmE7M
GQIDAQAB
-----END PUBLIC KEY-----
```
- Secret text:
```
himom
```

### Ngân hàng đại diện nhóm lẻ (RSA):
- Tên ngân hàng:
```
bankdbb
```
- Public key (RSA):
```
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEUZJwvTYorustQY+F3iqhJe+M
+vk10V1gd+tXAT5eQ6Bfx/EOEEoFiwnH/I5KmRx3D3a2GHgWYILDnCVo5Kn6HH/R
Iuvi11rlvK5C798WYRjvNkOlcfI3M6ixQf+fAJSnflOqCcoPp/RM0HgcywoTkNWK
PQYpPpk9tno/qlOcwwIDAQAB
-----END PUBLIC KEY-----

```
- Secret text:
```
bankdbb
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

- Tạo signature <https://8gwifi.org/rsasignverifyfunctions.jsp>
- utc timestamp <https://www.epochconverter.com/>
- Hex to base64 <https://base64.guru/converter/encode/hex>
- Beautify và minify json <https://codebeautify.org/jsonviewer>
- Hash, encode decode <https://emn178.github.io/online-tools/sha256.html>
- Hash online <https://quickhash.com/>
