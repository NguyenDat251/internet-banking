#!/bin/sh

curl -X POST \
    'http://localhost/api/employee/add-customer' \
    -H 'Content-Type: application/json; charset=utf-8' \
    -H 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNTkyODQ0NjYwLCJleHAiOjE1OTI4NTA2NjB9.BZtTL1jWfaZZwHqvV5sEbWTIdHP3S0OE2hHNSDX4Hc0' \
    -d '{
    "username": "alibaba",
    "password": "macquansida",
    "identity_number": "129895865",
    "phone_number": "0104498257",
    "firstname": "ali",
    "lastname": "baba",
    "date_of_birth": "1990-11-12",
    "email_address": "alibaba@gmail.com"
}'
