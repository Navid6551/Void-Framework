-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ahvaz_rp
CREATE DATABASE IF NOT EXISTS `ahvaz_rp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `ahvaz_rp`;

-- Dumping structure for table ahvaz_rp.bans
CREATE TABLE IF NOT EXISTS `bans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `license` varchar(50) DEFAULT NULL,
  `discord` varchar(50) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `expire` int(11) DEFAULT NULL,
  `bannedby` varchar(255) NOT NULL DEFAULT 'LeBanhammer',
  PRIMARY KEY (`id`),
  KEY `license` (`license`),
  KEY `discord` (`discord`),
  KEY `ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp.bans: ~0 rows (approximately)
DELETE FROM `bans`;

-- Dumping structure for table ahvaz_rp.businesses
CREATE TABLE IF NOT EXISTS `businesses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` longtext NOT NULL DEFAULT '',
  `name` longtext NOT NULL DEFAULT '',
  `business_type` longtext NOT NULL DEFAULT '',
  `bank_account_id` bigint(20) NOT NULL DEFAULT 0,
  `bank_balance` bigint(20) DEFAULT 0,
  `employees` longtext NOT NULL DEFAULT '',
  `roles` longtext NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp.businesses: ~0 rows (approximately)
DELETE FROM `businesses`;

-- Dumping structure for table ahvaz_rp.inventory
CREATE TABLE IF NOT EXISTS `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '0',
  `information` longtext DEFAULT '{}',
  `slot` int(11) NOT NULL,
  `dropped` tinyint(1) NOT NULL DEFAULT 0,
  `creationDate` bigint(20) NOT NULL DEFAULT 0,
  `quality` int(11) DEFAULT 100,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1986 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp.inventory: ~3 rows (approximately)
DELETE FROM `inventory`;
INSERT INTO `inventory` (`id`, `item_id`, `name`, `information`, `slot`, `dropped`, `creationDate`, `quality`) VALUES
	(1980, 'mobilephone', 'ply-1', '{}', 1, 0, 1726913425560, 100),
	(1981, 'racingusb2', 'ply-1', '{"characterId":1,"Alias":"Kir"}', 2, 0, 1726913881496, 100),
	(1983, 'racingusb0', 'ply-1', '{"characterId":1}', 3, 0, 1726914851947, 100),
	(1985, 'pixellaptop', 'ply-1', '{}', 4, 0, 1727035979668, 100);

-- Dumping structure for table ahvaz_rp.jobs_whitelist
CREATE TABLE IF NOT EXISTS `jobs_whitelist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizenid` longtext DEFAULT NULL,
  `job` varchar(50) DEFAULT 'unemployed',
  `rank` int(11) DEFAULT 0,
  `callsign` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `department` varchar(50) DEFAULT 'police',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp.jobs_whitelist: ~0 rows (approximately)
DELETE FROM `jobs_whitelist`;

-- Dumping structure for table ahvaz_rp.phone_contacts
CREATE TABLE IF NOT EXISTS `phone_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizenid` longtext DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `number` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp.phone_contacts: ~0 rows (approximately)
DELETE FROM `phone_contacts`;
INSERT INTO `phone_contacts` (`id`, `citizenid`, `name`, `number`) VALUES
	(1, '1', 'dfsdfs', '3242343242');

-- Dumping structure for table ahvaz_rp.players
CREATE TABLE IF NOT EXISTS `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(50) NOT NULL,
  `license` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `money` text NOT NULL,
  `charinfo` text DEFAULT NULL,
  `job` text NOT NULL,
  `gang` text DEFAULT NULL,
  `position` text NOT NULL,
  `metadata` text NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`citizenid`),
  KEY `id` (`id`),
  KEY `last_updated` (`last_updated`),
  KEY `license` (`license`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp.players: ~1 rows (approximately)
DELETE FROM `players`;
INSERT INTO `players` (`id`, `citizenid`, `license`, `name`, `money`, `charinfo`, `job`, `gang`, `position`, `metadata`, `last_updated`) VALUES
	(1, '1', 'steam:1100001465d721f', 'Chipmunk', '{"cash":500,"bank":5000,"casino":0}', '{"nationality":"USA","gender":0,"firstname":"Rotabu","lastname":"Sag Ahwazi","account":"1125895435030","phone":"3974407171","birthdate":"2000-01-01"}', '{"grade":{"name":"Freelancer","level":0},"type":"none","name":"unemployed","label":"Civilian","onduty":false,"payment":10,"isboss":false}', '{"grade":{"name":"none","level":0},"isboss":false,"label":"No Gang Affiliation","name":"none"}', '{"x":-1031.4857177734376,"y":-474.052734375,"z":36.23876953125}', '{"callsign":"NO CALLSIGN","bloodtype":"O-","armor":0,"thirst":100,"injail":0,"ammo":[],"rep":{"boosting":0},"licences":{"business":false,"driver":true,"weapon":false},"hunger":100,"stress":0,"fingerprint":"LN728Q71WSa6875"}', '2024-09-22 20:26:06');

-- Dumping structure for table ahvaz_rp.player_clothes
CREATE TABLE IF NOT EXISTS `player_clothes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizenid` int(11) DEFAULT NULL,
  `model` longtext DEFAULT NULL,
  `drawables` longtext DEFAULT NULL,
  `props` longtext DEFAULT NULL,
  `hairColor` longtext DEFAULT NULL,
  `fadeLayer` longtext DEFAULT NULL,
  `fade` longtext DEFAULT NULL,
  `customHeadModel` longtext DEFAULT NULL,
  `tattoos` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Dumping data for table ahvaz_rp.player_clothes: ~0 rows (approximately)
DELETE FROM `player_clothes`;
INSERT INTO `player_clothes` (`id`, `citizenid`, `model`, `drawables`, `props`, `hairColor`, `fadeLayer`, `fade`, `customHeadModel`, `tattoos`) VALUES
	(1, 1, '1885233650', '{"Face":[0,0],"Mask":[0,0],"Hair":[0,0],"Torso":[0,0],"Leg":[0,0],"Parachute":[0,0],"Shoes":[1,2],"Accessory":[0,0],"Undershirt":[0,1],"Kevlar":[0,0],"Badge":[0,0],"Jacket":[0,1]}', '{"Hat":[-1,-1],"Glasses":[-1,-1],"Ears":[-1,-1],"Watch":[-1,-1],"Bracelet":[-1,-1]}', '[1,1]', NULL, NULL, '0', NULL);

-- Dumping structure for table ahvaz_rp.player_face
CREATE TABLE IF NOT EXISTS `player_face` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizenid` int(11) DEFAULT NULL,
  `model` longtext DEFAULT NULL,
  `headblend` longtext DEFAULT NULL,
  `features` longtext DEFAULT NULL,
  `overlays` longtext DEFAULT NULL,
  `eyeColor` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Dumping data for table ahvaz_rp.player_face: ~0 rows (approximately)
DELETE FROM `player_face`;
INSERT INTO `player_face` (`id`, `citizenid`, `model`, `headblend`, `features`, `overlays`, `eyeColor`) VALUES
	(1, 1, '1885233650', '{"ShapeFirst":0,"ShapeSecond":0,"ShapeThird":0,"SkinFirst":15,"SkinSecond":0,"SkinThird":0,"ShapeMix":0,"SkinMix":1,"ThirdMix":0}', '{"nose_width":0,"nose_peak":0,"nose_length":0,"nose_bone_curveness":0,"nose_tip":0,"nose_bone_twist":0,"eyebrow_up_down":0,"eyebrow_in_out":0,"cheek_bones":0,"cheek_sideways_bone_size":0,"cheek_bones_width":0,"eye_opening":0,"lip_thickness":0,"jaw_bone_width":0,"jaw_bone_shape":0,"chin_bone":0,"chin_bone_length":0,"chin_bone_shape":0,"chin_hole":0,"neck_thickness":0}', '{"Blemishes":{"value":255,"colorType":0,"firstColor":0,"secondColor":0,"opacity":1},"FacialHair":{"value":255,"colorType":1,"firstColor":0,"secondColor":0,"opacity":0},"Eyebrows":{"value":255,"colorType":1,"firstColor":0,"secondColor":0,"opacity":1},"Ageing":{"value":255,"colorType":0,"firstColor":0,"secondColor":0,"opacity":1},"Makeup":{"value":255,"colorType":2,"firstColor":0,"secondColor":0,"opacity":1},"Blush":{"value":255,"colorType":2,"firstColor":0,"secondColor":0,"opacity":1},"Complexion":{"value":255,"colorType":0,"firstColor":0,"secondColor":0,"opacity":1},"SunDamage":{"value":255,"colorType":0,"firstColor":0,"secondColor":0,"opacity":1},"Lipstick":{"value":255,"colorType":2,"firstColor":0,"secondColor":0,"opacity":1},"MolesFreckles":{"value":255,"colorType":0,"firstColor":0,"secondColor":0,"opacity":1},"ChestHair":{"value":255,"colorType":1,"firstColor":0,"secondColor":0,"opacity":1},"BodyBlemishes":{"value":255,"colorType":0,"firstColor":0,"secondColor":0,"opacity":1},"AddBodyBlemishes":{"value":255,"colorType":0,"firstColor":0,"secondColor":0,"opacity":1}}', -1);

-- Dumping structure for table ahvaz_rp.player_motel
CREATE TABLE IF NOT EXISTS `player_motel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizenid` longtext DEFAULT NULL,
  `building_type` int(11) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp.player_motel: ~0 rows (approximately)
DELETE FROM `player_motel`;
INSERT INTO `player_motel` (`id`, `citizenid`, `building_type`) VALUES
	(1, '1', 3);

-- Dumping structure for table ahvaz_rp.player_outfits
CREATE TABLE IF NOT EXISTS `player_outfits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `tags` varchar(50) DEFAULT NULL,
  `slot` varchar(50) DEFAULT NULL,
  `model` longtext DEFAULT NULL,
  `drawables` longtext DEFAULT NULL,
  `props` longtext DEFAULT NULL,
  `hairColor` longtext DEFAULT NULL,
  `fadeLayer` longtext DEFAULT NULL,
  `customHeadModel` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `citizenid` (`citizenid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table ahvaz_rp.player_outfits: ~0 rows (approximately)
DELETE FROM `player_outfits`;

-- Dumping structure for table ahvaz_rp._admin_ban
CREATE TABLE IF NOT EXISTS `_admin_ban` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ban_id` longtext NOT NULL,
  `tokens` longtext NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `admin` varchar(255) DEFAULT NULL,
  `SteamID` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `from` mediumtext DEFAULT NULL,
  `until` mediumtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp._admin_ban: ~0 rows (approximately)
DELETE FROM `_admin_ban`;

-- Dumping structure for table ahvaz_rp._admin_player_log
CREATE TABLE IF NOT EXISTS `_admin_player_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `steamid` varchar(255) DEFAULT NULL,
  `log` longtext DEFAULT NULL,
  `date` longtext DEFAULT NULL,
  `cid` int(255) DEFAULT NULL,
  `data` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp._admin_player_log: ~0 rows (approximately)
DELETE FROM `_admin_player_log`;

-- Dumping structure for table ahvaz_rp._cameras
CREATE TABLE IF NOT EXISTS `_cameras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` longtext DEFAULT NULL,
  `coords` longtext DEFAULT NULL,
  `heading` longtext DEFAULT NULL,
  `users` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp._cameras: ~0 rows (approximately)
DELETE FROM `_cameras`;

-- Dumping structure for table ahvaz_rp._car_sale
CREATE TABLE IF NOT EXISTS `_car_sale` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vin` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `sell_price` int(255) DEFAULT NULL,
  `buyer_name` varchar(255) DEFAULT NULL,
  `seller_name` varchar(255) DEFAULT NULL,
  `sell_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp._car_sale: ~0 rows (approximately)
DELETE FROM `_car_sale`;

-- Dumping structure for table ahvaz_rp._garage
CREATE TABLE IF NOT EXISTS `_garage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `garage_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `business_id` varchar(255) DEFAULT NULL,
  `shared` int(1) DEFAULT NULL,
  `parking_limit` int(10) DEFAULT NULL,
  `location` longtext DEFAULT NULL,
  `vehicle_types` longtext DEFAULT NULL,
  `parking_spots` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp._garage: ~22 rows (approximately)
DELETE FROM `_garage`;
INSERT INTO `_garage` (`id`, `garage_id`, `name`, `type`, `business_id`, `shared`, `parking_limit`, `location`, `vehicle_types`, `parking_spots`) VALUES
	(1, 'garage_alta', 'Alta Street Garage', 'public', NULL, 0, 10, '{"vectors":{"x":-315.79,"y":-982.05,"z":35.11},"length":9,"width":43.6,"options":{"heading":338,"debugPoly":false}}', '["land"]', '[{"type":["land"],"size":2,"distance":1.2,"heading":160,"coords":{"x":-297.812,"y":-990.57,"z":30.081}},{"type":["land"],"size":2,"distance":1.2,"heading":160,"coords":{"x":-301.286,"y":-989.269,"z":30.081}},{"type":["land"],"size":2,"distance":1.2,"heading":160,"coords":{"x":-304.761,"y":-987.968,"z":30.081}},{"type":["land"],"size":2,"distance":1.2,"heading":160,"coords":{"x":-308.235,"y":-986.667,"z":30.081}},{"type":["land"],"size":2,"distance":1.2,"heading":160,"coords":{"x":-311.709,"y":-985.366,"z":30.081}},{"type":["land"],"size":2,"distance":1.2,"heading":160,"coords":{"x":-315.184,"y":-984.065,"z":30.081}},{"type":["land"],"size":2,"distance":1.2,"heading":160,"coords":{"x":-318.658,"y":-982.763,"z":30.081}},{"type":["land"],"size":2,"distance":1.2,"heading":160,"coords":{"x":-322.132,"y":-981.462,"z":30.081}},{"type":["land"],"size":2,"distance":1.2,"heading":160,"coords":{"x":-325.607,"y":-980.161,"z":30.081}},{"type":["land"],"size":2,"distance":1.2,"heading":160,"coords":{"x":-329.081,"y":-978.86,"z":30.081}},{"type":["land"],"size":2,"distance":1.2,"heading":160,"coords":{"x":-332.555,"y":-977.559,"z":30.081}}]'),
	(2, 'ems_shared', 'EMS Shared Vehicle Garage', 'state', NULL, 1, 10, '{"vectors":{"x":326.03,"y":-588.75,"z":28.8},"length":17.8,"width":6.2,"options":{"heading":250,"minZ":27.8,"maxZ":31.8,"debugPoly":false},"hidden":true}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":338.05807,"coords":{"x":332.717,"y":-591.197,"z":27.797}},{"type":"land","size":2,"distance":1.2,"heading":338.05807,"coords":{"x":329.376,"y":-590.018,"z":27.797}},{"type":"land","size":2,"distance":1.2,"heading":338.05807,"coords":{"x":326.035,"y":-588.839,"z":27.797}},{"type":"land","size":2,"distance":1.2,"heading":338.05807,"coords":{"x":322.694,"y":-587.66,"z":27.797}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":319.353,"y":-586.481,"z":27.797}}]'),
	(3, 'garage_pier', 'Pier Garage', 'public', NULL, 0, 10, '{"vectors":{"x":-1587.39,"y":-898.65,"z":9.74},"length":6,"width":12.8,"options":{"heading":320,"minZ":7.94,"maxZ":11.94,"debugPoly":false}}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":140,"coords":{"x":-1590.957,"y":-895.5,"z":8.547}},{"type":"land","size":2,"distance":1.2,"heading":140,"coords":{"x":-1588.607,"y":-897.503,"z":8.566}},{"type":"land","size":2,"distance":1.2,"heading":140,"coords":{"x":-1586.256,"y":-899.507,"z":8.586}},{"type":"land","size":2,"distance":1.2,"heading":140,"coords":{"x":-1583.906,"y":-901.51,"z":8.606}},{"type":"land","size":2,"distance":1.2,"heading":140,"coords":{"x":-1581.555,"y":-903.513,"z":8.626}}]'),
	(4, 'garage_a', 'Garage A', 'public', NULL, 0, 10, '{"vectors":{"x":466.29,"y":-71.95,"z":77.46},"length":11.8,"width":5,"options":{"heading":70,"minZ":76.46,"maxZ":80.46,"debugPoly":false}}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":160,"coords":{"x":469.84,"y":-73.424,"z":76.461}},{"type":"land","size":2,"distance":1.2,"heading":160,"coords":{"x":466.25,"y":-72.174,"z":76.461}},{"type":"land","size":2,"distance":1.2,"heading":160,"coords":{"x":466.25,"y":-70.924,"z":76.461}}]'),
	(5, 'garage_cosmic', 'Cosmic Cannabis Garage', 'business', 'cosmic_cannabis', 0, 1, '{"vectors":{"x":194.83,"y":-251.71,"z":65.15},"length":15.8,"width":9,"options":{"heading":340,"debugPoly":false},"hidden":true}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":67.48,"coords":{"x":198.15,"y":-248.004,"z":64.735}},{"type":"land","size":2,"distance":1.2,"heading":67.48,"coords":{"x":196.928,"y":-251.252,"z":64.735}},{"type":"land","size":2,"distance":1.2,"heading":67.48,"coords":{"x":195.706,"y":-254.5,"z":64.735}},{"type":"land","size":2,"distance":1.2,"heading":67.48,"coords":{"x":194.484,"y":-257.748,"z":64.735}}]'),
	(6, 'garage_casino', 'Casino Garage', 'public', NULL, 0, 10, '{"vectors":{"x":892.84,"y":-3.49,"z":78.76},"length":7,"width":50.4,"options":{"heading":0,"minZ":77.76,"maxZ":82.96,"debugPoly":false}}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":324,"coords":{"x":872.423,"y":8.874,"z":77.764}},{"type":"land","size":2,"distance":1.2,"heading":324,"coords":{"x":875.281,"y":7.131,"z":77.764}},{"type":"land","size":2,"distance":1.2,"heading":324,"coords":{"x":878.138,"y":5.387,"z":77.764}},{"type":"land","size":2,"distance":1.2,"heading":324,"coords":{"x":895.424,"y":-5.032,"z":77.764}},{"type":"land","size":2,"distance":1.2,"heading":324,"coords":{"x":898.708,"y":-7.113,"z":77.764}},{"type":"land","size":2,"distance":1.2,"heading":324,"coords":{"x":901.993,"y":-9.194,"z":77.764}},{"type":"land","size":2,"distance":1.2,"heading":324,"coords":{"x":905.278,"y":-11.276,"z":77.764}},{"type":"land","size":2,"distance":1.2,"heading":324,"coords":{"x":908.563,"y":-13.357,"z":77.764}},{"type":"land","size":2,"distance":1.2,"heading":324,"coords":{"x":911.848,"y":-15.438,"z":77.764}}]'),
	(7, 'garage_impound', 'Impound Garage', 'public', NULL, 0, 10, '{"vectors":{"x":-152.94,"y":-1168.26,"z":23.77},"length":8.4,"width":5.6,"options":{"heading":0,"debugPoly":false}}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":91,"coords":{"x":-153.167,"y":-1170.002,"z":22.761}},{"type":"land","size":2,"distance":1.2,"heading":91,"coords":{"x":-153.178,"y":-1166.529,"z":22.767}}]'),
	(8, 'garage_fudge', 'Garage Fudge Lane', 'public', NULL, 0, 10, '{"vectors":{"x":1160.65,"y":-1645.87,"z":36.92},"length":5.4,"width":5.8,"options":{"heading":300,"minZ":35.92,"maxZ":39.92,"debugPoly":false},"hidden":true}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":210.32487,"coords":{"x":1160.924,"y":-1646.432,"z":35.917}}]'),
	(9, 'garage_t', 'Garage T', 'public', NULL, 0, 10, '{"vectors":{"x":224.93,"y":-786.86,"z":30.9},"length":41.4,"width":11.8,"options":{"heading":160,"minZ":29.9,"maxZ":33.9,"debugPoly":false}}', '["land"]', '[{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":216.009,"y":-804.476,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":216.937,"y":-801.957,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":217.864,"y":-799.438,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":218.792,"y":-796.919,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":219.72,"y":-794.399,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":221.576,"y":-789.361,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":222.504,"y":-786.842,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":223.432,"y":-784.323,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":224.36,"y":-781.803,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":225.288,"y":-779.284,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":226.215,"y":-776.765,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":227.143,"y":-774.246,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":228.071,"y":-771.727,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":228.999,"y":-769.208,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":216.009,"y":-804.476,"z":29.802}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":216.937,"y":-801.957,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":217.864,"y":-799.438,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":218.792,"y":-796.919,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":219.72,"y":-794.399,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":220.648,"y":-791.88,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":221.576,"y":-789.361,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":222.504,"y":-786.842,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":223.432,"y":-784.323,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":224.36,"y":-781.803,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":225.288,"y":-779.284,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":226.215,"y":-776.765,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":227.143,"y":-774.246,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":228.071,"y":-771.727,"z":29.801}},{"type":"land","size":2,"distance":2,"heading":256,"coords":{"x":228.999,"y":-769.208,"z":29.801}}]'),
	(10, 'garage_tuner', 'Garage Tuner', 'public', NULL, 0, 10, '{"vectors":{"x":162.31,"y":-3001.24,"z":5.86},"length":20,"width":6,"options":{"heading":0,"minZ":4.86,"maxZ":8.86,"debugPoly":false}}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":266.0332,"coords":{"x":162.23,"y":-3009.301,"z":4.952}},{"type":"land","size":2,"distance":1.2,"heading":266.0332,"coords":{"x":162.328,"y":-3006.06,"z":4.952}},{"type":"land","size":2,"distance":1.2,"heading":266.0332,"coords":{"x":162.427,"y":-3002.819,"z":4.952}},{"type":"land","size":2,"distance":1.2,"heading":266.0332,"coords":{"x":162.525,"y":-2999.577,"z":4.952}},{"type":"land","size":2,"distance":1.2,"heading":266.0332,"coords":{"x":162.624,"y":-2996.336,"z":4.952}},{"type":"land","size":2,"distance":1.2,"heading":266.0332,"coords":{"x":162.722,"y":-2993.095,"z":4.952}},{"type":"land","size":2,"distance":1.2,"heading":266.0332,"coords":{"x":162.821,"y":-2989.854,"z":4.952}}]'),
	(11, 'garage_impound', 'Impound Garage', 'public', NULL, 0, 10, '{"vectors":{"x":76.94,"y":6400.15,"z":31.23},"length":7.2,"width":17.2,"options":{"heading":0,"debugPoly":false}}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":312,"coords":{"x":72.529,"y":6404.381,"z":30.226}},{"type":"land","size":2,"distance":1.2,"heading":312,"coords":{"x":75.358,"y":6401.692,"z":30.226}},{"type":"land","size":2,"distance":1.2,"heading":312,"coords":{"x":78.188,"y":6399.003,"z":30.226}},{"type":"land","size":2,"distance":1.2,"heading":312,"coords":{"x":81.017,"y":6396.313,"z":30.226}}]'),
	(12, 'garage_barrio', 'Garage Barrio', 'public', NULL, 0, 10, '{"vectors":{"x":319.08,"y":-2033.48,"z":20.51},"length":36.4,"width":5,"options":{"heading":230,"minZ":27.13,"maxZ":31.13,"debugPoly":false},"hidden":true}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":331.769,"y":-2044.558,"z":19.8}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":329.451,"y":-2042.594,"z":19.8}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":327.133,"y":-2040.629,"z":19.8}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":324.814,"y":-2038.665,"z":19.8}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":322.496,"y":-2036.701,"z":19.8}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":320.178,"y":-2034.737,"z":19.8}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":317.859,"y":-2032.773,"z":19.8}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":315.541,"y":-2030.809,"z":19.8}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":313.223,"y":-2028.845,"z":19.8}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":310.904,"y":-2026.881,"z":19.8}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":308.586,"y":-2024.917,"z":19.8}},{"type":"land","size":2,"distance":1.2,"heading":320.05807,"coords":{"x":306.268,"y":-2022.952,"z":19.8}}]'),
	(13, 'garage_sandy', 'Sandy Garage', 'public', NULL, 0, 10, '{"vectors":{"x":1828.17,"y":3661.28,"z":34.02},"length":5.8,"width":18.8,"options":{"heading":30,"minZ":33.02,"maxZ":37.42,"debugPoly":false}}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":30,"coords":{"x":1821.72,"y":3658.059,"z":33.009}},{"type":"land","size":2,"distance":1.2,"heading":30,"coords":{"x":1824.995,"y":3659.948,"z":32.936}},{"type":"land","size":2,"distance":1.2,"heading":30,"coords":{"x":1828.27,"y":3661.837,"z":32.862}},{"type":"land","size":2,"distance":1.2,"heading":30,"coords":{"x":1831.545,"y":3663.726,"z":32.789}},{"type":"land","size":2,"distance":1.2,"heading":30,"coords":{"x":1834.82,"y":3665.615,"z":32.716}}]'),
	(14, 'garage_q', 'Garage Q', 'public', NULL, 0, 10, '{"vectors":{"x":283.44,"y":-332.58,"z":44.92},"length":37,"width":25,"options":{"heading":250,"minZ":43.12,"maxZ":47.12,"debugPoly":false}}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":250,"coords":{"x":277.165,"y":-340.141,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":250,"coords":{"x":278.384,"y":-336.883,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":250,"coords":{"x":279.603,"y":-333.626,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":250,"coords":{"x":280.822,"y":-330.369,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":250,"coords":{"x":282.042,"y":-327.112,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":250,"coords":{"x":283.261,"y":-323.855,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":68,"coords":{"x":289.377,"y":-326.137,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":68,"coords":{"x":288.149,"y":-329.386,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":68,"coords":{"x":286.921,"y":-332.635,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":68,"coords":{"x":285.693,"y":-335.884,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":68,"coords":{"x":284.466,"y":-339.133,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":68,"coords":{"x":283.238,"y":-342.381,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":241,"coords":{"x":294.401,"y":-346.365,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":241,"coords":{"x":295.579,"y":-343.127,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":241,"coords":{"x":296.757,"y":-339.888,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":241,"coords":{"x":297.936,"y":-336.65,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":241,"coords":{"x":299.114,"y":-333.412,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":241,"coords":{"x":300.292,"y":-330.174,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":68,"coords":{"x":271.053,"y":-319.298,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":68,"coords":{"x":269.851,"y":-322.525,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":68,"coords":{"x":268.648,"y":-325.753,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":68,"coords":{"x":267.445,"y":-328.981,"z":43.921}},{"type":"land","size":2,"distance":1.2,"heading":68,"coords":{"x":266.243,"y":-332.209,"z":43.921}}]'),
	(15, 'garage_burgershot', 'Burger Shot Garage', 'business', 'burger_shot', 0, 1, '{"vectors":{"x":-1169.08,"y":-881.4,"z":13.95},"length":6,"width":24.2,"options":{"heading":303,"debugPoly":false,"minZ":12.95,"maxZ":16.95},"hidden":true}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":303,"coords":{"x":-1174.323,"y":-872.937,"z":13.219}},{"type":"land","size":2,"distance":1.2,"heading":303,"coords":{"x":-1172.267,"y":-876.099,"z":13.199}},{"type":"land","size":2,"distance":1.2,"heading":303,"coords":{"x":-1170.212,"y":-879.261,"z":13.18}},{"type":"land","size":2,"distance":1.2,"heading":303,"coords":{"x":-1168.156,"y":-882.423,"z":13.16}}]'),
	(16, 'garage_seoul', 'Garage Little Seoul', 'public', NULL, 0, 10, '{"vectors":{"x":-678.54,"y":-885.18,"z":24.5},"length":3,"width":5.4,"options":{"heading":15,"minZ":23.5,"maxZ":27.5,"debugPoly":false},"hidden":true}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":101.05807,"coords":{"x":-678.332,"y":-885.062,"z":23.487}}]'),
	(17, 'mrpd_police', 'MRPD Police Garage', 'public', NULL, 0, 10, '{"vectors":{"x":442.23,"y":-1025.77,"z":28.73},"length":6.4,"width":18.8,"options":{"heading":5,"minZ":27.13,"maxZ":31.13,"debugPoly":false},"hidden":true}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":183,"coords":{"x":449.554,"y":-1025.648,"z":27.584}},{"type":"land","size":2,"distance":1.2,"heading":183,"coords":{"x":446.05,"y":-1026.037,"z":27.649}},{"type":"land","size":2,"distance":1.2,"heading":183,"coords":{"x":442.547,"y":-1026.426,"z":27.714}},{"type":"land","size":2,"distance":1.2,"heading":183,"coords":{"x":439.043,"y":-1026.815,"z":27.778}},{"type":"land","size":2,"distance":1.2,"heading":183,"coords":{"x":435.539,"y":-1027.204,"z":27.843}}]'),
	(18, 'pd_shared', 'PD Shared Vehicle Garage', 'state', NULL, 1, 10, '{"vectors":{"x":442.1,"y":-991.29,"z":25.69},"length":14.4,"width":14,"options":{"heading":0,"debugPoly":false},"hidden":true}', '["land"]', '[{"type":"land","size":2,"distance":2,"heading":89,"coords":{"x":445.827,"y":-996.969,"z":24.7}},{"type":"land","size":2,"distance":2,"heading":89,"coords":{"x":445.815,"y":-994.269,"z":24.7}},{"type":"land","size":2,"distance":2,"heading":89,"coords":{"x":445.802,"y":-991.568,"z":24.7}},{"type":"land","size":2,"distance":2,"heading":89,"coords":{"x":445.79,"y":-988.868,"z":24.7}},{"type":"land","size":2,"distance":2,"heading":89,"coords":{"x":445.778,"y":-986.168,"z":24.7}},{"type":"land","size":2,"distance":2,"heading":268,"coords":{"x":437.493,"y":-986.143,"z":24.7}},{"type":"land","size":2,"distance":2,"heading":268,"coords":{"x":437.536,"y":-988.844,"z":24.7}},{"type":"land","size":2,"distance":2,"heading":268,"coords":{"x":437.579,"y":-991.545,"z":24.7}},{"type":"land","size":2,"distance":2,"heading":268,"coords":{"x":437.622,"y":-994.246,"z":24.7}},{"type":"land","size":2,"distance":2,"heading":268,"coords":{"x":437.665,"y":-996.947,"z":24.7}}]'),
	(19, 'pd_shared_bike', 'PD Shared Bike Garage', 'state', NULL, 1, 10, '{"vectors":{"x":425.8,"y":-986.65,"z":25.7},"length":24.4,"width":4.8,"options":{"heading":0,"debugPoly":false},"hidden":true}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":89,"coords":{"x":425.603,"y":-997.134,"z":24.7}},{"type":"land","size":2,"distance":1.2,"heading":89,"coords":{"x":425.602,"y":-994.423,"z":24.7}},{"type":"land","size":2,"distance":1.2,"heading":89,"coords":{"x":425.601,"y":-991.713,"z":24.7}},{"type":"land","size":2,"distance":1.2,"heading":89,"coords":{"x":425.601,"y":-989.003,"z":24.7}},{"type":"land","size":2,"distance":1.2,"heading":89,"coords":{"x":425.585,"y":-984.287,"z":24.7}},{"type":"land","size":2,"distance":1.2,"heading":89,"coords":{"x":425.571,"y":-981.576,"z":24.7}},{"type":"land","size":2,"distance":1.2,"heading":89,"coords":{"x":425.557,"y":-978.864,"z":24.7}},{"type":"land","size":2,"distance":1.2,"heading":89,"coords":{"x":425.543,"y":-976.153,"z":24.7}}]'),
	(20, 'garage_red', 'Garage Red', 'public', NULL, 0, 10, '{"vectors":{"x":-333.31,"y":-750.99,"z":33.97},"length":11.8,"width":6.4,"options":{"heading":270,"minZ":32.97,"maxZ":36.97,"debugPoly":false},"hidden":true}', '["land"]', '[{"type":"land","size":2,"distance":1.2,"heading":175.84078,"coords":{"x":-337.497,"y":-750.516,"z":32.969}},{"type":"land","size":2,"distance":1.2,"heading":175.84078,"coords":{"x":-334.64,"y":-750.633,"z":32.969}},{"type":"land","size":2,"distance":1.2,"heading":175.84078,"coords":{"x":-331.784,"y":-750.751,"z":32.969}},{"type":"land","size":2,"distance":1.2,"heading":175.84078,"coords":{"x":-328.927,"y":-750.869,"z":32.969}}]'),
	(21, 'ems_shared_heli', 'EMS Shared Helicopter Garage', 'state', NULL, 1, 10, '{"vectors":{"x":306.73,"y":-1459.39,"z":46.51},"length":11,"width":29.6,"options":{"heading":321,"minZ":45.51,"maxZ":48.91,"debugPoly":false},"hidden":true}', '["air"]', '[{"type":"air","size":4,"distance":1.2,"heading":320.649,"coords":{"x":313.03,"y":-1465.11,"z":46.51}},{"type":"air","size":4,"distance":1.2,"heading":320.83673,"coords":{"x":299.51,"y":-1453.46,"z":46.51}}]'),
	(22, 'pd_shared_heli', 'PD Shared Helicopter Garage', 'state', NULL, 1, 10, '{"vectors":{"x":476.02,"y":-1003.016,"z":45.92},"length":12.8,"width":13.4,"options":{"heading":0,"minZ":44.92,"maxZ":48.72,"debugPoly":false},"hidden":false}', '["air"]', '[{"type":"air","size":4,"distance":1.2,"heading":92,"coords":{"x":476.05,"y":-1003.3,"z":46.28}}]');

-- Dumping structure for table ahvaz_rp._parking_log
CREATE TABLE IF NOT EXISTS `_parking_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vin` varchar(255) NOT NULL,
  `cid` int(255) DEFAULT NULL,
  `action` longtext DEFAULT NULL,
  `engine` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `fuel` int(255) DEFAULT NULL,
  `timestamp` longtext DEFAULT NULL,
  `garage` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp._parking_log: ~0 rows (approximately)
DELETE FROM `_parking_log`;

-- Dumping structure for table ahvaz_rp._race_leaderboard
CREATE TABLE IF NOT EXISTS `_race_leaderboard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `raceId` varchar(255) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `characterId` int(255) DEFAULT NULL,
  `vehicle` varchar(255) DEFAULT NULL,
  `vehicleClass` varchar(1) NOT NULL,
  `bestLapTime` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp._race_leaderboard: ~2 rows (approximately)
DELETE FROM `_race_leaderboard`;
INSERT INTO `_race_leaderboard` (`id`, `raceId`, `alias`, `characterId`, `vehicle`, `vehicleClass`, `bestLapTime`) VALUES
	(23, '44c86ae7-43e1-514e-bac4-bcace32f1dcd', 'Kir', 1, 'Unknown', 'S', 306079),
	(24, '44c86ae7-43e1-514e-bac4-bcace32f1dcd', 'Kir', 1, 'Unknown', 'S', 267571);

-- Dumping structure for table ahvaz_rp._race_track
CREATE TABLE IF NOT EXISTS `_race_track` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` longtext NOT NULL,
  `name` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `length` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `minLaps` int(255) NOT NULL DEFAULT 1,
  `thumbnail` varchar(255) NOT NULL,
  `checkpoints` longtext NOT NULL,
  `category` varchar(255) NOT NULL DEFAULT 'underground',
  PRIMARY KEY (`_id`),
  UNIQUE KEY `id` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp._race_track: ~4 rows (approximately)
DELETE FROM `_race_track`;
INSERT INTO `_race_track` (`_id`, `id`, `name`, `author`, `length`, `type`, `minLaps`, `thumbnail`, `checkpoints`, `category`) VALUES
	(1, '44c86ae7-43e1-514e-bac4-bcace32f1dcd', 'Director\'s Cut', 'varaxium', 9675, 'Lap', 1, 'https', '[{"rad":6.6,"hdg":128.648,"pos":{"x":-1205.424,"z":26.73,"y":-574.434}},{"rad":7.9,"hdg":129.548,"pos":{"x":-1400.063,"z":23.718,"y":-721.545}},{"rad":14.8,"hdg":47.286,"pos":{"x":-1634.027,"z":33.015,"y":-594.859}},{"rad":7.9,"hdg":63.017,"pos":{"x":-1755.571,"z":36.556,"y":-554.272}},{"rad":16.5,"hdg":64.665,"pos":{"x":-2096.269,"z":12.156,"y":-372.635}},{"rad":14.2,"hdg":60.732,"pos":{"x":-2543.359,"z":19.45,"y":-179.473}},{"rad":14.2,"hdg":42.091,"pos":{"x":-2999.263,"z":14.368,"y":131.276}},{"rad":8.7,"hdg":79.911,"pos":{"x":-3057.275,"z":15.61,"y":228.804}},{"rad":7.9,"hdg":23.033,"pos":{"x":-3031.11,"z":7.373,"y":604.721}},{"rad":7.9,"hdg":313.502,"pos":{"x":-3085.946,"z":20.422,"y":745.537}},{"rad":7.9,"hdg":93.707,"pos":{"x":-3175.622,"z":14.041,"y":911.425}},{"rad":9.3,"hdg":336.111,"pos":{"x":-3195.909,"z":9.335,"y":1139.813}},{"rad":9.9,"hdg":261.32,"pos":{"x":-3108.207,"z":19.726,"y":1319.751}},{"rad":9.3,"hdg":275.973,"pos":{"x":-3082.273,"z":20.308,"y":1186.965}},{"rad":8.4,"hdg":207.98,"pos":{"x":-2906.256,"z":49.106,"y":1313.067}},{"rad":8.4,"hdg":236.488,"pos":{"x":-2646.976,"z":119.76,"y":1494.189}},{"rad":8.4,"hdg":260.149,"pos":{"x":-2468.089,"z":191.467,"y":1043.171}},{"rad":8.4,"hdg":307.506,"pos":{"x":-2265.558,"z":197.971,"y":1072.415}},{"rad":7.5,"hdg":256.55,"pos":{"x":-2082.349,"z":184.303,"y":947.542}},{"rad":7.5,"hdg":310.227,"pos":{"x":-1863.878,"z":139.735,"y":788.176}},{"rad":7.5,"hdg":221.366,"pos":{"x":-1760.799,"z":140.952,"y":821.027}},{"rad":11.3,"hdg":194.434,"pos":{"x":-1981.736,"z":101.306,"y":455.526}},{"rad":16.0,"hdg":226.686,"pos":{"x":-1862.04,"z":79.576,"y":145.415}},{"rad":7.8,"hdg":327.099,"pos":{"x":-1813.285,"z":74.618,"y":176.344}},{"rad":10.4,"hdg":253.911,"pos":{"x":-1530.112,"z":61.098,"y":239.955}},{"rad":8.8,"hdg":278.08,"pos":{"x":-1318.924,"z":69.146,"y":394.954}},{"rad":10.7,"hdg":174.862,"pos":{"x":-1078.445,"z":66.594,"y":338.632}},{"rad":14.6,"hdg":209.131,"pos":{"x":-893.294,"z":37.347,"y":-92.304}},{"rad":16.0,"hdg":245.149,"pos":{"x":-782.948,"z":36.408,"y":-321.045}},{"rad":16.0,"hdg":256.645,"pos":{"x":-319.96,"z":29.953,"y":-395.042}},{"rad":16.0,"hdg":163.271,"pos":{"x":-247.445,"z":33.102,"y":-635.873}},{"rad":12.2,"hdg":162.936,"pos":{"x":-241.432,"z":32.977,"y":-724.321}},{"rad":17.3,"hdg":77.768,"pos":{"x":-324.879,"z":31.18,"y":-848.593}},{"rad":15.9,"hdg":359.215,"pos":{"x":-638.298,"z":24.83,"y":-791.023}},{"rad":17.5,"hdg":87.636,"pos":{"x":-744.655,"z":29.858,"y":-658.478}},{"rad":14.2,"hdg":30.262,"pos":{"x":-953.819,"z":37.312,"y":-447.522}},{"rad":9.9,"hdg":119.8,"pos":{"x":-1073.569,"z":36.117,"y":-487.813}}]', 'underground'),
	(6, 'b9607185-d5c5-4b93-9ec2-0e99c61577db', 'DEV TIME TRIALS', 'steam:1100001429eb87b', 779, 'Lap', 1, 'https', '[{"hdg":128.073,"rad":6.8,"pos":{"x":-1205.252,"z":26.736,"y":-574.334}},{"hdg":125.844,"rad":6.8,"pos":{"x":-1242.701,"z":26.787,"y":-606.274}},{"hdg":125.223,"rad":8.0,"pos":{"x":-1407.392,"z":23.351,"y":-724.234}},{"hdg":52.561,"rad":12.9,"pos":{"x":-1522.956,"z":28.33,"y":-683.264}},{"hdg":297.771,"rad":12.9,"pos":{"x":-1393.241,"z":29.771,"y":-571.692}},{"hdg":303.266,"rad":12.2,"pos":{"x":-1316.54,"z":32.578,"y":-518.191}},{"hdg":224.374,"rad":16.3,"pos":{"x":-1278.171,"z":31.47,"y":-530.966}},{"hdg":222.297,"rad":14.4,"pos":{"x":-1232.905,"z":26.783,"y":-584.055}}]', 'pd'),
	(7, 'f97d4d35-57e3-4036-864f-3e4b0b737272', 'Dev Test', 'steam:1100001429eb87b', 777, 'Lap', 1, 'https', '[{"rad":6.9,"pos":{"x":-1204.756,"z":26.747,"y":-573.728},"hdg":130.974},{"rad":6.9,"pos":{"x":-1240.123,"z":26.754,"y":-603.865},"hdg":138.622},{"rad":8.2,"pos":{"x":-1408.012,"z":23.317,"y":-724.826},"hdg":123.232},{"rad":14.4,"pos":{"x":-1519.098,"z":28.076,"y":-686.383},"hdg":54.831},{"rad":11.6,"pos":{"x":-1315.932,"z":32.605,"y":-516.889},"hdg":307.199},{"rad":14.7,"pos":{"x":-1277.736,"z":31.462,"y":-530.762},"hdg":218.719},{"rad":14.7,"pos":{"x":-1233.148,"z":26.783,"y":-584.201},"hdg":225.076}]', 'underground'),
	(8, '7f1e9b4f-007f-422b-aeb8-65ad325e10f9', 'TEST SPRINT', 'steam:1100001429eb87b', 721, 'Sprint', 1, 'https', '[{"rad":5.8,"pos":{"x":-1202.422,"y":-572.278,"z":26.751},"hdg":134.307},{"rad":10.0,"pos":{"x":-1238.072,"y":-568.303,"z":27.729},"hdg":38.737},{"rad":17.0,"pos":{"x":-1287.427,"y":-512.343,"z":32.687},"hdg":41.026},{"rad":17.0,"pos":{"x":-1390.658,"y":-563.683,"z":29.751},"hdg":121.524},{"rad":13.3,"pos":{"x":-1521.11,"y":-683.207,"z":28.255},"hdg":227.635},{"rad":7.2,"pos":{"x":-1384.28,"y":-708.906,"z":24.046},"hdg":303.652},{"rad":7.2,"pos":{"x":-1240.853,"y":-603.226,"z":26.752},"hdg":312.713}]', 'underground');

-- Dumping structure for table ahvaz_rp._racing_alias
CREATE TABLE IF NOT EXISTS `_racing_alias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizenid` longtext DEFAULT NULL,
  `alias` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp._racing_alias: ~1 rows (approximately)
DELETE FROM `_racing_alias`;
INSERT INTO `_racing_alias` (`id`, `citizenid`, `alias`) VALUES
	(1, '1', 'Kir');

-- Dumping structure for table ahvaz_rp._vehicle
CREATE TABLE IF NOT EXISTS `_vehicle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) DEFAULT 0,
  `vin` varchar(255) NOT NULL,
  `model` varchar(50) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `garage` varchar(50) DEFAULT 'garage_alta',
  `plate` varchar(255) NOT NULL DEFAULT '''''',
  `name` varchar(50) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `size` int(255) NOT NULL,
  `degradation` longtext NOT NULL,
  `metadata` longtext DEFAULT NULL,
  `damage` longtext DEFAULT NULL,
  `mods` longtext DEFAULT NULL,
  `appearance` longtext DEFAULT NULL,
  `records` longtext NOT NULL,
  `location` longtext DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `information` longtext DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ahvaz_rp._vehicle: ~30 rows (approximately)
DELETE FROM `_vehicle`;
INSERT INTO `_vehicle` (`id`, `cid`, `vin`, `model`, `state`, `garage`, `plate`, `name`, `type`, `size`, `degradation`, `metadata`, `damage`, `mods`, `appearance`, `records`, `location`, `picture`, `information`) VALUES
	(1, 1, '3PMCO76NP22744357', 'dominator', 'stored', 'garage_a', '63BQW233', 'dominator', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":80,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{"colors":{"primary":111,"secondary":29,"pearlescent":0,"wheels":0,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":255,"b":255},"xenon":8,"dashboard":0,"interior":0},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[],"wheelType":0,"oldLivery":0,"plateIndex":0}', '{"colors":{"primary":111,"secondary":29,"pearlescent":0,"wheels":0,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":255,"b":255},"xenon":8,"dashboard":0,"interior":0},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[],"wheelType":0,"oldLivery":0,"plateIndex":0}', '', '{"y":-801.775634765625,"x":216.027587890625,"h":248.80368041992188,"z":30.08965110778808}', NULL, NULL),
	(3, 15, '3PMEM03NP22788173', 'npolvic', 'stored', 'pd_shared', '83MOB803', 'npolvic', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":44,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{"Spoilers":0,"FrontBumper":0,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":1,"Grille":-1,"Hood":-1,"Fender":0,"RightFender":9,"Roof":-1,"Engine":2,"Brakes":2,"Transmission":2,"Horns":1,"Suspension":2,"Armor":-1,"UNK17":-1,"Turbo":1,"UNK19":-1,"TireSmoke":1,"UNK21":-1,"XenonHeadlights":1,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":0,"Dashboard":0,"Dials":0,"DoorSpeakers":-1,"Seats":0,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":2,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":1,"Aerials":0,"Trim":2,"Tank":3,"Windows":1,"UNK47":-1,"Livery":4}', '{"colors":{"primary":62,"secondary":112,"pearlescent":0,"wheels":0,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":0,"b":255},"xenon":0,"dashboard":0,"interior":0},"tint":2,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[1,2,3,4,5,7],"wheelType":1,"oldLivery":-1,"plateIndex":4}', '', '{"x":450.0080871582031,"y":-976.0565795898438,"z":25.51114845275879,"h":85.54357147216797}', 'https://media.discordapp.net/attachments/925804352260685875/969075027565768764/unknown.png', 'test'),
	(4, 33, '3PMEM03NP22728226', 'npolvic', 'stored', 'pd_shared', '81BQS550', 'npolvic', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":58,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"tint":-1,"oldLivery":-1,"plateIndex":4,"extras":[6],"neon":{"right":false,"back":false,"front":false,"left":false},"wheelType":1,"colors":{"interior":0,"secondary":112,"wheels":0,"neon":{"b":255,"r":255,"g":0},"tyre":{"b":255,"r":255,"g":255},"dashboard":0,"pearlescent":0,"primary":112,"xenon":255}}', '', '{"x":0.0,"y":0.0,"z":0.0,"h":0.0}', NULL, NULL),
	(5, 62, '3PMEM57NP22738077', 'npolmm', 'stored', 'pd_shared_bike', '43PVV445', 'npolmm', 'land', 0, '{"axle":100,"body":100,"brakes":100,"clutch":100,"electronics":100,"engine":100,"injector":100,"radiator":100,"transmission":100,"tyres":100}', '{"afterMarkets":{},"carPolish":null,"fakePlate":null,"fuel":41,"handling":{},"harness":0,"mileage":0,"neonDisabled":false,"nitro":0,"wheelFitment":null}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0}}', '', '{"z":25.16718864440918,"h":250.26217651367188,"x":443.614990234375,"y":-993.1694946289063}', NULL, NULL),
	(6, 36, '3PMEM57NP22722071', 'npolmm', 'stored', 'pd_shared_bike', '40XPC329', 'npolmm', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":46,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0}}', '', NULL, NULL, NULL),
	(7, 42, '3PMEM57NP22766996', 'npolchal', 'stored', 'pd_shared', '44LYU924', 'npolchal', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":43,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0}}', '', NULL, NULL, NULL),
	(8, 29, '3PMEM53NP22780', 'npolstang', 'stored', 'pd_shared', '26UQY372', 'npolstang', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":49,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0}}', '', NULL, NULL, NULL),
	(9, 30, '3PMEM61NP22721402', 'npolchar', 'stored', 'pd_shared', '81LUL573', 'npolchar', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":90,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"wheelType":0,"tint":-1,"plateIndex":4,"neon":{"front":false,"left":false,"right":false,"back":false},"oldLivery":-1,"extras":[1,2,3],"colors":{"dashboard":111,"interior":111,"tyre":{"b":255,"r":255,"g":255},"primary":62,"xenon":255,"secondary":62,"pearlescent":0,"neon":{"b":255,"r":255,"g":0},"wheels":0}}', '', '{"z":25.1817626953125,"y":-976.0411376953125,"x":450.01446533203127,"h":90.60098266601563}', NULL, NULL),
	(10, 48, '3PMEM56NP2276922', 'npolexp', 'stored', 'pd_shared', '49OBG584', 'npolexp', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":56,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0}}', '', NULL, NULL, NULL),
	(11, 6, '3PMEM56NP2278400', 'npolexp', 'stored', 'pd_shared', '60ROT752', 'npolexp', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":50,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0}}', '', NULL, NULL, NULL),
	(12, 51, '3PMEM03NP22722428', 'npolvic', 'stored', 'pd_shared', '65YKV776', 'npolvic', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":74,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"colors":{"tyre":{"b":254,"r":254,"g":254},"primary":0,"pearlescent":0,"dashboard":3,"xenon":0,"secondary":0,"neon":{"b":255,"r":255,"g":0},"interior":3,"wheels":0},"plateIndex":4,"wheelType":1,"extras":[1],"neon":{"right":false,"left":false,"back":false,"front":false},"tint":-1,"oldLivery":-1}', '', '{"x":445.3902282714844,"y":-986.508544921875,"z":25.51121711730957,"h":90.43382263183594}', NULL, NULL),
	(13, 134, '3PMEM03NP2272708', 'npolvic', 'stored', 'pd_shared', '27EHV329', 'npolvic', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":52,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0}}', '', NULL, NULL, NULL),
	(14, 1, '3PMCO57NP22793277', 'brioso', 'stored', 'garage_alta', '35LAD535', 'brioso', 'land', 0, '{"axle":99.99,"body":100,"brakes":99.99,"clutch":99.99,"electronics":100,"engine":99.99,"injector":100,"radiator":99.99,"transmission":100,"tyres":100}', '{"afterMarkets":{},"carPolish":null,"fakePlate":null,"fuel":76,"handling":{},"harness":0,"mileage":0,"neonDisabled":false,"nitro":0,"wheelFitment":null}', '{"body":878.7,"engine":1000,"dirt":5,"windows":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":2,"broken":false},{"index":3,"broken":false},{"index":4,"broken":true},{"index":5,"broken":true},{"index":6,"broken":false},{"index":7,"broken":false}],"doors":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":4,"broken":false},{"index":5,"broken":false}],"wheels":[{"index":0,"health":1000},{"index":1,"health":1000},{"index":2,"health":1000},{"index":3,"health":1000}]}', '{"Spoilers":-1,"FrontBumper":-1,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":-1,"Grille":-1,"Hood":-1,"Fender":-1,"RightFender":-1,"Roof":-1,"Engine":-1,"Brakes":-1,"Transmission":-1,"Horns":-1,"Suspension":-1,"Armor":-1,"UNK17":1,"Turbo":0,"UNK19":1,"TireSmoke":0,"UNK21":1,"XenonHeadlights":0,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":-1,"Dashboard":-1,"Dials":-1,"DoorSpeakers":-1,"Seats":-1,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":-1,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":-1,"Aerials":-1,"ExteriorTrim":-1,"Tank":-1,"Windows":-1,"UNK47":-1,"Livery":-1}', '{"colors":{"primary":50,"secondary":0,"pearlescent":55,"wheels":92,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":0,"b":255},"xenon":255,"dashboard":111,"interior":111},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[],"wheelType":5,"oldLivery":-1,"plateIndex":0}', '', '{"x":-272.8358154296875,"h":326.2071228027344,"z":30.31327438354492,"y":-887.1780395507813}', NULL, NULL),
	(15, 1, '3PMSP34NP22780583', 'italirsx', 'stored', 'pd_shared', '78YDR957', 'italirsx', 'land', 0, '{"axle":100,"body":100,"brakes":100,"clutch":100,"electronics":100,"engine":100,"injector":100,"radiator":100,"transmission":100,"tyres":100}', '{"afterMarkets":{},"carBombData":{},"fuel":96,"handling":{},"harness":0,"mileage":0,"neonDisabled":false,"nitro":0}', '{"body":1000,"engine":1000,"dirt":5,"windows":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":2,"broken":true},{"index":3,"broken":true},{"index":4,"broken":true},{"index":5,"broken":true},{"index":6,"broken":false},{"index":7,"broken":false}],"doors":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":4,"broken":false},{"index":5,"broken":false}],"wheels":[{"index":0,"health":1000},{"index":1,"health":1000},{"index":2,"health":1000},{"index":3,"health":1000}]}', '{"Spoilers":-1,"FrontBumper":-1,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":-1,"Grille":-1,"Hood":-1,"Fender":-1,"RightFender":-1,"Roof":-1,"Engine":-1,"Brakes":-1,"Transmission":-1,"Horns":-1,"Suspension":-1,"Armor":-1,"UNK17":0,"Turbo":0,"UNK19":0,"TireSmoke":0,"UNK21":0,"XenonHeadlights":0,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":-1,"Dashboard":-1,"Dials":-1,"DoorSpeakers":-1,"Seats":-1,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":-1,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":-1,"Aerials":-1,"ExteriorTrim":-1,"Tank":-1,"Windows":-1,"UNK47":-1,"Livery":-1}', '{"colors":{"primary":30,"secondary":43,"pearlescent":35,"wheels":0,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":222,"g":222,"b":255},"xenon":0,"dashboard":156,"interior":39},"tint":2,"neon":{"left":1,"right":1,"front":1,"back":1},"extras":[],"wheelType":7,"oldLivery":0,"plateIndex":1}', '', '{"z":25.05611991882324,"y":-985.8317260742188,"x":445.49969482421877,"h":83.5774917602539}', NULL, NULL),
	(16, 1, '3PMCO81NP22757609', 'gt86', 'stored', 'garage_alta', '67KRK988', 'Toyota GT86', 'land', 0, '{"axle":88.6,"body":68.06,"brakes":64.82,"clutch":82.61,"electronics":70.87,"engine":74.15,"injector":70.38,"radiator":71.95,"transmission":68.36,"tyres":81.7}', '{"afterMarkets":{"driftanglekit":{"mileageLeft":100},"driftcoilovers":{"mileageLeft":100},"driftdiff":{"mileageLeft":100},"drifthandbrake":{"mileageLeft":100},"drifttires":{"mileageLeft":100}},"carPolish":0,"fakePlate":false,"fuel":95,"handling":{},"harness":3,"mileage":33.85168025081226,"neonDisabled":false,"nitro":30,"wheelFitment":null}', '{"body":954.85,"engine":153.89,"dirt":1.48,"windows":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":2,"broken":false},{"index":3,"broken":false},{"index":4,"broken":true},{"index":5,"broken":true},{"index":6,"broken":false},{"index":7,"broken":true}],"doors":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":4,"broken":false},{"index":5,"broken":false}],"wheels":[{"index":0,"health":855.43},{"index":1,"health":890.28},{"index":2,"health":797.56},{"index":3,"health":855.44}]}', '{"Spoilers":0,"FrontBumper":4,"RearBumper":2,"SideSkirt":2,"Exhaust":-1,"Frame":1,"Grille":-1,"Hood":0,"Fender":-1,"RightFender":-1,"Roof":-1,"Engine":4,"Brakes":2,"Transmission":3,"Horns":-1,"Suspension":3,"Armor":-1,"UNK17":1,"Turbo":1,"UNK19":1,"TireSmoke":0,"UNK21":1,"XenonHeadlights":1,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":-1,"Dashboard":-1,"Dials":-1,"DoorSpeakers":-1,"Seats":-1,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":-1,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":-1,"Aerials":-1,"ExteriorTrim":-1,"Tank":-1,"Windows":-1,"UNK47":-1,"Livery":-1}', '{"colors":{"primary":111,"secondary":29,"pearlescent":0,"wheels":0,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":255,"b":255},"xenon":8,"dashboard":0,"interior":0},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[],"wheelType":0,"oldLivery":0,"plateIndex":0}', '', '{"h":320.01849365234377,"x":239.70431518554688,"y":-1207.9112548828126,"z":28.82316207885742}', NULL, NULL),
	(17, 2, '3PMMU04NP22724471', 'chino', 'stored', 'garage_alta', '9K7ZG212', 'chino', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":57,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{"Spoilers":-1,"FrontBumper":-1,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":-1,"Grille":-1,"Hood":-1,"Fender":-1,"RightFender":-1,"Roof":-1,"Engine":-1,"Brakes":-1,"Transmission":-1,"Horns":-1,"Suspension":-1,"Armor":-1,"UNK17":-1,"Turbo":false,"UNK19":-1,"TireSmoke":false,"UNK21":-1,"XenonHeadlights":false,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":-1,"Dashboard":-1,"Dials":-1,"DoorSpeakers":-1,"Seats":-1,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":-1,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":-1,"Aerials":-1,"Trim":-1,"Tank":-1,"Windows":-1,"UNK47":-1,"Livery":-1}', '{"colors":{"primary":62,"secondary":62,"pearlescent":2,"wheels":8,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":0,"b":255},"xenon":255,"dashboard":0,"interior":0},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[1],"wheelType":1,"oldLivery":-1,"plateIndex":0}', '', '{"y":-986.332763671875,"x":-308.1176452636719,"h":160.12625122070313,"z":30.5827465057373}', NULL, NULL),
	(18, 2, '3PMMO25NP22715933', 'avarus', 'stored', 'garage_alta', '31NFU576', 'avarus', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":94,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{"Spoilers":-1,"FrontBumper":-1,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":-1,"Grille":-1,"Hood":-1,"Fender":-1,"RightFender":-1,"Roof":-1,"Engine":-1,"Brakes":-1,"Transmission":-1,"Horns":-1,"Suspension":-1,"Armor":-1,"UNK17":-1,"Turbo":false,"UNK19":-1,"TireSmoke":false,"UNK21":-1,"XenonHeadlights":false,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":-1,"Dashboard":-1,"Dials":-1,"DoorSpeakers":-1,"Seats":-1,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":-1,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":-1,"Aerials":-1,"Trim":-1,"Tank":-1,"Windows":-1,"UNK47":-1,"Livery":-1}', '{"colors":{"primary":145,"secondary":142,"pearlescent":2,"wheels":111,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":0,"b":255},"xenon":255,"dashboard":111,"interior":111},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[],"wheelType":6,"oldLivery":-1,"plateIndex":0}', '', '{"y":-987.044189453125,"x":-308.1044616699219,"h":165.63673400878907,"z":30.5499153137207}', NULL, NULL),
	(19, 1, '3PMOF29NP22738850', 'bifta', 'stored', 'garage_alta', '18YXX867', 'bifta', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":61,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{"Spoilers":-1,"FrontBumper":-1,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":-1,"Grille":-1,"Hood":-1,"Fender":-1,"RightFender":-1,"Roof":-1,"Engine":-1,"Brakes":-1,"Transmission":-1,"Horns":-1,"Suspension":-1,"Armor":-1,"UNK17":-1,"Turbo":false,"UNK19":-1,"TireSmoke":false,"UNK21":-1,"XenonHeadlights":false,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":-1,"Dashboard":-1,"Dials":-1,"DoorSpeakers":-1,"Seats":-1,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":-1,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":-1,"Aerials":-1,"Trim":-1,"Tank":-1,"Windows":-1,"UNK47":-1,"Livery":-1}', '{"colors":{"primary":1,"secondary":0,"pearlescent":7,"wheels":156,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":0,"b":255},"xenon":255,"dashboard":0,"interior":0},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[],"wheelType":4,"oldLivery":-1,"plateIndex":0}', '', NULL, NULL, NULL),
	(20, 1, '3PMSE27NP22726108', 'asea', 'stored', 'garage_alta', '55UJI674', 'asea', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":59,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{"Spoilers":-1,"FrontBumper":-1,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":-1,"Grille":-1,"Hood":-1,"Fender":-1,"RightFender":-1,"Roof":-1,"Engine":-1,"Brakes":-1,"Transmission":-1,"Horns":-1,"Suspension":-1,"Armor":-1,"UNK17":-1,"Turbo":false,"UNK19":-1,"TireSmoke":false,"UNK21":-1,"XenonHeadlights":false,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":-1,"Dashboard":-1,"Dials":-1,"DoorSpeakers":-1,"Seats":-1,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":-1,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":-1,"Aerials":-1,"Trim":-1,"Tank":-1,"Windows":-1,"UNK47":-1,"Livery":-1}', '{"colors":{"primary":4,"secondary":4,"pearlescent":111,"wheels":156,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":0,"b":255},"xenon":255,"dashboard":0,"interior":0},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[11],"wheelType":5,"oldLivery":-1,"plateIndex":0}', '', NULL, NULL, NULL),
	(21, 1, '3PMHE27NP22717599', 'polas350', 'stored', 'garage_alta', '19PLH278', 'z190', 'helicopters', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":50,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{"Spoilers":-1,"FrontBumper":-1,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":-1,"Grille":-1,"Hood":-1,"Fender":-1,"RightFender":-1,"Roof":-1,"Engine":-1,"Brakes":-1,"Transmission":-1,"Horns":-1,"Suspension":-1,"Armor":-1,"UNK17":-1,"Turbo":false,"UNK19":-1,"TireSmoke":false,"UNK21":-1,"XenonHeadlights":false,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":-1,"Dashboard":-1,"Dials":-1,"DoorSpeakers":-1,"Seats":-1,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":-1,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":-1,"Aerials":-1,"Trim":-1,"Tank":-1,"Windows":-1,"UNK47":-1,"Livery":-1}', '{"colors":{"primary":2,"secondary":120,"pearlescent":7,"wheels":156,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":0,"b":255},"xenon":255,"dashboard":0,"interior":129},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[],"wheelType":2,"oldLivery":-1,"plateIndex":0}', '', '{"z":31.44374656677246,"y":-988.0153198242188,"x":-304.7728271484375,"h":159.9977264404297}', NULL, NULL),
	(22, 0, '3PMEM96NP22721488', 'emsnspeedo', 'stored', 'ems_shared', '51MUE518', 'emsnspeedo', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":63,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0}}', '', '{"z":28.63569450378418,"y":-590.68408203125,"x":332.91619873046877,"h":338.070068359375}', NULL, NULL),
	(23, 0, '3PMCO13NP22775884', 'emshoe', 'stored', 'ems_shared', '31WAW439', 'emshoe', 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":71,"mileage":0,"harness":0,"nitro":0,"neonDisabled":false,"handling":{},"afterMarkets":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0}}', '', NULL, NULL, NULL),
	(34, 1, '3PMMU43NP22778482', 'gauntlet', 'stored', 'garage_alta', '9QS1AGB4', NULL, 'land', 0, '{"axle":99.99,"body":99.98,"brakes":99.96,"clutch":99.98,"electronics":99.99,"engine":99.98,"injector":99.98,"radiator":99.99,"transmission":99.96,"tyres":99.98}', '{"afterMarkets":[],"carPolish":0,"fakePlate":false,"fuel":46,"handling":[],"harness":0,"mileage":0.22081333885768978,"neonDisabled":false,"nitro":0,"wheelFitment":[]}', '{"body":1000,"engine":1000,"dirt":5.13,"windows":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":2,"broken":false},{"index":3,"broken":false},{"index":4,"broken":true},{"index":5,"broken":true},{"index":6,"broken":false},{"index":7,"broken":false}],"doors":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":4,"broken":false},{"index":5,"broken":false}],"wheels":[{"index":0,"health":999.23},{"index":1,"health":998.46},{"index":2,"health":998.77},{"index":3,"health":998.45}]}', '{"Spoilers":-1,"FrontBumper":-1,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":-1,"Grille":-1,"Hood":-1,"Fender":-1,"RightFender":-1,"Roof":-1,"Engine":-1,"Brakes":-1,"Transmission":-1,"Horns":-1,"Suspension":-1,"Armor":-1,"UNK17":0,"Turbo":0,"UNK19":0,"TireSmoke":0,"UNK21":0,"XenonHeadlights":0,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":-1,"Dashboard":-1,"Dials":-1,"DoorSpeakers":-1,"Seats":-1,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":-1,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":-1,"Aerials":-1,"ExteriorTrim":-1,"Tank":-1,"Windows":-1,"UNK47":-1,"Livery":-1}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0,"wheels":156,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":0,"b":255},"xenon":255,"dashboard":0,"interior":0},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[],"wheelType":1,"oldLivery":-1,"plateIndex":0}', '', '{"z":30.66754341125488,"y":-980.536376953125,"x":-326.06134033203127,"h":162.1653289794922}', NULL, NULL),
	(40, 1, '3PDEM03NP22782412', 'npolvic', 'stored', 'pd_shared', 'XI9PR6R7', 'Police Vic', 'land', 0, '{"axle":100,"body":100,"brakes":100,"clutch":99.99,"electronics":100,"engine":100,"injector":99.99,"radiator":99.99,"transmission":99.99,"tyres":100}', '{"afterMarkets":[],"carPolish":0,"fakePlate":false,"fuel":49,"handling":[],"harness":0,"mileage":0.0568871370794556,"neonDisabled":false,"nitro":0,"wheelFitment":[]}', '{"body":1000,"engine":1000,"dirt":4.02,"windows":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":2,"broken":false},{"index":3,"broken":false},{"index":4,"broken":true},{"index":5,"broken":true},{"index":6,"broken":false},{"index":7,"broken":false}],"doors":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":2,"broken":false},{"index":3,"broken":false},{"index":4,"broken":false},{"index":5,"broken":false}],"wheels":[{"index":0,"health":1000},{"index":1,"health":1000},{"index":2,"health":1000},{"index":3,"health":1000}]}', '{"Spoilers":1,"FrontBumper":2,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":1,"Grille":-1,"Hood":-1,"Fender":0,"RightFender":9,"Roof":-1,"Engine":2,"Brakes":2,"Transmission":2,"Horns":1,"Suspension":2,"Armor":-1,"UNK17":0,"Turbo":1,"UNK19":0,"TireSmoke":0,"UNK21":0,"XenonHeadlights":1,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":0,"Dashboard":0,"Dials":0,"DoorSpeakers":-1,"Seats":0,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":0,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":1,"Aerials":2,"ExteriorTrim":0,"Tank":1,"Windows":-1,"UNK47":-1,"Livery":4}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0,"wheels":0,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":0,"b":255},"xenon":0,"dashboard":111,"interior":111},"tint":3,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[2,3,4,6,7],"wheelType":1,"oldLivery":-1,"plateIndex":4}', '', '{"z":25.51154899597168,"h":89.00566101074219,"x":445.7882080078125,"y":-986.1698608398438}', NULL, NULL),
	(41, 1, '3PMMU43NP22731515', 'dominator', 'stored', 'garage_alta', 'H0NG1Y24', NULL, 'land', 0, '{"axle":99.96,"body":99.97,"brakes":100,"clutch":100,"electronics":99.95,"engine":99.95,"injector":99.96,"radiator":99.95,"transmission":99.95,"tyres":99.95}', '{"afterMarkets":[],"carPolish":0,"fakePlate":false,"fuel":58,"handling":[],"harness":0,"mileage":0.2674962697679888,"neonDisabled":false,"nitro":0,"wheelFitment":[]}', '{"body":1000,"engine":1000,"dirt":5.13,"windows":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":2,"broken":false},{"index":3,"broken":false},{"index":4,"broken":true},{"index":5,"broken":true},{"index":6,"broken":false},{"index":7,"broken":false}],"doors":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":4,"broken":false},{"index":5,"broken":false}],"wheels":[{"index":0,"health":999.49},{"index":1,"health":998.62},{"index":2,"health":999.27},{"index":3,"health":998.36}]}', '{"Spoilers":-1,"FrontBumper":-1,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":-1,"Grille":-1,"Hood":-1,"Fender":-1,"RightFender":-1,"Roof":-1,"Engine":-1,"Brakes":-1,"Transmission":-1,"Horns":-1,"Suspension":-1,"Armor":-1,"UNK17":0,"Turbo":0,"UNK19":0,"TireSmoke":0,"UNK21":0,"XenonHeadlights":0,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":-1,"Dashboard":-1,"Dials":-1,"DoorSpeakers":-1,"Seats":-1,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":-1,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":-1,"Aerials":-1,"ExteriorTrim":-1,"Tank":-1,"Windows":-1,"UNK47":-1,"Livery":-1}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0,"wheels":156,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":0,"b":255},"xenon":255,"dashboard":0,"interior":0},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[],"wheelType":1,"oldLivery":-1,"plateIndex":0}', '', '{"h":160.55532836914063,"z":30.66741561889648,"y":-984.1224975585938,"x":-315.31646728515627}', NULL, NULL),
	(42, 1, '3PDEM03NP22744926', 'npolvic', 'stored', 'pd_shared', 'M24TOP84', 'Police Vic', 'land', 0, '{"axle":100,"body":100,"brakes":100,"clutch":100,"electronics":100,"engine":100,"injector":100,"radiator":100,"transmission":100,"tyres":100}', '{"afterMarkets":[],"carPolish":0,"fakePlate":false,"fuel":59,"handling":[],"harness":0,"mileage":0,"neonDisabled":false,"nitro":0,"wheelFitment":[]}', '{"body":1000,"engine":1000,"dirt":5.01,"windows":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":2,"broken":false},{"index":3,"broken":false},{"index":4,"broken":true},{"index":5,"broken":true},{"index":6,"broken":false},{"index":7,"broken":false}],"doors":[{"index":0,"broken":false},{"index":1,"broken":false},{"index":2,"broken":false},{"index":3,"broken":false},{"index":4,"broken":false},{"index":5,"broken":false}],"wheels":[{"index":0,"health":1000},{"index":1,"health":1000},{"index":2,"health":1000},{"index":3,"health":1000}]}', '{"Spoilers":-1,"FrontBumper":-1,"RearBumper":-1,"SideSkirt":-1,"Exhaust":-1,"Frame":-1,"Grille":-1,"Hood":-1,"Fender":-1,"RightFender":-1,"Roof":-1,"Engine":-1,"Brakes":-1,"Transmission":-1,"Horns":-1,"Suspension":-1,"Armor":-1,"UNK17":0,"Turbo":0,"UNK19":0,"TireSmoke":0,"UNK21":0,"XenonHeadlights":0,"FrontWheels":-1,"BackWheels":-1,"PlateHolder":-1,"VanityPlates":-1,"InteriorTrim":-1,"Ornaments":-1,"Dashboard":-1,"Dials":-1,"DoorSpeakers":-1,"Seats":-1,"SteeringWheel":-1,"ShiftLeavers":-1,"Plaques":-1,"Speakers":-1,"Trunk":-1,"Hydraulics":-1,"EngineBlock":-1,"AirFilter":-1,"Struts":-1,"ArchCover":-1,"Aerials":-1,"ExteriorTrim":-1,"Tank":-1,"Windows":-1,"UNK47":-1,"Livery":-1}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0,"wheels":0,"tyre":{"r":255,"g":255,"b":255},"neon":{"r":255,"g":0,"b":255},"xenon":255,"dashboard":111,"interior":111},"tint":-1,"neon":{"left":false,"right":false,"front":false,"back":false},"extras":[4],"wheelType":1,"oldLivery":-1,"plateIndex":4}', '', '{"z":25.55729484558105,"h":90.73712158203125,"x":445.18341064453127,"y":-986.220458984375}', NULL, NULL),
	(46, 1, '3PDEM96NP22774718', 'emsnspeedo', 'stored', 'ems_shared', '1V27EY2H', 'Ambulance', 'land', 0, '{"clutch":100,"axle":100,"electronics":100,"brakes":100,"body":100,"engine":100,"tyres":100,"injector":100,"radiator":100,"transmission":100}', '{"afterMarkets":[],"carPolish":0,"fakePlate":false,"fuel":49,"handling":[],"harness":0,"mileage":0,"neonDisabled":false,"nitro":0,"wheelFitment":[]}', '{"windows":[],"wheels":[],"dirt":5,"body":1000,"engine":1000,"doors":[]}', '[]', '{"colors":{"pearlescent":0,"primary":0,"secondary":0}}', '', '{"z":28.57460594177246,"h":334.8075866699219,"x":332.47210693359377,"y":-577.7791137695313}', NULL, NULL),
	(47, 1, '3PMMU43NP22737047', 'gauntlet', 'stored', 'garage_alta', 'I82D20LR', NULL, 'land', 0, '{"clutch":100,"radiator":100,"injector":100,"engine":100,"brakes":100,"transmission":100,"body":100,"axle":100,"electronics":100,"tyres":100}', '{"afterMarkets":[],"carPolish":0,"fakePlate":false,"fuel":96,"handling":[],"harness":0,"mileage":0,"neonDisabled":false,"nitro":0,"wheelFitment":[]}', '{"dirt":5,"wheels":[],"windows":[],"doors":[],"engine":1000,"body":1000}', '[]', '{"colors":{"primary":0,"secondary":0,"pearlescent":0}}', '', '{"z":27.8774242401123,"h":288.6089782714844,"x":452.7750549316406,"y":-1018.0160522460938}', NULL, NULL),
	(48, 1, '3PDEM03NP22716568', 'npolvic', 'stored', 'pd_shared', '7U75ON77', 'Police Vic', 'land', 0, '{"clutch":100,"axle":100,"electronics":100,"brakes":100,"body":100,"engine":100,"tyres":100,"injector":100,"radiator":100,"transmission":100}', '{"afterMarkets":[],"carPolish":0,"fakePlate":false,"fuel":38,"handling":[],"harness":0,"mileage":0,"neonDisabled":false,"nitro":0,"wheelFitment":[]}', '{"windows":[],"wheels":[],"dirt":5,"body":1000,"engine":1000,"doors":[]}', '[]', '{"colors":{"pearlescent":0,"primary":0,"secondary":0}}', '', '{"z":28.43440055847168,"h":329.154052734375,"x":443.3276672363281,"y":-1023.4096069335938}', NULL, NULL),
	(49, 1, '3PMSP28BS24934040', 'sultan', 'stored', 'garage_alta', 'B6Y8280Z', NULL, 'land', 0, '{"axle":100,"brakes":100,"clutch":100,"electronics":100,"injector":100,"radiator":100,"tyres":100,"engine":100,"body":100,"transmission":100}', '{"fuel":52,"mileage":0,"harness":0,"nitro":0,"carPolish":0,"fakePlate":false,"neonDisabled":false,"handling":{},"afterMarkets":{},"wheelFitment":{},"carBombData":{}}', '{"body":1000,"engine":1000,"dirt":5,"doors":[],"wheels":[],"windows":[]}', '{}', '{"colors":{"primary":0,"secondary":0,"pearlescent":0}}', '', NULL, NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
