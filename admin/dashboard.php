<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/functions.php';
session_start();

// Ensure admin is logged in
if (!isset($_SESSION['admin_id'])) {
    header("Location: login.php");
    exit();
}

$page_title = "Admin Dashboard";

// Fetch Stats from Database
$conn = get_db_connection();

// Projects Count
$stmt = $conn->query("SELECT COUNT(*) FROM projects");
$total_projects = $stmt->fetchColumn();

// Services Count
$stmt = $conn->query("SELECT COUNT(*) FROM services");
$total_services = $stmt->fetchColumn();

// Messages Count (assuming contact_messages table)
$total_messages = 0;
try {
    $stmt = $conn->query("SELECT COUNT(*) FROM contact_messages WHERE read_status = 0");
    $total_messages = $stmt->fetchColumn();
} catch (Exception $e) {
    // Table might not exist yet
}

// Skills Count
$stmt = $conn->query("SELECT COUNT(*) FROM skills");
$total_skills = $stmt->fetchColumn();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?> | Admin</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/variables.css">
    <link rel="stylesheet" href="../assets/css/glassmorphism.css">
    <link rel="stylesheet" href="../assets/css/animations.css">
    <!-- GSAP Removed -->
    <style>
        body {
            background: var(--bg-darker);
            color: white;
            display: flex;
            min-height: 100vh;
            opacity: 1 !important;
            visibility: visible !important;
        }
        .sidebar {
            width: 280px;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(20px);
            border-right: 1px solid rgba(255, 255, 255, 0.05);
            padding: 30px;
            display: flex;
            flex-direction: column;
        }
        .main-content {
            flex: 1;
            padding: 40px;
            overflow-y: auto;
        }
        .nav-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px 20px;
            color: var(--text-muted);
            border-radius: 12px;
            margin-bottom: 10px;
            transition: var(--transition-base);
            text-decoration: none;
        }
        .nav-item:hover, .nav-item.active {
            background: rgba(255, 255, 255, 0.05);
            color: white;
        }
        .nav-item i {
            width: 20px;
            text-align: center;
        }
        .stat-card {
            padding: 30px;
            text-align: left;
        }
        .stat-count {
            font-size: 2.5rem;
            font-weight: 800;
            margin: 10px 0;
            background: var(--grad-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
</head>
<body style="opacity: 1 !important;">
    
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="logo" style="font-size: 1.5rem; font-weight: 800; color: white; margin-bottom: 50px;">
            AWAIS <span style="color: var(--accent-blue);">ADMIN</span>
        </div>
        
        <nav>
            <a href="dashboard.php" class="nav-item active"><i class="fas fa-chart-line"></i> Dashboard</a>
            <a href="manage-projects.php" class="nav-item"><i class="fas fa-folder"></i> Projects</a>
            <a href="manage-skills.php" class="nav-item"><i class="fas fa-code"></i> Skills</a>
            <a href="manage-services.php" class="nav-item"><i class="fas fa-concierge-bell"></i> Services</a>
            <a href="manage-messages.php" class="nav-item"><i class="fas fa-envelope"></i> Messages</a>
            <a href="manage-settings.php" class="nav-item"><i class="fas fa-cog"></i> Settings</a>
        </nav>
        
        <div style="margin-top: auto;">
            <a href="logout.php" class="nav-item" style="color: #ef4444;"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 50px;">
            <div>
                <h1 style="font-size: 2rem;">Welcome back, <span style="color: var(--accent-blue);"><?php echo htmlspecialchars($_SESSION['admin_user'] ?? 'Admin'); ?></span>!</h1>
                <p style="color: var(--text-muted);">Here's what's happening with your portfolio today.</p>
            </div>
            <div class="glass-card" style="padding: 10px 20px; display: flex; align-items: center; gap: 15px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--grad-primary); display: flex; justify-content: center; align-items: center; font-weight: bold;">
                    <?php echo strtoupper(substr($_SESSION['admin_user'] ?? 'A', 0, 1)); ?>
                </div>
                <span style="font-weight: 600;"><?php echo htmlspecialchars($_SESSION['admin_user'] ?? 'Admin'); ?></span>
            </div>
        </header>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; margin-bottom: 50px;">
            <div class="stat-card glass-card">
                <p style="color: var(--text-muted);">Total Projects</p>
                <div class="stat-count"><?php echo $total_projects; ?></div>
                <p style="font-size: 0.8rem; color: #4ade80;"><i class="fas fa-check-circle"></i> Live on Site</p>
            </div>
            <div class="stat-card glass-card">
                <p style="color: var(--text-muted);">Total Services</p>
                <div class="stat-count"><?php echo $total_services; ?></div>
                <p style="font-size: 0.8rem; color: var(--accent-blue);"><i class="fas fa-concierge-bell"></i> Active Services</p>
            </div>
            <div class="stat-card glass-card">
                <p style="color: var(--text-muted);">Total Skills</p>
                <div class="stat-count"><?php echo $total_skills; ?></div>
                <p style="font-size: 0.8rem; color: var(--accent-purple);"><i class="fas fa-code"></i> Competencies</p>
            </div>
            <div class="stat-card glass-card">
                <p style="color: var(--text-muted);">Unread Messages</p>
                <div class="stat-count"><?php echo $total_messages; ?></div>
                <p style="font-size: 0.8rem; color: var(--accent-pink);"><i class="fas fa-envelope"></i> Inbox</p>
            </div>
        </div>

        <!-- Recent Activity Area -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
            <div class="glass-card" style="padding: 30px;">
                <h3 style="margin-bottom: 30px;">Quick Projects View</h3>
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <?php
                    // Fetch latest 3 projects
                    $stmt = $conn->query("SELECT * FROM projects ORDER BY created_at DESC LIMIT 3");
                    $recent_projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    if (count($recent_projects) > 0):
                        foreach ($recent_projects as $proj):
                    ?>
                    <div style="display: flex; align-items: center; gap: 20px; padding-bottom: 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                        <?php if($proj['image_url']): ?>
                            <img src="../<?php echo $proj['image_url']; ?>" style="width: 60px; height: 45px; object-fit: cover; border-radius: 8px;">
                        <?php else: ?>
                            <div style="width: 60px; height: 45px; background: var(--grad-blue); border-radius: 8px;"></div>
                        <?php endif; ?>
                        
                        <div style="flex: 1;">
                            <h4 style="font-size: 1rem; margin: 0;"><?php echo htmlspecialchars($proj['title']); ?></h4>
                            <p style="font-size: 0.8rem; color: var(--text-muted); margin: 5px 0 0 0;"><?php echo htmlspecialchars($proj['technologies']); ?></p>
                        </div>
                        <a href="manage-projects.php" style="font-size: 0.8rem; color: #4ade80; background: rgba(74, 222, 128, 0.1); padding: 5px 12px; border-radius: 20px; text-decoration: none;">Edit</a>
                    </div>
                    <?php endforeach; else: ?>
                        <p style="color: var(--text-muted);">No projects yet.</p>
                    <?php endif; ?>
                </div>
            </div>
            
            <div class="glass-card" style="padding: 30px;">
                <h3 style="margin-bottom: 30px;">Quick Actions</h3>
                <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
                    <a href="manage-projects.php" class="glass-card interactive" style="border: none; width: 100%; text-align: left; padding: 15px; display: flex; align-items: center; gap: 12px; text-decoration: none; color: white;">
                        <i class="fas fa-plus-circle" style="color: var(--accent-blue);"></i> Add New Project
                    </a>
                    <a href="../index.php" target="_blank" class="glass-card interactive" style="border: none; width: 100%; text-align: left; padding: 15px; display: flex; align-items: center; gap: 12px; text-decoration: none; color: white;">
                        <i class="fas fa-external-link-alt" style="color: var(--accent-purple);"></i> View Live Site
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Animation Script (Optional) -->
    <!-- Animation Script Removed for Stability -->
</body>
</html>
