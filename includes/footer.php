<!-- Footer -->
<footer class="glass" style="
    margin-top: 100px;
    padding: 80px 0 40px;
    border-radius: 40px 40px 0 0;
    border-bottom: none;
    background: rgba(15, 23, 42, 0.95);
">
    <div class="container" style="max-width: var(--container-width); margin: 0 auto; padding: 0 20px;">
        <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 50px;
            margin-bottom: 60px;
        ">
            <div>
                <a href="index.php" class="logo" style="
                    font-size: 1.8rem;
                    font-weight: 800;
                    background: var(--grad-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 20px;
                    display: inline-block;
                ">AWAIS.DEV</a>
                <p style="color: var(--text-muted); line-height: 1.8;">
                    Crafting ultra-premium digital experiences with cutting-edge technology and cinematic animations.
                </p>
                <div class="social-links" style="display: flex; gap: 15px; margin-top: 25px;">
                    <a href="#" class="glass-card" style="padding: 10px 15px; border-radius: 12px;"><i class="fab fa-github"></i></a>
                    <a href="#" class="glass-card" style="padding: 10px 15px; border-radius: 12px;"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="glass-card" style="padding: 10px 15px; border-radius: 12px;"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
            
            <div>
                <h4 style="margin-bottom: 25px; font-size: 1.2rem;">Quick Links</h4>
                <ul style="display: flex; flex-direction: column; gap: 15px;">
                    <li><a href="about.php" style="color: var(--text-muted);">About Me</a></li>
                    <li><a href="projects.php" style="color: var(--text-muted);">Portfolio</a></li>
                    <li><a href="services.php" style="color: var(--text-muted);">Services</a></li>
                    <li><a href="contact.php" style="color: var(--text-muted);">Contact</a></li>
                </ul>
            </div>
            
            <div>
                <h4 style="margin-bottom: 25px; font-size: 1.2rem;">Contact Details</h4>
                <ul style="display: flex; flex-direction: column; gap: 15px; color: var(--text-muted);">
                    <li><i class="fas fa-envelope" style="color: var(--accent-blue); margin-right: 10px;"></i> admin@awaiskhan.me</li>
                    <li><i class="fas fa-phone" style="color: var(--accent-pink); margin-right: 10px;"></i> +1 (123) 456-7890</li>
                    <li><i class="fas fa-location-dot" style="color: var(--accent-purple); margin-right: 10px;"></i> Earth, Digital Galaxy</li>
                </ul>
            </div>
        </div>
        
        <div style="
            padding-top: 40px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        ">
            <p style="color: var(--text-muted); font-size: 0.9rem;">
                &copy; <?php echo date('Y'); ?> Awais Khan. All rights reserved.
            </p>
            <div style="display: flex; gap: 30px;">
                <a href="#" style="color: var(--text-muted); font-size: 0.9rem;">Privacy Policy</a>
                <a href="#" style="color: var(--text-muted); font-size: 0.9rem;">Terms of Service</a>
            </div>
        </div>
    </div>
</footer>

<!-- Global JS -->
<script src="<?php echo SITE_URL; ?>/assets/js/main.js"></script>

</body>
</html>
