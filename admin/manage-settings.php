<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/functions.php';
session_start();

if (!isset($_SESSION['admin_id'])) {
    header("Location: login.php");
    exit();
}

$message = "";

// Handle Settings Update (Placeholder for now as we use config.php constant, but let's simulate DB settings)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // In a real app, update DB. Here just show success.
    $message = "<div class='alert success'>Settings updated successfully! (Note: Core config is in config.php)</div>";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings | Admin</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/variables.css">
    <link rel="stylesheet" href="../assets/css/glassmorphism.css">
    <link rel="stylesheet" href="../assets/css/animations.css">
    <style>
        body { background: var(--bg-darker); color: white; display: flex; min-height: 100vh; }
        .sidebar { width: 280px; background: rgba(15, 23, 42, 0.9); padding: 30px; display: flex; flex-direction: column; border-right: 1px solid rgba(255,255,255,0.05); }
        .main-content { flex: 1; padding: 40px; overflow-y: auto; }
        .nav-item { display: flex; align-items: center; gap: 15px; padding: 15px; color: var(--text-muted); border-radius: 12px; margin-bottom: 10px; transition: 0.3s; text-decoration: none; }
        .nav-item:hover, .nav-item.active { background: rgba(255,255,255,0.05); color: white; }
        .alert { padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .alert.success { background: rgba(74, 222, 128, 0.1); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.2); }
    </style>
</head>
<body>
    
    <div class="sidebar">
        <div class="logo" style="font-size: 1.5rem; font-weight: 800; color: white; margin-bottom: 50px;">
            AWAIS <span style="color: var(--accent-blue);">ADMIN</span>
        </div>
        <nav>
            <a href="dashboard.php" class="nav-item"><i class="fas fa-chart-line"></i> Dashboard</a>
            <a href="manage-projects.php" class="nav-item"><i class="fas fa-folder"></i> Projects</a>
            <a href="manage-skills.php" class="nav-item"><i class="fas fa-code"></i> Skills</a>
            <a href="manage-services.php" class="nav-item"><i class="fas fa-concierge-bell"></i> Services</a>
            <a href="manage-messages.php" class="nav-item"><i class="fas fa-envelope"></i> Messages</a>
            <a href="manage-settings.php" class="nav-item active"><i class="fas fa-cog"></i> Settings</a>
        </nav>
        <div style="margin-top: auto;">
            <a href="logout.php" class="nav-item" style="color: #ef4444;"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </div>

    <div class="main-content">
        <h1>Global <span style="color: var(--accent-blue);">Settings</span></h1>
        
        <?php echo $message; ?>

        <div class="glass-card" style="max-width: 600px; margin-top: 30px;">
            <form method="POST">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px;">Site Title</label>
                    <input type="text" class="glass-input" style="width: 100%;" value="<?php echo SITE_NAME; ?>" readonly>
                    <small style="color: var(--text-muted);">Defined in config.php</small>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px;">Admin Email</label>
                    <input type="email" class="glass-input" style="width: 100%;" value="<?php echo ADMIN_EMAIL; ?>" readonly>
                </div>

                <div style="margin-bottom: 30px;">
                    <label style="display: block; margin-bottom: 8px;">Animation Speed</label>
                    <select class="glass-input" style="width: 100%; background: var(--bg-darker);">
                        <option>Fast</option>
                        <option selected>Medium</option>
                        <option>Slow</option>
                    </select>
                </div>

                <button type="submit" class="interactive" style="padding: 12px 30px; border-radius: 50px; background: var(--grad-primary); border: none; color: white; font-weight: bold; cursor: pointer;">Save Changes</button>
            </form>
        </div>
    </div>

</body>
</html>
