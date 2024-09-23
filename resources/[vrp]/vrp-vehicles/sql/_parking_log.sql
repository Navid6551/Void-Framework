-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2024 at 08:24 AM
-- Server version: 11.1.0-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bsrp`
--

-- --------------------------------------------------------

--
-- Table structure for table `_parking_log`
--

CREATE TABLE `_parking_log` (
  `id` int(11) NOT NULL,
  `vin` varchar(255) NOT NULL,
  `cid` int(255) DEFAULT NULL,
  `action` longtext DEFAULT NULL,
  `engine` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `fuel` int(255) DEFAULT NULL,
  `timestamp` longtext DEFAULT NULL,
  `garage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `_parking_log`
--

INSERT INTO `_parking_log` (`id`, `vin`, `cid`, `action`, `engine`, `body`, `fuel`, `timestamp`, `garage`) VALUES
(1, '3PMCO76NP22744357', 1337, 'stored', '1000', '1000', 80, '1661184513588', 'garage_alta'),
(2, '3PMCO76NP22744357', 1337, 'out', '1000', '1000', 80, '1661184619713', 'garage_alta'),
(3, '3PMCO76NP22744357', 1337, 'stored', '1000', '1000', 80, '1661184655476', 'garage_alta'),
(4, '3PMCO76NP22744357', 1337, 'out', '1000', '1000', 80, '1661185109414', 'garage_alta'),
(5, '3PMCO76NP22744357', 1337, 'stored', '1000', '1000', 80, '1661185112801', 'garage_alta'),
(6, '3PMCO76NP22744357', 1337, 'out', '1000', '1000', 80, '1661540166551', 'garage_alta'),
(7, '3PMCO76NP22744357', 1337, 'out', '1000', '1000', 80, '1661611552409', 'garage_alta'),
(8, '3PMCO76NP22744357', 1337, 'out', '1000', '1000', 71, '1661616025710', 'garage_alta'),
(9, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664760692946', 'garage_alta'),
(10, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664760768288', 'garage_alta'),
(11, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664760825922', 'garage_alta'),
(12, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664760857173', 'garage_alta'),
(13, '3PMCO57NP22793277', 1, 'stored', '1000', '1000', 77, '1664760918438', 'garage_alta'),
(14, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664761261308', 'garage_alta'),
(15, '3PMCO57NP22793277', 1, 'stored', '1000', '1000', 77, '1664761310638', 'garage_alta'),
(16, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664761332563', 'garage_alta'),
(17, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664761373549', 'garage_alta'),
(18, '3PMCO57NP22793277', 1, 'stored', '1000', '1000', 77, '1664761386439', 'garage_alta'),
(19, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664761496294', 'garage_alta'),
(20, '3PMCO57NP22793277', 1, 'stored', '1000', '1000', 77, '1664761498823', 'garage_alta'),
(21, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664761826547', 'garage_alta'),
(22, '3PMCO57NP22793277', 1, 'stored', '1000', '1000', 77, '1664761837332', 'garage_alta'),
(23, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664761840702', 'garage_alta'),
(24, '3PMCO57NP22793277', 1, 'stored', '1000', '1000', 77, '1664761848621', 'garage_alta'),
(25, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664761852093', 'garage_alta'),
(26, '3PMCO57NP22793277', 1, 'stored', '1000', '1000', 77, '1664761853310', 'garage_alta'),
(27, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664761856876', 'garage_alta'),
(28, '3PMCO57NP22793277', 1, 'stored', '1000', '1000', 77, '1664761858747', 'garage_alta'),
(29, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 51, '1664761882868', 'garage_alta'),
(30, '3PMCO81NP22757609', 1, 'stored', '153.89', '954.85', 51, '1664761885800', 'garage_alta'),
(31, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 51, '1664806026660', 'garage_alta'),
(32, '3PMCO81NP22757609', 1, 'stored', '153.89', '954.85', 51, '1664806031998', 'garage_alta'),
(33, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664806036412', 'garage_alta'),
(34, '3PMCO57NP22793277', 1, 'stored', '1000', '1000', 77, '1664806039139', 'garage_alta'),
(35, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 51, '1664806042447', 'garage_alta'),
(36, '3PMCO81NP22757609', 1, 'stored', '153.89', '954.85', 51, '1664806043626', 'garage_alta'),
(37, '3PMCO57NP22793277', 1, 'out', '1000', '1000', 77, '1664806479628', 'garage_alta'),
(38, '3PMCO57NP22793277', 1, 'stored', '1000', '878.7', 77, '1664806485541', 'garage_alta'),
(39, '3PMCO57NP22793277', 1, 'out', '1000', '878.7', 77, '1664806627128', 'garage_alta'),
(40, '3PMCO57NP22793277', 1, 'stored', '1000', '878.7', 77, '1664806923102', 'garage_alta'),
(41, '3PMCO57NP22793277', 1, 'out', '1000', '878.7', 77, '1664822481298', 'garage_alta'),
(42, '3PMCO57NP22793277', 1, 'stored', '1000', '878.7', 77, '1664822482770', 'garage_alta'),
(43, '3PMCO57NP22793277', 1, 'out', '1000', '878.7', 77, '1664822529271', 'garage_alta'),
(44, '3PMCO57NP22793277', 1, 'stored', '1000', '878.7', 77, '1664822530593', 'garage_alta'),
(45, '3PMCO57NP22793277', 1, 'out', '1000', '878.7', 77, '1664831615750', 'garage_alta'),
(46, '3PMCO57NP22793277', 1, 'stored', '1000', '878.7', 77, '1664831768555', 'garage_alta'),
(47, '3PMCO57NP22793277', 1, 'out', '1000', '878.7', 77, '1664831884329', 'garage_alta'),
(48, '3PMCO57NP22793277', 1, 'stored', '1000', '878.7', 77, '1664832164064', 'garage_alta'),
(49, '3PMCO57NP22793277', 1, 'out', '1000', '878.7', 77, '1664833660166', 'garage_alta'),
(50, '3PMCO57NP22793277', 1, 'stored', '1000', '878.7', 77, '1664833676767', 'garage_alta'),
(51, '3PMCO57NP22793277', 1, 'out', '1000', '878.7', 77, '1665362776582', 'garage_alta'),
(52, '3PMCO57NP22793277', 1, 'out', '1000', '878.7', 76, '1665379927059', 'garage_alta'),
(53, '3PMCO57NP22793277', 1, 'stored', '1000', '878.7', 76, '1665379934173', 'garage_alta'),
(54, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 51, '1665383085046', 'garage_alta'),
(55, '3PMCO81NP22757609', 1, 'stored', '153.89', '954.85', 51, '1665383091192', 'garage_alta'),
(56, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 51, '1665383097326', 'garage_alta'),
(57, '3PMCO81NP22757609', 1, 'stored', '153.89', '954.85', 51, '1665383198862', 'garage_alta'),
(58, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 51, '1665383228641', 'garage_alta'),
(59, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1669948307299', 'garage_alta'),
(60, '3PMCO81NP22757609', 1, 'stored', '153.89', '954.85', 49, '1669948448407', 'garage_alta'),
(61, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1669948451980', 'garage_alta'),
(62, '3PMCO81NP22757609', 1, 'stored', '153.89', '954.85', 49, '1669948501521', 'garage_alta'),
(63, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1677828442595', 'garage_alta'),
(64, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1677831828296', 'garage_alta'),
(65, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1677833897698', 'garage_alta'),
(66, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1677885065638', 'garage_alta'),
(67, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1677888094372', 'garage_alta'),
(68, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1677997128663', 'garage_alta'),
(69, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1678274751315', 'garage_alta'),
(70, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1678275875265', 'garage_alta'),
(71, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1678276021816', 'garage_alta'),
(72, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 49, '1678276450174', 'garage_alta'),
(73, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 47, '1678278888097', 'garage_alta'),
(74, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 45, '1678279923176', 'garage_alta'),
(75, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 44, '1678280327581', 'garage_alta'),
(76, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 43, '1678280419703', 'garage_alta'),
(77, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 42, '1678280708935', 'garage_alta'),
(78, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 40, '1683658454567', 'garage_alta'),
(79, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 40, '1683658632454', 'garage_alta'),
(80, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 39, '1683659905877', 'garage_alta'),
(81, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 39, '1683660060115', 'garage_alta'),
(82, '3PMCO81NP22757609', 1, 'stored', '153.89', '954.85', 38, '1683660086331', 'garage_alta'),
(83, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 38, '1683660090627', 'garage_alta'),
(84, '3PMCO81NP22757609', 1, 'stored', '153.89', '954.85', 38, '1683660105533', 'garage_alta'),
(85, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 38, '1683660108560', 'garage_alta'),
(86, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 38, '1683739482156', 'garage_alta'),
(87, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 37, '1683834458821', 'garage_alta'),
(88, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 34, '1683834905349', 'garage_alta'),
(89, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 25, '1683940904084', 'garage_alta'),
(90, '3PMCO81NP22757609', 1, 'stored', '153.89', '954.85', 23, '1683941038328', 'garage_alta'),
(91, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 23, '1683941042917', 'garage_alta'),
(92, '3PMSP34NP22780583', 1, 'out', '1000', '1000', 96, '1683943915850', 'pd_shared'),
(93, '3PMSP34NP22780583', 1, 'stored', '1000', '1000', 96, '1683943918957', 'pd_shared'),
(94, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 97, '1684255205699', 'garage_alta'),
(95, '3PMCO81NP22757609', 1, 'out', '153.89', '954.85', 97, '1706121347785', 'garage_alta');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `_parking_log`
--
ALTER TABLE `_parking_log`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `_parking_log`
--
ALTER TABLE `_parking_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
