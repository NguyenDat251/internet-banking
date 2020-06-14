#!/bin/sh

curl -X POST \
  'http://localhost/api/admin/update-employee-username' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "employee_id": "6",
  "username": "bill"
}'

curl -X POST \
  'http://localhost/api/admin/update-employee-password' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "employee_id": "6",
  "password": "idk"
}'
