-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: k7d102.p.ssafy.io    Database: easssue_data
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `article_id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint NOT NULL,
  `from_kwd_id` bigint DEFAULT NULL,
  `title` varchar(300) NOT NULL,
  `link` varchar(300) NOT NULL,
  `pub_date` datetime NOT NULL,
  `hit` int NOT NULL DEFAULT '0',
  `summary` varchar(15000) DEFAULT NULL,
  `img` varchar(300) NOT NULL DEFAULT 'default url',
  PRIMARY KEY (`article_id`),
  KEY `FKy5kkohbk00g0w88fi05k2hcw` (`category_id`),
  KEY `popular_search` (`pub_date`,`hit`),
  CONSTRAINT `FKy5kkohbk00g0w88fi05k2hcw` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=801049 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `article_kwd`
--

DROP TABLE IF EXISTS `article_kwd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_kwd` (
  `article_kwd_id` bigint NOT NULL AUTO_INCREMENT,
  `article_id` bigint NOT NULL,
  `kwd_id` bigint NOT NULL,
  `kwd_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`article_kwd_id`),
  KEY `FK2pn08kfxvopjiipaungbb6xuw` (`article_id`),
  KEY `FKppnqrnawc1crrpaclt8463td5` (`kwd_id`),
  CONSTRAINT `FK2pn08kfxvopjiipaungbb6xuw` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`),
  CONSTRAINT `FKppnqrnawc1crrpaclt8463td5` FOREIGN KEY (`kwd_id`) REFERENCES `kwd` (`kwd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2463862 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `article_log`
--

DROP TABLE IF EXISTS `article_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_log` (
  `article_log_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `article_id` bigint NOT NULL,
  `category_id` bigint NOT NULL,
  `click_time` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`article_log_id`),
  KEY `FKdbracbv6v9fflsuva3lsgryuy` (`article_id`),
  KEY `FKoj1auaxaf7dralbglwa477duc` (`category_id`),
  KEY `FKoptrtc11hhnyidh2opgydhrgm` (`user_id`),
  CONSTRAINT `FKdbracbv6v9fflsuva3lsgryuy` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`),
  CONSTRAINT `FKoj1auaxaf7dralbglwa477duc` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FKoptrtc11hhnyidh2opgydhrgm` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2060 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL,
  `category_name` varchar(20) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `kwd`
--

DROP TABLE IF EXISTS `kwd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kwd` (
  `kwd_id` bigint NOT NULL AUTO_INCREMENT,
  `kwd_name` varchar(100) NOT NULL,
  PRIMARY KEY (`kwd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rec_kwd`
--

DROP TABLE IF EXISTS `rec_kwd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rec_kwd` (
  `rec_kwd_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `kwd_id` bigint NOT NULL,
  `score` double NOT NULL DEFAULT '0',
  `reg_date` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`rec_kwd_id`),
  KEY `FKmt74eu1epo0u4dxee3xgh6ldy` (`kwd_id`),
  KEY `FKd5ehshohdni9oia8tmg236qqr` (`user_id`),
  CONSTRAINT `FKd5ehshohdni9oia8tmg236qqr` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKmt74eu1epo0u4dxee3xgh6ldy` FOREIGN KEY (`kwd_id`) REFERENCES `kwd` (`kwd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=891 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rel_kwd`
--

DROP TABLE IF EXISTS `rel_kwd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rel_kwd` (
  `rel_kwd_id` bigint NOT NULL AUTO_INCREMENT,
  `from_kwd_id` bigint NOT NULL,
  `to_kwd_id` bigint NOT NULL,
  `reg_date` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`rel_kwd_id`),
  KEY `FKaxfrcau0go4qn744si82c88fe` (`from_kwd_id`),
  KEY `FKktlald405f9vlibdys4su20j4` (`to_kwd_id`),
  CONSTRAINT `FKaxfrcau0go4qn744si82c88fe` FOREIGN KEY (`from_kwd_id`) REFERENCES `kwd` (`kwd_id`),
  CONSTRAINT `FKktlald405f9vlibdys4su20j4` FOREIGN KEY (`to_kwd_id`) REFERENCES `kwd` (`kwd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=91878 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trend`
--

DROP TABLE IF EXISTS `trend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trend` (
  `trend_id` bigint NOT NULL AUTO_INCREMENT,
  `ranking` int DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `reg_date` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`trend_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6753 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_kwd`
--

DROP TABLE IF EXISTS `user_kwd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_kwd` (
  `user_kwd_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `kwd_id` bigint NOT NULL,
  `type` char(1) NOT NULL,
  PRIMARY KEY (`user_kwd_id`),
  KEY `FKio2m57in24qox25qbs06f9l6g` (`kwd_id`),
  KEY `FKhclojtcs3pehsdw1ddwr92h25` (`user_id`),
  CONSTRAINT `FKhclojtcs3pehsdw1ddwr92h25` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKio2m57in24qox25qbs06f9l6g` FOREIGN KEY (`kwd_id`) REFERENCES `kwd` (`kwd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1683 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `word_cloud_img` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 22:54:22
