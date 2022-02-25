-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2022 at 11:34 AM
-- Server version: 8.0.23
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employeemanagement_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminlogin`
--

CREATE TABLE `adminlogin` (
  `admin_id` int NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `date_of_birth` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `adminlogin`
--

INSERT INTO `adminlogin` (`admin_id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `email`, `password`, `nationality`, `phone`, `state`, `country`, `address`) VALUES
(97, 'Jhon', 'Dev', '22-06-1963', '0', 'jhonDev1@gmail.com', '$2a$10$Fao3Cyh7LUtcVWBf2BwX7umHVAOCySnE/COZMUBCHEYz47K3BaJpW', 'Indian', '1234567895', 'Karnataka', 'India', 'Gulbarga');

-- --------------------------------------------------------

--
-- Table structure for table `attendence`
--

CREATE TABLE `attendence` (
  `id` int NOT NULL,
  `emp_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `entry_time` varchar(100) DEFAULT NULL,
  `exit_time` varchar(100) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `attendence`
--

INSERT INTO `attendence` (`id`, `emp_id`, `first_name`, `last_name`, `entry_time`, `exit_time`, `created_at`, `updated_at`) VALUES
(1, 61, 'Sarvesh', 'Sahu', '10Am', '6pm', '2021-05-21 13:58:02.234527', '2021-05-21 13:58:02.234527'),
(2, 67, 'Sarvesh', 'Sahu', '10Am', '6pm', '2021-05-31 05:25:17.610853', '2021-05-31 05:25:17.610853'),
(3, 78, 'Sarvesh', 'Sahu', '10Am', NULL, '2021-06-13 15:34:42.912133', '2021-06-13 15:34:42.912133'),
(4, 78, 'Sarvesh', 'Sahu', '10Am', NULL, '2021-06-13 16:01:36.646467', '2021-06-13 16:01:36.646467');

-- --------------------------------------------------------

--
-- Table structure for table `create_employees`
--

CREATE TABLE `create_employees` (
  `emp_id` int NOT NULL,
  `first_name` varchar(25) DEFAULT NULL,
  `last_name` varchar(25) DEFAULT NULL,
  `date_of_birth` varchar(25) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `maritial_status` varchar(10) DEFAULT NULL,
  `nationality` varchar(25) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `state` varchar(25) DEFAULT NULL,
  `country` varchar(25) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `joining_date` varchar(25) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `job_type` varchar(25) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `bank_name` varchar(50) DEFAULT NULL,
  `account_number` varchar(25) DEFAULT NULL,
  `ifsc_code` varchar(25) DEFAULT NULL,
  `monthly_salary` varchar(50) DEFAULT NULL,
  `annual_salary` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `create_employees`
--

INSERT INTO `create_employees` (`emp_id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `maritial_status`, `nationality`, `email`, `phone`, `state`, `country`, `address`, `joining_date`, `department`, `designation`, `job_type`, `status`, `bank_name`, `account_number`, `ifsc_code`, `monthly_salary`, `annual_salary`) VALUES
(78, 'Sarvesh', 'Sahu ', '04-08-2021', '0', '0', 'Indian', 'ppratiksha8852@gmail.com', '8923451678', 'Karnataka', 'Indian', 'Gulbarga', '1-03-2010', 'Computer-Science', 'HOD', '1', '1', 'AXIS Bank', '1234567890123', 'AXIS1234', '15000', '280000');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `department_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'CSE', 'This is cse department', '2021-05-16 10:55:58.295641', '2021-05-16 10:55:58.295641'),
(5, 'Mechanical Engineering', 'This is Mechanical department', '2021-06-13 14:18:00.873131', '2021-06-13 14:18:00.873131');

-- --------------------------------------------------------

--
-- Table structure for table `employee_login`
--

CREATE TABLE `employee_login` (
  `id` int NOT NULL,
  `emp_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employee_login`
--

INSERT INTO `employee_login` (`id`, `emp_id`, `username`, `password`) VALUES
(64, '78', 'ppratiksha8852@gmail.com', 'KH+ST-');

-- --------------------------------------------------------

--
-- Table structure for table `employee_salary`
--

CREATE TABLE `employee_salary` (
  `id` int NOT NULL,
  `emp_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `monthly_salary` varchar(225) NOT NULL,
  `annual_salary` varchar(225) NOT NULL,
  `bank_name` varchar(200) NOT NULL,
  `account_number` varchar(100) NOT NULL,
  `ifsc_code` varchar(100) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employee_salary`
--

INSERT INTO `employee_salary` (`id`, `emp_id`, `first_name`, `last_name`, `monthly_salary`, `annual_salary`, `bank_name`, `account_number`, `ifsc_code`, `created_at`, `updated_at`) VALUES
(18, 78, 'Sarvesh', 'Sahu ', '15000', '280000', 'AXIS Bank', '1234567890123', 'AXIS1234', '2021-06-13 05:49:20.503416', '2021-06-13 05:49:20.503416');

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `id` int NOT NULL,
  `holiday_event` varchar(100) NOT NULL,
  `day` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leaveapplication`
--

CREATE TABLE `leaveapplication` (
  `id` int NOT NULL,
  `emp_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `leave_type` varchar(100) NOT NULL,
  `leave_start_date` varchar(100) NOT NULL,
  `leave_end_date` varchar(100) NOT NULL,
  `total_days_of_leave` varchar(100) NOT NULL,
  `leave_reason` varchar(100) NOT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `leaveapplication`
--

INSERT INTO `leaveapplication` (`id`, `emp_id`, `first_name`, `last_name`, `leave_type`, `leave_start_date`, `leave_end_date`, `total_days_of_leave`, `leave_reason`, `status`, `reason`, `created_at`, `updated_at`) VALUES
(1, 61, 'Sarvesh', 'Sahu', 'sick leave', '01/05/2021', '03/05/2021', '3', 'not well', 'aproved', NULL, '2021-05-21 13:05:54.686049', '2021-05-21 13:05:54.686049'),
(2, 67, 'Sarvesh', 'Sahu', 'sick leave', '01/05/2021', '03/05/2021', '3', 'not well', 'aproved', 'not required', '2021-05-31 04:57:45.953081', '2021-05-31 04:57:45.953081'),
(3, 66, 'Sarvesh', 'Sahu', 'sick leave', '01/05/2021', '03/05/2021', '3', 'not well', 'aproved', 'not required', '2021-05-31 05:05:25.321853', '2021-05-31 05:05:25.321853'),
(4, 66, 'Sarvesh', 'Sahu', 'sick leave', '01/05/2021', '03/05/2021', '3', 'not well', NULL, NULL, '2021-05-31 05:34:31.941309', '2021-05-31 05:34:31.941309'),
(5, 78, 'Sarvesh', 'Sahu', 'sick leave', '01/05/2021', '03/05/2021', '3', 'not well', NULL, NULL, '2021-06-13 15:32:40.473634', '2021-06-13 15:32:40.473634'),
(6, 78, 'Sarvesh', 'Sahu', 'sick leave', '01/05/2021', '03/05/2021', '3', 'not well', NULL, NULL, '2021-06-13 16:00:11.231471', '2021-06-13 16:00:11.231471');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminlogin`
--
ALTER TABLE `adminlogin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `attendence`
--
ALTER TABLE `attendence`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `create_employees`
--
ALTER TABLE `create_employees`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_login`
--
ALTER TABLE `employee_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_salary`
--
ALTER TABLE `employee_salary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leaveapplication`
--
ALTER TABLE `leaveapplication`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminlogin`
--
ALTER TABLE `adminlogin`
  MODIFY `admin_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `attendence`
--
ALTER TABLE `attendence`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `create_employees`
--
ALTER TABLE `create_employees`
  MODIFY `emp_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employee_login`
--
ALTER TABLE `employee_login`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `employee_salary`
--
ALTER TABLE `employee_salary`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leaveapplication`
--
ALTER TABLE `leaveapplication`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
