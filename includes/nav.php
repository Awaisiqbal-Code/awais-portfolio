<?php
$current_page = basename($_SERVER['PHP_SELF']);
?>
<!-- Navigation -->
<nav class="glass-nav" style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 20px 0;
    transition: var(--transition-base);
">
    <div class="container" style="
        max-width: var(--container-width);
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
    ">
        <a href="index.php" class="logo" style="
            font-size: 1.5rem;
            font-weight: 800;
            background: var(--grad-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 2px;
        ">AWAIS.DEV</a>
        
        <ul class="nav-links" style="display: flex; gap: 40px;">
            <li><a href="index.php" class="<?php echo $current_page == 'index.php' ? 'active' : ''; ?>">Home</a></li>
            <li><a href="about.php" class="<?php echo $current_page == 'about.php' ? 'active' : ''; ?>">About</a></li>
            <li><a href="projects.php" class="<?php echo $current_page == 'projects.php' ? 'active' : ''; ?>">Projects</a></li>
            <li><a href="services.php" class="<?php echo $current_page == 'services.php' ? 'active' : ''; ?>">Services</a></li>
            <li><a href="contact.php" class="<?php echo $current_page == 'contact.php' ? 'active' : ''; ?>">Contact</a></li>
        </ul>
        
        <div class="nav-right" style="display: flex; align-items: center; gap: 20px;">
            <a href="contact.php" class="btn-primary" style="
                background: var(--grad-primary);
                padding: 10px 25px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 0.9rem;
                box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
            ">Hire Me</a>
            
            <div class="mobile-menu-btn" style="display: none; cursor: pointer; color: white; font-size: 1.5rem;">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </div>
</nav>

<style>
    .nav-links a {
        font-weight: 500;
        font-size: 1rem;
        color: var(--text-muted);
        position: relative;
    }
    
    .nav-links a:hover, .nav-links a.active {
        color: white;
    }
    
    .nav-links a::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0%;
        height: 2px;
        background: var(--grad-primary);
        transition: var(--transition-fast);
    }
    
    .nav-links a:hover::after, .nav-links a.active::after {
        width: 100%;
    }
    
    nav.scrolled {
        padding: 15px 0;
        background: rgba(15, 23, 42, 0.95);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    @media (max-width: 768px) {
        .nav-links { display: none !important; }
        .mobile-menu-btn { display: block !important; }
    }
</style>

<script>
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
</script>
