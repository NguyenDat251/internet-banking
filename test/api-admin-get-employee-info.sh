#!/bin/sh

curl -X GET \
  -H 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyNzI0OTYyLCJleHAiOjE1OTI3MzA5NjJ9.TQKAStKk_XbFc3kNmGFP4kkXaXYzNl1LjkrGpuWn9co' \
  'http://localhost/api/admin/get-employee-info?employee_id=1'
