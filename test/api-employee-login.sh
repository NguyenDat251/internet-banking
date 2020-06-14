#!/bin/sh

curl -X POST \
  'http://localhost/api/employee/login' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "username": "trump",
  "password": "idiot"
}'
