<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/functions.php';
session_start();

if (!isset($_SESSION['admin_id'])) {
    header("Location: login.php");
    exit();
}

$conn = get_db_connection();
$message = "";

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'add') {
        $name = sanitize_input($_POST['service_name']);
        $desc = sanitize_input($_POST['description']);
        $icon = sanitize_input($_POST['icon_class']);
        $price = sanitize_input($_POST['price']);

        $stmt = $conn->prepare("INSERT INTO services (service_name, description, icon_class, price) VALUES (?, ?, ?, ?)");
        if ($stmt->execute([$name, $desc, $icon, $price])) {
            $message = "<div class='alert success'>Service added successfully!</div>";
        } else {
            $message = "<div class='alert error'>Database error.</div>";
        }

    } elseif ($_POST['action'] === 'delete') {
        $id = intval($_POST['id']);
        $stmt = $conn->prepare("DELETE FROM services WHERE id = ?");
        $stmt->execute([$id]);
        $message = "<div class='alert success'>Service deleted!</div>";
    }
}

// Fetch Services
$stmt = $conn->query("SELECT * FROM services ORDER BY created_at DESC");
$services = $stmt->fetchAll(PDO::FETCH_ASSOC);

$page_title = "Manage Services";
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
    <style>
        body { background: var(--bg-darker); color: white; display: flex; min-height: 100vh; }
        .sidebar { width: 280px; background: rgba(15, 23, 42, 0.9); padding: 30px; display: flex; flex-direction: column; border-right: 1px solid rgba(255,255,255,0.05); }
        .main-content { flex: 1; padding: 40px; overflow-y: auto; }
        .nav-item { display: flex; align-items: center; gap: 15px; padding: 15px; color: var(--text-muted); border-radius: 12px; margin-bottom: 10px; transition: 0.3s; text-decoration: none; }
        .nav-item:hover, .nav-item.active { background: rgba(255,255,255,0.05); color: white; }
        .alert { padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .alert.success { background: rgba(74, 222, 128, 0.1); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.2); }
        .alert.error { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 15px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); }
        th { color: var(--text-muted); font-weight: 600; }
        .action-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); transition: 0.2s; }
        .action-btn:hover { color: white; }
        .delete-btn:hover { color: #ef4444; }
        .service-icon { font-size: 1.2rem; color: var(--accent-purple); }
    </style>
</head>
<body>
    
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="logo" style="font-size: 1.5rem; font-weight: 800; color: white; margin-bottom: 50px;">
            AWAIS <span style="color: var(--accent-blue);">ADMIN</span>
        </div>
        <nav>
            <a href="dashboard.php" class="nav-item"><i class="fas fa-chart-line"></i> Dashboard</a>
            <a href="manage-projects.php" class="nav-item"><i class="fas fa-folder"></i> Projects</a>
            <a href="manage-skills.php" class="nav-item"><i class="fas fa-code"></i> Skills</a>
            <a href="manage-services.php" class="nav-item active"><i class="fas fa-concierge-bell"></i> Services</a>
            <a href="manage-messages.php" class="nav-item"><i class="fas fa-envelope"></i> Messages</a>
            <a href="manage-settings.php" class="nav-item"><i class="fas fa-cog"></i> Settings</a>
        </nav>
        <div style="margin-top: auto;">
            <a href="logout.php" class="nav-item" style="color: #ef4444;"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
            <h1 style="font-size: 2rem;">Manage <span style="color: var(--accent-purple);">Services</span></h1>
            <button onclick="document.getElementById('add-modal').style.display='flex'" class="btn-main interactive" style="background: var(--grad-primary); color: white; border: none; padding: 12px 25px; border-radius: 50px; cursor: pointer; font-weight: 600;">
                <i class="fas fa-plus"></i> Add New
            </button>
        </header>

        <?php echo $message; ?>

        <div class="glass-card">
            <table>
                <thead>
                    <tr>
                        <th width="80">Icon</th>
                        <th>Service Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (count($services) > 0): ?>
                        <?php foreach ($services as $service): ?>
                        <tr>
                            <td><i class="<?php echo $service['icon_class']; ?> service-icon"></i></td>
                            <td style="font-weight: 600;"><?php echo htmlspecialchars($service['service_name']); ?></td>
                            <td style="color: #4ade80;"><?php echo htmlspecialchars($service['price']); ?></td>
                            <td style="color: var(--text-muted); max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><?php echo htmlspecialchars($service['description']); ?></td>
                            <td>
                                <form method="POST" style="display: inline;" onsubmit="return confirm('Delete this service?');">
                                    <input type="hidden" name="action" value="delete">
                                    <input type="hidden" name="id" value="<?php echo $service['id']; ?>">
                                    <button type="submit" class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
                                </form>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No services found. Add one!</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Add Service Modal -->
    <div id="add-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); justify-content: center; align-items: center; z-index: 1000;">
        <div class="glass-card" style="width: 500px; padding: 40px; position: relative;">
            <button onclick="document.getElementById('add-modal').style.display='none'" style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;"><i class="fas fa-times"></i></button>
            <h2 style="margin-bottom: 25px;">Add New Service</h2>
            
            <form method="POST">
                <input type="hidden" name="action" value="add">
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-muted);">Service Name</label>
                    <input type="text" name="service_name" class="glass-input" style="width: 100%;" required>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-muted);">Icon Class</label>
                    <input type="text" name="icon_class" class="glass-input" style="width: 100%;" placeholder="e.g. fas fa-code">
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-muted);">Price Range</label>
                    <input type="text" name="price" class="glass-input" style="width: 100%;" placeholder="Starting at $100">
                </div>
                
                <div style="margin-bottom: 30px;">
                    <label style="display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-muted);">Description</label>
                    <textarea name="description" class="glass-input" style="width: 100%; height: 80px; resize: none;"></textarea>
                </div>

                <button type="submit" class="interactive" style="width: 100%; padding: 15px; border: none; border-radius: 12px; background: var(--grad-primary); color: white; font-weight: 700; cursor: pointer;">Add Service</button>
            </form>
        </div>
    </div>

</body>
</html>
