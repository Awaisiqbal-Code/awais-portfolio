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

// Handle Delete/Read Actions
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'delete') {
        $id = intval($_POST['id']);
        $stmt = $conn->prepare("DELETE FROM contact_messages WHERE id = ?");
        $stmt->execute([$id]);
        $message = "<div class='alert success'>Message deleted!</div>";
    } elseif ($_POST['action'] === 'mark_read') {
        $id = intval($_POST['id']);
        $stmt = $conn->prepare("UPDATE contact_messages SET read_status = 1 WHERE id = ?");
        $stmt->execute([$id]);
        header("Location: manage-messages.php");
        exit();
    }
}

// Fetch Messages
$stmt = $conn->query("SELECT * FROM contact_messages ORDER BY submitted_at DESC");
$messages = [];
try {
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    // Table might not exist yet
}

$page_title = "Manage Messages";
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
        .message-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-bottom: 15px; transition: 0.2s; }
        .message-card.unread { border-left: 3px solid var(--accent-blue); background: rgba(59, 130, 246, 0.05); }
        .message-card:hover { transform: translateY(-2px); background: rgba(255,255,255,0.05); }
        .msg-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .msg-sender { font-weight: 700; color: white; }
        .msg-meta { font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 15px; }
        .msg-body { color: var(--text-base); line-height: 1.6; font-size: 0.95rem; margin-bottom: 15px; }
        .msg-actions { display: flex; gap: 10px; justify-content: flex-end; }
        .btn-sm { padding: 5px 12px; border-radius: 6px; border: none; font-size: 0.8rem; cursor: pointer; }
        .btn-delete { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .btn-read { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
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
            <a href="manage-services.php" class="nav-item"><i class="fas fa-concierge-bell"></i> Services</a>
            <a href="manage-messages.php" class="nav-item active"><i class="fas fa-envelope"></i> Messages</a>
            <a href="manage-settings.php" class="nav-item"><i class="fas fa-cog"></i> Settings</a>
        </nav>
        <div style="margin-top: auto;">
            <a href="logout.php" class="nav-item" style="color: #ef4444;"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <header style="margin-bottom: 40px;">
            <h1 style="font-size: 2rem;">Inbox <span style="color: var(--accent-pink);">Messages</span></h1>
        </header>

        <?php echo $message; ?>

        <div class="glass-card" style="border: none; background: none; box-shadow: none;">
            <?php if (count($messages) > 0): ?>
                <?php foreach ($messages as $msg): ?>
                <div class="message-card <?php echo ($msg['read_status'] == 0) ? 'unread' : ''; ?>">
                    <div class="msg-header">
                        <div class="msg-sender">
                            <?php echo htmlspecialchars($msg['name']); ?>
                            <?php if($msg['read_status'] == 0): ?>
                                <span style="font-size: 0.7rem; background: var(--accent-blue); color: white; padding: 2px 6px; border-radius: 4px; margin-left: 8px;">NEW</span>
                            <?php endif; ?>
                        </div>
                        <div class="msg-meta">
                            <span><i class="far fa-clock"></i> <?php echo date('M d, Y h:i A', strtotime($msg['submitted_at'])); ?></span>
                        </div>
                    </div>
                    
                    <div class="msg-meta" style="margin-bottom: 12px;">
                        <span><i class="far fa-envelope"></i> <?php echo htmlspecialchars($msg['email']); ?></span>
                        <!-- <span><i class="fas fa-phone"></i> <?php // echo htmlspecialchars($msg['phone']); ?></span> -->
                    </div>

                    <div class="msg-body">
                        <?php echo nl2br(htmlspecialchars($msg['message'])); ?>
                    </div>

                    <div class="msg-actions">
                        <a href="mailto:<?php echo htmlspecialchars($msg['email']); ?>" class="btn-sm" style="background: rgba(74, 222, 128, 0.1); color: #4ade80; text-decoration: none;">Reply</a>
                        
                        <?php if($msg['read_status'] == 0): ?>
                        <form method="POST" style="display: inline;">
                            <input type="hidden" name="action" value="mark_read">
                            <input type="hidden" name="id" value="<?php echo $msg['id']; ?>">
                            <button type="submit" class="btn-sm btn-read">Mark as Read</button>
                        </form>
                        <?php endif; ?>
                        
                        <form method="POST" style="display: inline;" onsubmit="return confirm('Delete this message?');">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?php echo $msg['id']; ?>">
                            <button type="submit" class="btn-sm btn-delete">Delete</button>
                        </form>
                    </div>
                </div>
                <?php endforeach; ?>
            <?php else: ?>
                <div style="text-align: center; padding: 50px; color: var(--text-muted);">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                    <p>No messages yet.</p>
                </div>
            <?php endif; ?>
        </div>
    </div>

</body>
</html>
