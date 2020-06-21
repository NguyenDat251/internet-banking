#!/bin/sh

curl -X POST \
  'http://localhost/api/admin/login' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "username": "admin",
  "password": "admin"
}'
