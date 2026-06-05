<?php
/**
 * Global Configuration File
 * Manage all database credentials, website settings, and animation preferences here.
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'portfolio_awais');

// Site Settings
define('SITE_NAME', 'Awais Khan | Full-Stack Developer');
define('SITE_URL', 'http://localhost/awais-portfolio');
define('ADMIN_EMAIL', 'admin@awaiskhan.me');

// Animation Preferences
define('ENABLE_PARTICLES', true);
define('ENABLE_CURSOR_EFFECTS', true);
define('ENABLE_THREE_JS', false); // Optional premium feature
define('ANIMATION_SPEED', 'medium'); // fast, medium, slow

// Theme Settings (CSS Variables are handled in variables.css, but can be overridden here)
$theme_colors = [
    'primary' => '#007bff', // Blue
    'secondary' => '#6f42c1', // Purple
    'accent' => '#e83e8c', // Pink
    'dark' => '#0f172a',
    'light' => '#f8f9fa'
];

// Error Reporting (Turn off for production)
if (DB_HOST === 'localhost') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

/**
 * Establish Database Connection
 */
function get_db_connection() {
    try {
        $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        if (DB_HOST === 'localhost') {
            die("Connection failed: " . $e->getMessage());
        } else {
            die("Temporary database error. Please try again later.");
        }
    }
}
?>
