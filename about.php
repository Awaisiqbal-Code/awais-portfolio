<?php
$page_title = "About Me";
include 'includes/header.php';
include 'includes/nav.php';
?>

<section style="padding: 150px 0;">
    <div class="container" style="max-width: var(--container-width); margin: 0 auto; padding: 0 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
            <div class="about-image-container reveal-up">
                <div class="glass-card animate-float" style="padding: 15px; border-radius: 30px; position: relative; z-index: 1;">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" alt="Awais Khan" style="border-radius: 20px; filter: grayscale(20%);">
                    
                    <!-- Floating Detail Card -->
                    <div class="glass-card" style="position: absolute; bottom: -30px; right: -30px; padding: 20px; display: flex; align-items: center; gap: 15px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
                        <div style="width: 45px; height: 45px; background: var(--grad-primary); border-radius: 12px; display: flex; justify-content: center; align-items: center;">
                            <i class="fas fa-award"></i>
                        </div>
                        <div>
                            <span style="display: block; font-weight: 800; font-size: 1.2rem;">3+ Years</span>
                            <span style="font-size: 0.8rem; color: var(--text-muted);">Experience</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="about-content">
                <h5 class="reveal-up" style="color: var(--accent-purple); text-transform: uppercase; letter-spacing: 3px; font-weight: 600; margin-bottom: 20px;">Who I Am</h5>
                <h2 class="reveal-up" style="font-size: 3.5rem; margin-bottom: 30px;">I Design & Build <br><span class="text-gradient">Digital Masterpieces</span></h2>
                <p class="reveal-up" style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px;">
                     I am a Junior Full-Stack Web Developer with a deep passion for creating high-performance, visually stunning web applications. I mix the logic of backend systems with the beauty of cinematic frontend animations.
                </p>
                
                <div class="stagger-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px;">
                    <div class="glass-card" style="padding: 20px;">
                        <i class="fas fa-pencil-ruler" style="color: var(--accent-blue); font-size: 1.5rem; margin-bottom: 15px;"></i>
                        <h4 style="margin-bottom: 10px;">Design Sense</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Crafting pixel-perfect layouts with premium micro-interactions.</p>
                    </div>
                    <div class="glass-card" style="padding: 20px;">
                        <i class="fas fa-server" style="color: var(--accent-pink); font-size: 1.5rem; margin-bottom: 15px;"></i>
                        <h4 style="margin-bottom: 10px;">Backend Rigor</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Building robust PHP systems with secure database logic.</p>
                    </div>
                </div>

                <a href="contact.php" class="btn-main reveal-up">Download Resume <i class="fas fa-download"></i></a>
            </div>
        </div>
    </div>
</section>

<!-- Timeline Section -->
<section style="background: rgba(255,255,255,0.02); padding: 100px 0;">
    <div class="container" style="max-width: 900px;">
        <div class="section-header">
            <h2 class="reveal-up">Educational <span class="text-gradient">Journey</span></h2>
        </div>
        
        <div class="timeline" style="position: relative; padding: 40px 0;">
            <div style="position: absolute; left: 50%; width: 2px; height: 100%; background: rgba(255,255,255,0.1); transform: translateX(-50%);"></div>
            
            <!-- Item 1 -->
            <div class="reveal-up" style="display: flex; justify-content: flex-end; width: 50%; padding-right: 50px; margin-bottom: 50px; position: relative;">
                <div class="glass-card" style="text-align: right; width: 100%;">
                    <span style="color: var(--accent-blue); font-weight: 700;">2024 - Present</span>
                    <h4 style="margin: 10px 0;">Junior Full-Stack Developer</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">Working on premium client projects and mastering GSAP/Three.js environments.</p>
                </div>
                <div style="position: absolute; right: -6px; top: 20px; width: 12px; height: 12px; background: var(--accent-blue); border-radius: 50%; box-shadow: 0 0 15px var(--accent-blue);"></div>
            </div>

            <!-- Item 2 -->
            <div class="reveal-up" style="display: flex; justify-content: flex-start; width: 50%; margin-left: 50%; padding-left: 50px; position: relative;">
                <div class="glass-card" style="width: 100%;">
                    <span style="color: var(--accent-pink); font-weight: 700;">2022 - 2024</span>
                    <h4 style="margin: 10px 0;">Matriculation Studies</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">Exploring advanced computer science concepts and mathematical algorithms.</p>
                </div>
                <div style="position: absolute; left: -6px; top: 20px; width: 12px; height: 12px; background: var(--accent-pink); border-radius: 50%; box-shadow: 0 0 15px var(--accent-pink);"></div>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
