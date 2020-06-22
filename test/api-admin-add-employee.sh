#!/bin/sh

curl -X POST \
  'http://localhost/api/admin/add-employee' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyODM1NzY0LCJleHAiOjE1OTI4NDE3NjR9.ZZ4Nv5IcBxWU4L_O9tWHxs4jURi0YHFBmbb9m9c_qX8' \
  -d '{
  "username": "trump",
  "password": "idiot"
}'
