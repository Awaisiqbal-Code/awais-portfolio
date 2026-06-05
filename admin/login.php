<?php
require_once __DIR__ . '/../config.php';
session_start();

// Redirect if already logged in
if (isset($_SESSION['admin_id'])) {
    header("Location: dashboard.php");
    exit();
}

$error = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Admin Credentials
    $valid_user = 'admin';
    $valid_email = 'demo@videoviraloptimizer.com';
    $valid_pass = 'admin123';

    if (($username === $valid_user || $username === $valid_email) && $password === $valid_pass) {
        $_SESSION['admin_id'] = 1;
        $_SESSION['admin_user'] = $username;
        header("Location: dashboard.php");
        exit();
    } else {
        $error = "Incorrect credentials! Please use 'admin' or your email with 'admin123'.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | Awais Portfolio</title>
    <link rel="stylesheet" href="../assets/css/variables.css">
    <link rel="stylesheet" href="../assets/css/glassmorphism.css">
    <link rel="stylesheet" href="../assets/css/animations.css">
    <style>
        body {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--bg-darker);
            overflow: hidden;
        }
        .login-card {
            width: 100%;
            max-width: 400px;
            padding: 40px;
            animation: scale-up 0.8s var(--bounce);
        }
        @keyframes scale-up {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
    </style>
</head>
<body>
    <div class="login-card glass-card">
        <h2 style="text-align: center; margin-bottom: 30px; font-size: 2rem;">Admin <span style="color: var(--accent-blue);">Login</span></h2>
        
        <?php if ($error): ?>
            <div style="background: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 10px; border-radius: 8px; margin-bottom: 20px; text-align: center; border: 1px solid rgba(239, 68, 68, 0.2);">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>

        <form action="" method="POST">
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-muted);">Username</label>
                <input type="text" name="username" class="glass-input" style="width: 100%;" required placeholder="admin">
            </div>
            <div style="margin-bottom: 30px;">
                <label style="display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-muted);">Password</label>
                <input type="password" name="password" class="glass-input" style="width: 100%;" required placeholder="••••••••">
            </div>
            <button type="submit" class="interactive" style="
                width: 100%;
                padding: 15px;
                border: none;
                border-radius: 12px;
                background: var(--grad-primary);
                color: white;
                font-weight: 700;
                cursor: pointer;
            ">Sign In</button>
        </form>
    </div>
</body>
</html>
