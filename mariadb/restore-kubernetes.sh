#!/bin/sh

mariadb_pod="$(kubectl get pods --selector=io.kompose.service=mariadb | grep mariadb | cut -f1 -d ' ')"
cat backup-db.sql | kubectl exec -i $mariadb_pod -- /usr/bin/mysql -u root --password=cantexitvim banking
