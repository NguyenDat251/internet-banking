-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: banking
-- ------------------------------------------------------
-- Server version	10.4.13-MariaDB-1:10.4.13+maria~bionic

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `credit_account`
--

DROP TABLE IF EXISTS `credit_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_account` (
  `customer_id` int(11) NOT NULL,
  `credit_number` char(15) COLLATE utf8_unicode_ci NOT NULL,
  `balance` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`credit_number`),
  KEY `fk_creacc_customer` (`customer_id`),
  CONSTRAINT `credit_account_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_account`
--

LOCK TABLES `credit_account` WRITE;
/*!40000 ALTER TABLE `credit_account` DISABLE KEYS */;
INSERT INTO `credit_account` VALUES (3,'025917154505','100000',1),(1,'565572661049','500000',1);
/*!40000 ALTER TABLE `credit_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `identity_number` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone_number` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `email_address` text COLLATE utf8_unicode_ci NOT NULL,
  `username` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `hashed_password` char(70) COLLATE utf8_unicode_ci NOT NULL,
  `refresh_secret` char(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `identity_number` (`identity_number`),
  UNIQUE KEY `phone_number` (`phone_number`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'025895863','LINH','NGUYEN VAN','1998-11-12','0704468257','linh1612340@gmail.com','linh','$2a$08$gKlA.6Ie2HfU/IzgambPXOG.YinikOdf6pwaZxU6QBEB9ZWOyhinS','5FmWSukHG8PapSAcGrNS'),(3,'025895864','KHUE','DOAN','1998-11-12','0704468258','linh0903611@gmail.com','khue','$2a$08$YvaUktj.B6M4pBWWf6gqsujOcas03q3rIPZNI/8zW14rfS/WiN8P6','6sDwx1T5t8IMSPpsLmYS');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposit_transaction_history`
--

DROP TABLE IF EXISTS `deposit_transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deposit_transaction_history` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `credit_number` char(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` bigint(20) unsigned DEFAULT NULL,
  `ts` bigint(20) unsigned DEFAULT NULL,
  `partner_code` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `credit_number` (`credit_number`),
  CONSTRAINT `deposit_transaction_history_ibfk_1` FOREIGN KEY (`credit_number`) REFERENCES `credit_account` (`credit_number`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposit_transaction_history`
--

LOCK TABLES `deposit_transaction_history` WRITE;
/*!40000 ALTER TABLE `deposit_transaction_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `deposit_transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_localtransfer`
--

DROP TABLE IF EXISTS `list_localtransfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list_localtransfer` (
  `customer_id` int(11) NOT NULL,
  `credit_number` char(15) COLLATE utf8_unicode_ci NOT NULL,
  `remind_name` char(40) COLLATE utf8_unicode_ci NOT NULL,
  KEY `fk_listtransfer_customer` (`customer_id`),
  CONSTRAINT `list_localtransfer_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_localtransfer`
--

LOCK TABLES `list_localtransfer` WRITE;
/*!40000 ALTER TABLE `list_localtransfer` DISABLE KEYS */;
/*!40000 ALTER TABLE `list_localtransfer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner_api`
--

DROP TABLE IF EXISTS `partner_api`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner_api` (
  `partner_id` int(11) NOT NULL AUTO_INCREMENT,
  `partner_code` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `bankname` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `public_key` text COLLATE utf8_unicode_ci NOT NULL,
  `bank_secret` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `partner_secret` char(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`partner_id`),
  UNIQUE KEY `bankname` (`bankname`),
  UNIQUE KEY `partner_code` (`partner_code`),
  UNIQUE KEY `public_key` (`public_key`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_api`
--

LOCK TABLES `partner_api` WRITE;
/*!40000 ALTER TABLE `partner_api` DISABLE KEYS */;
INSERT INTO `partner_api` VALUES (1,'linh','linhbank','LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDSmxRWi9tMStpTGZLL2xwWURtaWNsZTZ2MApsbExXdGRZaFNrSDZidWlPck5iYVhWSC8vWmNHOVRwT0xVMXZMK1BrdnByQ1ovTjFTdHF6MHhOcnpjZFQwekZJCnhRU3IzMWZCMXF6RDIrVDRuakJjR1JPU3R2MHV4aGFhcm1XVkp3akxpYTBybEw3Z3JSTDBheHc0ckVTTTluc04KYmU4WG5KR1ZLdEZ5OU1YSEJ3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==','kQYtFpj7pJfi5VVfoeGD','idk'),(2,'NaniBank','NaniBank','LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFnc1JybVl2cUZlWEdudExSYS84NApaeDdJNWlKa0RZTlZsQ1hDeHIyV1ZBb1lLa2lRV1cvamxERDRPRWhLQ1pDSmdWVkdUNDNYeFVrUTNzdjcrZVZPCjFNTzFpU2JNcWw5NlZTQkx3eWJJZlByRmpNWG5vWEU0bGdSeTA2bEFtQ1NUbWp2V1pXNnhybEdSd2RrV054SWIKa3RSNmVSaUkvL0VSS3FoRk0rWFoydXIveFR5djI4aFpoajhVSW55SEpvZ2ZQaVgvY2FsMWRyLzdHS3pxeXFVcAovbVJudGEzMWhWWlpzWGIxTENRdHluWkk2cGZVS0xaN2pvazRMN0xtK1M5K0QzZGhjTXhCd0pEMTVJakNEdFFFCjM3bGh1YVJXQjcyaE9wTkZYRkVVV1hsNDA4U01SeXFiR1Bwcy91K1RFbXN0eW85cXlVdmR3V0ViTWczR21FN00KR1FJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t','M0ec3lAqjHV82v66VYDb','hi mom'),(3,'bankdbb','bankdbb','LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDRVVaSnd2VFlvcnVzdFFZK0YzaXFoSmUrTQordmsxMFYxZ2QrdFhBVDVlUTZCZngvRU9FRW9GaXduSC9JNUttUngzRDNhMkdIZ1dZSUxEbkNWbzVLbjZISC9SCkl1dmkxMXJsdks1Qzc5OFdZUmp2TmtPbGNmSTNNNml4UWYrZkFKU25mbE9xQ2NvUHAvUk0wSGdjeXdvVGtOV0sKUFFZcFBwazl0bm8vcWxPY3d3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==','Tj0xYDEDiQF9f2GYCxSv','bankdbb');
/*!40000 ALTER TABLE `partner_api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receive_from_transaction_history`
--

DROP TABLE IF EXISTS `receive_from_transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receive_from_transaction_history` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `credit_number` char(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `from_credit_number` char(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` bigint(20) unsigned DEFAULT NULL,
  `message` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `partner_code` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ts` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `credit_number` (`credit_number`),
  KEY `receive_from_transaction_history_FK` (`from_credit_number`),
  CONSTRAINT `receive_from_transaction_history_FK` FOREIGN KEY (`from_credit_number`) REFERENCES `credit_account` (`credit_number`),
  CONSTRAINT `receive_from_transaction_history_ibfk_1` FOREIGN KEY (`credit_number`) REFERENCES `credit_account` (`credit_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receive_from_transaction_history`
--

LOCK TABLES `receive_from_transaction_history` WRITE;
/*!40000 ALTER TABLE `receive_from_transaction_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `receive_from_transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saving_account`
--

DROP TABLE IF EXISTS `saving_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `saving_account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `credit_number` char(15) COLLATE utf8_unicode_ci NOT NULL,
  `balance` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`account_id`),
  KEY `fk_saveacc_customer` (`customer_id`),
  CONSTRAINT `saving_account_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saving_account`
--

LOCK TABLES `saving_account` WRITE;
/*!40000 ALTER TABLE `saving_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `saving_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sent_to_transaction_history`
--

DROP TABLE IF EXISTS `sent_to_transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sent_to_transaction_history` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `credit_number` char(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `to_credit_number` char(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` bigint(20) unsigned DEFAULT NULL,
  `message` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `partner_code` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ts` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `credit_number` (`credit_number`),
  KEY `sent_to_transaction_history_FK` (`to_credit_number`),
  CONSTRAINT `sent_to_transaction_history_FK` FOREIGN KEY (`to_credit_number`) REFERENCES `credit_account` (`credit_number`),
  CONSTRAINT `sent_to_transaction_history_ibfk_1` FOREIGN KEY (`credit_number`) REFERENCES `credit_account` (`credit_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sent_to_transaction_history`
--

LOCK TABLES `sent_to_transaction_history` WRITE;
/*!40000 ALTER TABLE `sent_to_transaction_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `sent_to_transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_otp`
--

DROP TABLE IF EXISTS `transaction_otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction_otp` (
  `transaction_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from_credit_number` char(15) COLLATE utf8_unicode_ci NOT NULL,
  `to_credit_number` char(15) COLLATE utf8_unicode_ci NOT NULL,
  `amount` bigint(20) unsigned NOT NULL,
  `otp` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `status` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `ts` bigint(20) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `pending_transaction_otp_FK` (`from_credit_number`),
  KEY `pending_transaction_otp_FK_1` (`to_credit_number`),
  CONSTRAINT `pending_transaction_otp_FK` FOREIGN KEY (`from_credit_number`) REFERENCES `credit_account` (`credit_number`),
  CONSTRAINT `pending_transaction_otp_FK_1` FOREIGN KEY (`to_credit_number`) REFERENCES `credit_account` (`credit_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_otp`
--

LOCK TABLES `transaction_otp` WRITE;
/*!40000 ALTER TABLE `transaction_otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdraw_transaction_history`
--

DROP TABLE IF EXISTS `withdraw_transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `withdraw_transaction_history` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `credit_number` char(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` bigint(20) unsigned DEFAULT NULL,
  `ts` bigint(20) unsigned DEFAULT NULL,
  `partner_code` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `credit_number` (`credit_number`),
  CONSTRAINT `withdraw_transaction_history_ibfk_1` FOREIGN KEY (`credit_number`) REFERENCES `credit_account` (`credit_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdraw_transaction_history`
--

LOCK TABLES `withdraw_transaction_history` WRITE;
/*!40000 ALTER TABLE `withdraw_transaction_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `withdraw_transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'banking'
--
/*!50003 DROP PROCEDURE IF EXISTS `deposit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `deposit`(
	IN accNum char(15),
	IN amount int
)
BEGIN
	DECLARE bl int;
	START TRANSACTION;

	SELECT balance INTO bl FROM banking.credit_account WHERE credit_number = accNum FOR UPDATE;
	UPDATE banking.credit_account SET balance = amount + bl WHERE credit_number = accNum;

	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `withdraw` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `withdraw`(
	IN accNum char(15),
	IN amount int
)
BEGIN
	DECLARE moneyLeft int;
	DECLARE bl int;
	START TRANSACTION;

	SELECT balance INTO bl FROM banking.credit_account WHERE credit_number = accNum FOR UPDATE;
	SET moneyLeft = bl - amount;
	IF moneyLeft < 50000 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'account balance insufficient';
	ELSE
		UPDATE banking.credit_account SET balance = moneyLeft WHERE credit_number = accNum;
	END IF;
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-28  6:45:51
