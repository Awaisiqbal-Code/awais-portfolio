-- Database Schema for Awais Khan Portfolio

CREATE DATABASE IF NOT EXISTS `portfolio_awais`;
USE `portfolio_awais`;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS `admin_users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS `projects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `technologies` VARCHAR(255),
    `image_url` VARCHAR(255),
    `project_url` VARCHAR(255),
    `github_url` VARCHAR(255),
    `featured` BOOLEAN DEFAULT FALSE,
    `display_order` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE IF NOT EXISTS `skills` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `skill_name` VARCHAR(100) NOT NULL,
    `proficiency_level` INT CHECK (proficiency_level BETWEEN 0 AND 100),
    `category` VARCHAR(50), -- e.g., Frontend, Backend, Design
    `icon_class` VARCHAR(100), -- FontAwesome classes
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS `services` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `service_name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `icon_class` VARCHAR(100),
    `price` VARCHAR(50),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS `blog_posts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT,
    `featured_image` VARCHAR(255),
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `published_at` DATETIME,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS `site_settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `setting_key` VARCHAR(100) NOT NULL UNIQUE,
    `setting_value` TEXT
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20),
    `message` TEXT,
    `read_status` BOOLEAN DEFAULT FALSE,
    `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS `testimonials` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `client_name` VARCHAR(100) NOT NULL,
    `company` VARCHAR(100),
    `testimonial_text` TEXT,
    `rating` INT DEFAULT 5,
    `image_url` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Admin (Password: admin123 - You should change this!)
-- INSERT INTO `admin_users` (`username`, `password_hash`, `email`) 
-- VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@awaiskhan.me');
