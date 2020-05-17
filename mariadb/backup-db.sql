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
  `account_number` char(15) COLLATE utf8_unicode_ci NOT NULL,
  `balance` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`account_number`),
  KEY `fk_creacc_customer` (`customer_id`),
  CONSTRAINT `fk_creacc_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_account`
--

LOCK TABLES `credit_account` WRITE;
/*!40000 ALTER TABLE `credit_account` DISABLE KEYS */;
INSERT INTO `credit_account` VALUES (1,'565572661049','100000',1);
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
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `identity_number` (`identity_number`),
  UNIQUE KEY `phone_number` (`phone_number`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'025895863','LINH','NGUYEN VAN','1998-11-12','0704468257','linh1612340@gmail.com','linh','$2a$08$gKlA.6Ie2HfU/IzgambPXOG.YinikOdf6pwaZxU6QBEB9ZWOyhinS');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_localtransfer_receiver`
--

DROP TABLE IF EXISTS `list_localtransfer_receiver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list_localtransfer_receiver` (
  `customer_id` int(11) NOT NULL,
  `account_number` char(15) COLLATE utf8_unicode_ci NOT NULL,
  `remind_name` char(40) COLLATE utf8_unicode_ci NOT NULL,
  KEY `fk_listtransfer_customer` (`customer_id`),
  CONSTRAINT `fk_listtransfer_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_localtransfer_receiver`
--

LOCK TABLES `list_localtransfer_receiver` WRITE;
/*!40000 ALTER TABLE `list_localtransfer_receiver` DISABLE KEYS */;
/*!40000 ALTER TABLE `list_localtransfer_receiver` ENABLE KEYS */;
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
  `public_key` text COLLATE utf8_unicode_ci NOT NULL,
  `secret_text` char(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`partner_id`),
  UNIQUE KEY `partner_code` (`partner_code`),
  UNIQUE KEY `public_key` (`public_key`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_api`
--

LOCK TABLES `partner_api` WRITE;
/*!40000 ALTER TABLE `partner_api` DISABLE KEYS */;
INSERT INTO `partner_api` VALUES (1,'linh','LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDSmxRWi9tMStpTGZLL2xwWURtaWNsZTZ2MApsbExXdGRZaFNrSDZidWlPck5iYVhWSC8vWmNHOVRwT0xVMXZMK1BrdnByQ1ovTjFTdHF6MHhOcnpjZFQwekZJCnhRU3IzMWZCMXF6RDIrVDRuakJjR1JPU3R2MHV4aGFhcm1XVkp3akxpYTBybEw3Z3JSTDBheHc0ckVTTTluc04KYmU4WG5KR1ZLdEZ5OU1YSEJ3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==','kQYtFpj7pJfi5VVfoeGD');
/*!40000 ALTER TABLE `partner_api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saving_account`
--

DROP TABLE IF EXISTS `saving_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `saving_account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_number` char(15) COLLATE utf8_unicode_ci NOT NULL,
  `balance` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`account_id`),
  KEY `fk_saveacc_customer` (`customer_id`),
  CONSTRAINT `fk_saveacc_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saving_account`
--

LOCK TABLES `saving_account` WRITE;
/*!40000 ALTER TABLE `saving_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `saving_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-17  6:18:56
