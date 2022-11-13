-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2022 at 10:35 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistem_survey`
--
CREATE DATABASE IF NOT EXISTS `sistem_survey` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sistem_survey`;

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id` int(255) NOT NULL,
  `wali_kelas_id` int(255) DEFAULT NULL,
  `kelas` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id`, `wali_kelas_id`, `kelas`) VALUES
(1, 2, 'XII RPL 1'),
(2, 3, 'XII MM 2'),
(3, 4, 'XI OTKP 3');

-- --------------------------------------------------------

--
-- Table structure for table `survey_kelas`
--

CREATE TABLE `survey_kelas` (
  `id` int(255) NOT NULL,
  `kelas_id` int(255) NOT NULL,
  `jadwal` tinyint(1) NOT NULL,
  `struktur_kelas` tinyint(1) NOT NULL,
  `inventaris` tinyint(1) NOT NULL,
  `buku_daftar_kelas` tinyint(1) NOT NULL,
  `jurnal_guru` tinyint(1) NOT NULL,
  `buku_penerimaan_raport` tinyint(1) NOT NULL,
  `leger` tinyint(1) NOT NULL,
  `denah_kelas` tinyint(1) NOT NULL,
  `tata_tertib_sekolah` tinyint(1) NOT NULL,
  `buku_laporan` tinyint(1) NOT NULL,
  `program_kerja` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `survey_kelas`
--

INSERT INTO `survey_kelas` (`id`, `kelas_id`, `jadwal`, `struktur_kelas`, `inventaris`, `buku_daftar_kelas`, `jurnal_guru`, `buku_penerimaan_raport`, `leger`, `denah_kelas`, `tata_tertib_sekolah`, `buku_laporan`, `program_kerja`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1),
(2, 2, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1),
(3, 3, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `sebagai` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `nama_lengkap`, `sebagai`) VALUES
(1, 'admin', 'U2FsdGVkX1/7sB4NKjqVCUuBCkkbjBKb1ZNXcNT+2LA=', 'Pesulap Merah', '1'),
(2, 'wali_rpl', 'U2FsdGVkX18Z6Bm6Ugs0U54Bhb7ZA3IFscv63swrC08=', 'Mamang', '4'),
(3, 'wali_mm', 'U2FsdGVkX18Z6Bm6Ugs0U54Bhb7ZA3IFscv63swrC08=', 'Samsudin', '4'),
(4, 'wali_otkp', 'U2FsdGVkX18Z6Bm6Ugs0U54Bhb7ZA3IFscv63swrC08=', 'Surya', '4'),
(5, 'wakasek', 'U2FsdGVkX1+iJrotKcCJhRGDcYrZJmyoJriWE2VaBO8=', 'Sugeng', '3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wali_kelas_id` (`wali_kelas_id`);

--
-- Indexes for table `survey_kelas`
--
ALTER TABLE `survey_kelas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kelas_id` (`kelas_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `survey_kelas`
--
ALTER TABLE `survey_kelas`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`wali_kelas_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `survey_kelas`
--
ALTER TABLE `survey_kelas`
  ADD CONSTRAINT `survey_kelas_ibfk_1` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
