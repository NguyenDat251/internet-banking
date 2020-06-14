#!/bin/sh

curl -X POST \
  'http://localhost/api/admin/delete-employee' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "employee_id": "3"
}'
