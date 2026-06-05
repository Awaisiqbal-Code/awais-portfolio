<?php
$page_title = "Contact";
include 'includes/header.php';
include 'includes/nav.php';
?>

<section style="padding: 150px 0;">
    <div class="container" style="max-width: var(--container-width); margin: 0 auto; padding: 0 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
            <div class="contact-info">
                <h5 class="reveal-up" style="color: var(--accent-blue); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 20px;">Get in Touch</h5>
                <h2 class="reveal-up" style="font-size: 3.5rem; margin-bottom: 30px;">Let's Create Something <span class="text-gradient">Extraordinary</span></h2>
                <p class="reveal-up" style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.8; margin-bottom: 50px;">
                    Have a vision for a premium website? I specialize in bringing high-end concepts to life with cutting-edge technology and smooth animations.
                </p>
                
                <div class="info-items stagger-grid">
                    <div class="glass-card" style="margin-bottom: 20px; display: flex; align-items: center; gap: 20px;">
                        <div style="width: 50px; height: 50px; background: var(--grad-blue); border-radius: 15px; display: flex; justify-content: center; align-items: center;">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div>
                            <span style="display: block; font-size: 0.8rem; color: var(--text-muted);">Email Me</span>
                            <span style="font-weight: 600;">admin@awaiskhan.me</span>
                        </div>
                    </div>
                    <div class="glass-card" style="display: flex; align-items: center; gap: 20px;">
                        <div style="width: 50px; height: 50px; background: var(--grad-pink); border-radius: 15px; display: flex; justify-content: center; align-items: center;">
                            <i class="fab fa-whatsapp"></i>
                        </div>
                        <div>
                            <span style="display: block; font-size: 0.8rem; color: var(--text-muted);">WhatsApp</span>
                            <span style="font-weight: 600;">+1 (123) 456-7890</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="contact-form-container reveal-up">
                <form id="contact-form" class="glass-card" style="padding: 50px;">
                    <div style="margin-bottom: 30px;">
                        <label style="display: block; margin-bottom: 10px; font-size: 0.9rem; color: var(--text-muted);">Full Name</label>
                        <input type="text" class="glass-input" placeholder="Your Name" style="width: 100%;" required>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <label style="display: block; margin-bottom: 10px; font-size: 0.9rem; color: var(--text-muted);">Email Address</label>
                        <input type="email" class="glass-input" placeholder="your@email.com" style="width: 100%;" required>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <label style="display: block; margin-bottom: 10px; font-size: 0.9rem; color: var(--text-muted);">Message</label>
                        <textarea class="glass-input" placeholder="Tell me about your project..." style="width: 100%; height: 150px; resize: none;" required></textarea>
                    </div>
                    
                    <button type="submit" class="btn-main interactive" style="width: 100%; border: none; cursor: pointer; justify-content: center;">
                        Send Message <i class="fas fa-paper-plane" style="margin-left: 10px;"></i>
                    </button>
                    
                    <div id="form-status" style="margin-top: 20px; text-align: center; display: none;"></div>
                </form>
            </div>
        </div>
    </div>
</section>

<script>
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        const status = document.getElementById('form-status');
        
        btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        // Simulate AJAX
        setTimeout(() => {
            btn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
            btn.style.background = 'var(--grad-blue)';
            status.innerHTML = '<p style="color: #4ade80;">Message received! I will get back to you within 24 hours.</p>';
            status.style.display = 'block';
            this.reset();
        }, 2000);
    });
</script>

<?php include 'includes/footer.php'; ?>
