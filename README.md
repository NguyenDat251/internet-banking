# Internet Banking
## Cách sử dụng api
### Api GET
#### GET thông tin số dư tài khoản bằng số tài khoản tín dụng
```json
GET /api/public/get-account-balance

HEADER
"timestamp": 1589368255
"authen-hash": "f2984b222db03d291bf44a930157941e5864e1892d15e72478acc574e8301aa5"
"partner-code": "linh"

BODY
{
    "credit_number": "565572661049",
    "action": "query"
}
```
- timestamp sử dụng unix utc second, có thể  xem ở https://www.epochconverter.com/, lưu ý timestamp **lớn hơn** hoặc nhỏ hơn quá **60**s so với thời gian thực
- partner-code là chuỗi code để xác định partner nào đã đăng kí api
- authen-hash là chuỗi hash sha256 của **timestamp+secret+body**, ví dụ nếu chuỗi secret là kQYtFpj7pJfi5VVfoeGD thì hash256("1589368255kQYtFpj7pJfi5VVfoeGD{"credit_number":"565572661049","action":"query"}")

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

## Thông tin mặc định được khởi tạo cùng với project, dùng để test api
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