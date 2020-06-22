#!/bin/sh

curl -X GET \
  -H 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNTkyNzUyMzQwLCJleHAiOjE1OTI3NTgzNDB9.Ui2Pzc5kZJCx1fF1bbY9TL4dtTlAc0ouuJyCvJVl91k' \
  'http://localhost/api/employee/get-customer-transactions?customer_id=3'