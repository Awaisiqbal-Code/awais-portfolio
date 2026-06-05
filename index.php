<?php
$page_title = "Home";
include 'includes/header.php';
include 'includes/nav.php';
?>

<!-- Hero Section -->
<section id="hero" style="
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 80px;
">
    <!-- Animated Background -->
    <div class="hero-bg" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%);
    ">
        <canvas id="particles-canvas"></canvas>
    </div>

    <div class="container" style="max-width: var(--container-width); margin: 0 auto; padding: 0 20px;">
        <div class="hero-content" style="max-width: 800px;">
            <h5 class="reveal-up" style="
                color: var(--accent-blue);
                text-transform: uppercase;
                letter-spacing: 5px;
                margin-bottom: 20px;
                font-weight: 600;
            ">Creative Full-Stack Developer</h5>
            
            <h1 id="hero-name" style="
                font-size: clamp(3rem, 8vw, 6rem);
                line-height: 1;
                margin-bottom: 30px;
                font-weight: 800;
            ">
                <span class="text-gradient">Awais Khan</span>
            </h1>
            
            <p class="reveal-up" style="
                font-size: 1.25rem;
                color: var(--text-muted);
                margin-bottom: 40px;
                max-width: 600px;
                line-height: 1.8;
            ">
                I build high-performance, ultra-premium web applications that combine stunning cinematic animations with robust backend logic.
            </p>
            
            <div class="hero-btns reveal-up" style="display: flex; gap: 20px; align-items: center;">
                <a href="projects.php" class="btn-main interactive" style="
                    background: var(--grad-primary);
                    padding: 18px 40px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 15px 30px rgba(139, 92, 246, 0.4);
                    transition: var(--transition-base);
                ">
                    View My Work <i class="fas fa-arrow-right"></i>
                </a>
                
                <a href="#contact" class="btn-outline interactive" style="
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    padding: 18px 40px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    transition: var(--transition-base);
                    backdrop-filter: blur(10px);
                ">
                    Start a Project
                </a>
            </div>
        </div>
    </div>
    
    <!-- Scroll Down Indicator -->
    <div class="scroll-indicator" style="
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        opacity: 0.6;
    ">
        <span style="font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase;">Scroll</span>
        <div class="mouse-icon" style="
            width: 24px;
            height: 40px;
            border: 2px solid white;
            border-radius: 20px;
            position: relative;
        ">
            <div class="mouse-wheel" style="
                width: 4px;
                height: 8px;
                background: white;
                position: absolute;
                top: 8px;
                left: 50%;
                transform: translateX(-50%);
                border-radius: 2px;
                animation: scroll-ping 2s infinite;
            "></div>
        </div>
    </div>
</section>

<style>
    .text-gradient {
        background: var(--grad-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
    }
    
    .btn-main:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 20px 40px rgba(139, 92, 246, 0.6);
    }
    
    .btn-outline:hover {
        border-color: var(--accent-pink);
        background: rgba(236, 72, 153, 0.05);
        color: white;
        transform: translateY(-5px);
    }
    
    @keyframes scroll-ping {
        0% { transform: translate(-50%, 0); opacity: 1; }
        100% { transform: translate(-50%, 15px); opacity: 0; }
    }
</style>

<script src="<?php echo SITE_URL; ?>/assets/js/particles.js"></script>
<script src="<?php echo SITE_URL; ?>/assets/js/animations.js"></script>

<?php include 'includes/footer.php'; ?>
