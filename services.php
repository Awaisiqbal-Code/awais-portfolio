<?php
$page_title = "Services";
include 'includes/header.php';
include 'includes/nav.php';

$services = [
    [
        'title' => 'Web Development',
        'icon' => 'fas fa-laptop-code',
        'desc' => 'High-performance, secure web applications built with the latest PHP and JS technologies.',
        'color' => 'var(--accent-blue)',
        'price' => 'Starting at $499'
    ],
    [
        'title' => 'Premium Animations',
        'icon' => 'fas fa-wand-magic-sparkles',
        'desc' => 'Cinematic, smooth animations using GSAP and Three.js to make your site stand out from the crowd.',
        'color' => 'var(--accent-purple)',
        'price' => 'Starting at $299'
    ],
    [
        'title' => 'UI/UX Design',
        'icon' => 'fas fa-drafting-compass',
        'desc' => 'Beautiful, user-centric designs following modern glassmorphism and minimalist trends.',
        'color' => 'var(--accent-pink)',
        'price' => 'Starting at $199'
    ],
    [
        'title' => 'E-Commerce Solutions',
        'icon' => 'fas fa-shopping-cart',
        'desc' => 'Custom online stores optimized for conversion and integrated with secure payment gateways.',
        'color' => 'var(--accent-cyan)',
        'price' => 'Starting at $799'
    ]
];
?>

<section style="padding: 150px 0;">
    <div class="container" style="max-width: var(--container-width); margin: 0 auto; padding: 0 20px;">
        <div class="section-header">
            <h5 class="reveal-up" style="color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 3px; font-weight: 600; margin-bottom: 20px;">What I Offer</h5>
            <h2 class="reveal-up" style="font-size: 3.5rem;">Superior Digital <span class="text-gradient">Services</span></h2>
        </div>

        <div class="stagger-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
            <?php foreach ($services as $service): ?>
            <div class="glass-card interactive" style="padding: 50px 40px; text-align: center; height: 100%; display: flex; flex-direction: column; align-items: center;">
                <div style="
                    width: 80px; 
                    height: 80px; 
                    background: <?php echo $service['color']; ?>15; 
                    border-radius: 20px; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center;
                    margin-bottom: 30px;
                    border: 1px solid <?php echo $service['color']; ?>30;
                ">
                    <i class="<?php echo $service['icon']; ?>" style="font-size: 2rem; color: <?php echo $service['color']; ?>;"></i>
                </div>
                
                <h3 style="margin-bottom: 20px;"><?php echo $service['title']; ?></h3>
                <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 30px; flex-grow: 1;">
                    <?php echo $service['desc']; ?>
                </p>
                
                <span style="font-weight: 800; font-size: 1.1rem; color: white; display: block; margin-bottom: 25px;"><?php echo $service['price']; ?></span>
                
                <a href="contact.php" class="btn-outline" style="width: 100%; padding: 12px; font-size: 0.9rem;">Book Service</a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Call to Action -->
<section style="margin-bottom: 50px;">
    <div class="container">
        <div class="glass-card" style="
            background: var(--grad-primary);
            padding: 80px;
            border-radius: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 50px;
            border: none;
        ">
            <div style="max-width: 600px;">
                <h2 style="font-size: 3rem; margin-bottom: 20px;">Ready to start your <br>next project?</h2>
                <p style="font-size: 1.2rem; opacity: 0.9;">Let's collaborate to build something that your customers will love and your competitors will envy.</p>
            </div>
            <a href="contact.php" class="btn-main" style="background: white; color: var(--accent-purple); padding: 20px 50px; font-size: 1.2rem;">Get Started <i class="fas fa-arrow-right"></i></a>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
