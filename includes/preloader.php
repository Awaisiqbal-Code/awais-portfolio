<!-- Preloader -->
<div id="preloader" style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-darker);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    overflow: hidden;
">
    <div class="preloader-content" style="text-align: center;">
        <div class="logo-animation" style="
            width: 80px;
            height: 80px;
            border: 4px solid var(--accent-blue);
            border-top: 4px solid transparent;
            border-radius: 50%;
            margin: 0 auto 20px;
            position: relative;
        ">
            <div style="
                position: absolute;
                top: 5px;
                left: 5px;
                right: 5px;
                bottom: 5px;
                border: 4px solid var(--accent-pink);
                border-bottom: 4px solid transparent;
                border-radius: 50%;
            "></div>
        </div>
        <h2 style="
            color: white;
            font-size: 1.5rem;
            letter-spacing: 5px;
            text-transform: uppercase;
            font-weight: 800;
            background: var(--grad-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        ">AWAIS</h2>
        <div class="progress-bar-container" style="
            width: 200px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            margin-top: 20px;
            border-radius: 1px;
            overflow: hidden;
        ">
            <div id="preloader-progress" style="
                width: 0%;
                height: 100%;
                background: var(--grad-primary);
                transition: width 0.3s ease;
            "></div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const progress = document.getElementById('preloader-progress');
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                gsap.to('#preloader', {
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.5,
                    ease: "power2.inOut",
                    onComplete: () => {
                        document.getElementById('preloader').style.display = 'none';
                        document.body.classList.remove('loading');
                        // Trigger entry animations
                        if (typeof initAnimations === 'function') initAnimations();
                    }
                });
            } else {
                width += Math.random() * 15;
                if (width > 100) width = 100;
                progress.style.width = width + '%';
            }
        }, 100);
    });
</script>
