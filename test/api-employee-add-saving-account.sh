#!/bin/sh

curl -X POST \
    'http://localhost/api/employee/add-saving-account' \
    -H 'Content-Type: application/json; charset=utf-8' \
    -H 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNTkyODQ0NjYwLCJleHAiOjE1OTI4NTA2NjB9.BZtTL1jWfaZZwHqvV5sEbWTIdHP3S0OE2hHNSDX4Hc0' \
    -d '{
    "customer_id": "3",
    "balance": "101000"
}'
