#!/bin/sh
docker exec mariadb /usr/bin/mysqldump -u root --password=cantexitvim banking > backup-db.sql