#!/bin/sh

curl -X POST \
  'http://localhost/api/employee/deposit-customer-credit' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNTkyNzUyMzQwLCJleHAiOjE1OTI3NTgzNDB9.Ui2Pzc5kZJCx1fF1bbY9TL4dtTlAc0ouuJyCvJVl91k' \
  -d '{
  "credit_number": "025917154505",
  "amount": "2000"
}'
