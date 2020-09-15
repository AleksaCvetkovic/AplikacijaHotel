/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

DROP DATABASE IF EXISTS `hotel`;
CREATE DATABASE IF NOT EXISTS `hotel` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hotel`;

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `email`, `password_hash`) VALUES
	(1, 'aleksa.cvetkovci', '1234!!222a'),
	(2, 'Petar.Strugar', 'asdafasgSS1111'),
	(3, 'nikola.cvetkovic', '1213nikola'),
	(4, 'admin', 'admin');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `article_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL DEFAULT '0',
  `category_id` int unsigned NOT NULL DEFAULT '0',
  `except` varchar(255) NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `status` enum('availeble','not availeble') NOT NULL DEFAULT 'availeble',
  PRIMARY KEY (`article_id`),
  KEY `fk_article_category_id` (`category_id`),
  CONSTRAINT `fk_article_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `article`;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`article_id`, `name`, `category_id`, `except`, `description`, `status`) VALUES
	(1, 'soba365', 1, 'soba sa pogledom na parking', 'Soba poseduje sve sto jedan gost moze da pozeli, sadrzi djakuzi klimu krevete....', 'availeble'),
	(2, 'soba 123', 1, 'soba sa pogledom na more', 'Soba ima izlaz na terasu sa prelepim pogledom na more, koji moze da posluzi i za nocno spavanje....', 'not availeble'),
	(3, 'sala1', 2, 'sala za vencanje', 'Sala sadrzi sve sto mladenci mogu da pozele, veliki podijum za igru......', 'availeble'),
	(4, 'sala2', 2, 'sala za konferencije', 'Sala sadrzi veliki konferenciski sko sa ozvucenjem i video bibom', 'not availeble'),
	(5, 'soba', 1, 'kratak tekst', 'DuziTekst', 'availeble'),
	(6, 'soba', 1, 'kratak tekst', 'DuziTekst', 'availeble'),
	(7, 'soba', 1, 'kratak tekst', 'DuziTekst', 'availeble');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

DROP TABLE IF EXISTS `article_feature`;
CREATE TABLE IF NOT EXISTS `article_feature` (
  `article_feature_id` int unsigned NOT NULL AUTO_INCREMENT,
  `feature_id` int unsigned NOT NULL DEFAULT '0',
  `article_id` int unsigned NOT NULL DEFAULT '0',
  `value` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`article_feature_id`),
  UNIQUE KEY `uq_article_feature_feature_id_article_id` (`feature_id`,`article_id`),
  KEY `fk_article_feature_article_id` (`article_id`),
  CONSTRAINT `fk_article_feature_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_article_feature_feature_id` FOREIGN KEY (`feature_id`) REFERENCES `feature` (`feature_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `article_feature`;
/*!40000 ALTER TABLE `article_feature` DISABLE KEYS */;
INSERT INTO `article_feature` (`article_feature_id`, `feature_id`, `article_id`, `value`) VALUES
	(2, 6, 2, ''),
	(3, 1, 2, '2'),
	(4, 2, 2, '1'),
	(5, 3, 2, 'zapadna'),
	(6, 7, 1, '1'),
	(7, 1, 1, '4'),
	(8, 3, 1, 'juzna'),
	(9, 6, 1, '0'),
	(10, 11, 4, '0'),
	(11, 11, 3, '0'),
	(12, 9, 4, '0'),
	(13, 10, 4, '0'),
	(14, 9, 3, '0'),
	(15, 2, 5, 'OvakoNesto'),
	(16, 1, 5, 'takonesto'),
	(17, 2, 6, 'OvakoNesto'),
	(18, 1, 6, 'takonesto'),
	(19, 1, 7, 'takonesto'),
	(20, 2, 7, 'OvakoNesto');
/*!40000 ALTER TABLE `article_feature` ENABLE KEYS */;

DROP TABLE IF EXISTS `article_price`;
CREATE TABLE IF NOT EXISTS `article_price` (
  `artcle_price_id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int unsigned NOT NULL DEFAULT '0',
  `price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`artcle_price_id`),
  KEY `fk_article_price_article_id` (`article_id`),
  CONSTRAINT `fk_article_price_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `article_price`;
/*!40000 ALTER TABLE `article_price` DISABLE KEYS */;
INSERT INTO `article_price` (`artcle_price_id`, `article_id`, `price`) VALUES
	(1, 1, 500.00),
	(2, 5, 200.00),
	(3, 6, 200.00),
	(4, 7, 200.00);
/*!40000 ALTER TABLE `article_price` ENABLE KEYS */;

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image_path` varchar(128) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`),
  UNIQUE KEY `uq_category_image_path` (`image_path`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `name`, `image_path`) VALUES
	(1, 'soba', 'assets/ps.jpg'),
	(2, 'sala', 'assets/home.jpg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

DROP TABLE IF EXISTS `feature`;
CREATE TABLE IF NOT EXISTS `feature` (
  `feature_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `category_id` int unsigned NOT NULL,
  PRIMARY KEY (`feature_id`),
  KEY `fk_feature_category_id` (`category_id`),
  CONSTRAINT `fk_feature_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `feature`;
/*!40000 ALTER TABLE `feature` DISABLE KEYS */;
INSERT INTO `feature` (`feature_id`, `name`, `category_id`) VALUES
	(1, 'broj kreveta', 1),
	(2, 'izlaz na terasu', 1),
	(3, 'strana sveta', 1),
	(4, 'sprat', 1),
	(5, 'povrsina', 1),
	(6, 'besplatan internet', 1),
	(7, 'garderober', 1),
	(8, 'povrsina', 2),
	(9, 'posedovanje bine', 2),
	(10, 'projektor za prezentaciju', 2),
	(11, 'ozvucenje', 2);
/*!40000 ALTER TABLE `feature` ENABLE KEYS */;

DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int unsigned NOT NULL,
  `image_path` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `uq_photo_image_path` (`image_path`),
  KEY `fk_photo_article_id` (`article_id`),
  CONSTRAINT `fk_photo_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `photo`;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` (`photo_id`, `article_id`, `image_path`) VALUES
	(1, 3, 'images/1/front.jpg'),
	(2, 1, 'images/2/front.jpg');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `reservation_id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int unsigned NOT NULL DEFAULT '0',
  `status` enum('accepted','rejected','pending') NOT NULL DEFAULT 'pending',
  `article_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`reservation_id`),
  UNIQUE KEY `uq_reservation_user_id_article_id` (`user_id`,`article_id`),
  KEY `fk_reservation_article_id` (`article_id`),
  CONSTRAINT `fk_reservation_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_reservation_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `reservation`;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `firstname` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `phone_number` varchar(24) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `uq_user_phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `email`, `password_hash`, `firstname`, `lastname`, `phone_number`) VALUES
	(1, 'alkesa.cvetkovic.!6@singimail.rs', 'CD0AEB1E62AFCD053A3097D5C11E919836FA05D974CE5272E4CF78E08EA169299EF74A1F1F31243E2BAC75D1D38E5AF4FC66EF5251504AD70C226A4E22B855FB', 'Aleksa', 'Cvetkovic', '065222588'),
	(3, 'nikola.cvetkovic.!6@singimail.rs', 'EAA990F1C0CA9293E745B0D56CCDA386A07AFD9EA706EDA773C299AEE22357764D720284881C8A5A2FBD73555B5F4DD857BF38874B722B59A85F67618371BC84', 'nikola', 'peric', '068888558'),
	(4, 'petar.peric.!6@singimail.rs', '9C9BE1ACD274E7A0647758875521ED46A0CD833DCD66B2BDC2307AF4678ED15CDBC26FFF58F8A000BC51616F7125F5F288793CD9B42049AE442FC5582F8F9206', 'petar', 'peric', '088888558');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
