#!/bin/sh

curl -X POST \
  'http://localhost/api/admin/update-employee-username' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyNzI0OTYyLCJleHAiOjE1OTI3MzA5NjJ9.TQKAStKk_XbFc3kNmGFP4kkXaXYzNl1LjkrGpuWn9co' \
  -d '{
  "employee_id": "6",
  "username": "bill"
}'

curl -X POST \
  'http://localhost/api/admin/update-employee-password' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyNzI0OTYyLCJleHAiOjE1OTI3MzA5NjJ9.TQKAStKk_XbFc3kNmGFP4kkXaXYzNl1LjkrGpuWn9co' \
  -d '{
  "employee_id": "6",
  "password": "idk"
}'
