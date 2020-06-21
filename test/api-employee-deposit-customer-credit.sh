#!/bin/sh

curl -X POST \
  'http://localhost/api/employee/deposit-customer-credit' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNTkyNzMzNzYxLCJleHAiOjE1OTI3Mzk3NjF9.T_ieKGILrdE7YhZVyb0qIRQAque7ktPzcTVZ7Qk-6Ew' \
  -d '{
  "credit_number": "025917154505",
  "amount": "2000"
}'
