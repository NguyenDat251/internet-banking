#!/bin/sh

curl -X POST \
  'http://localhost/api/customer/login' \
  -H 'Content-Length: 46' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "username": "LINH",
  "password": "linh"
}'
