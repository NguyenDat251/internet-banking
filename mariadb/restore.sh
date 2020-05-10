#!/bin/sh
cat backup-db.sql | docker exec -i mariadb /usr/bin/mysql -u root --password=cantexitvim banking