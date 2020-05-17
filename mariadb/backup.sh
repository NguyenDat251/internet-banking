#!/bin/sh
docker exec mariadb /usr/bin/mysqldump --routines -u root --password=cantexitvim banking > backup-db.sql