<?php
/**
 * Core Utility Functions
 */

/**
 * Sanitize input to prevent XSS
 */
function sanitize_input($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate email format
 */
function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Handle Image Uploads
 */
function upload_image($file, $target_dir = "../assets/images/uploads/") {
    $target_file = $target_dir . basename($file["name"]);
    $upload_ok = 1;
    $image_file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if image file is a actual image
    $check = getimagesize($file["tmp_name"]);
    if ($check === false) return ["success" => false, "message" => "File is not an image."];

    // Check file size (5MB limit)
    if ($file["size"] > 5000000) return ["success" => false, "message" => "File is too large."];

    // Allow certain file formats
    if (!in_array($image_file_type, ["jpg", "png", "jpeg", "gif", "webp"])) {
        return ["success" => false, "message" => "Only JPG, JPEG, PNG, GIF & WEBP files are allowed."];
    }

    // Rename file to prevent overwrites
    $new_filename = uniqid() . "." . $image_file_type;
    $target_file = $target_dir . $new_filename;

    if (move_uploaded_file($file["tmp_name"], $target_file)) {
        return ["success" => true, "filename" => $new_filename];
    } else {
        return ["success" => false, "message" => "Error uploading file."];
    }
}

/**
 * Generate CSRF Token
 */
function generate_csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF Token
 */
function verify_csrf_token($token) {
    return !empty($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Check if Admin is Logged In
 */
function is_admin_logged_in() {
    return isset($_SESSION['admin_id']);
}

/**
 * Redirect if not logged in
 */
function require_admin_login() {
    if (!is_admin_logged_in()) {
        header("Location: /admin/login.php");
        exit();
    }
}
?>
