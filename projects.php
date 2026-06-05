<?php
$page_title = "Portfolio";
include 'includes/header.php';
include 'includes/nav.php';

// Mock projects for demonstration (In production, these come from DB)
$projects = [
    [
        'title' => 'Quantum Nexus',
        'desc' => 'Next-gen SaaS platform with real-time analytics and neural processing.',
        'tech' => 'Next.js, Tailwind, Node.js',
        'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        'cat' => 'Web App'
    ],
    [
        'title' => 'Lumina VR',
        'desc' => 'Immersive virtual reality experience for luxury architectural tours.',
        'tech' => 'Three.js, WebGL, React',
        'image' => 'https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?auto=format&fit=crop&q=80&w=800',
        'cat' => '3D Design'
    ],
    [
        'title' => 'Aether Crypto',
        'desc' => 'Highly secure cryptocurrency exchange with millisecond execution.',
        'tech' => 'Python, Go, Vue.js',
        'image' => 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
        'cat' => 'Blockchain'
    ],
    [
        'title' => 'Solaris AI',
        'desc' => 'Neural network that optimizes solar energy distribution globally.',
        'tech' => 'TensorFlow, Python, Flask',
        'image' => 'https://images.unsplash.com/photo-1509391366360-fe5bb5858348?auto=format&fit=crop&q=80&w=800',
        'cat' => 'AI/ML'
    ]
];
?>

<section style="padding: 150px 0;">
    <div class="container" style="max-width: var(--container-width); margin: 0 auto; padding: 0 20px;">
        <div class="section-header" style="text-align: center; margin-bottom: 80px;">
            <h5 class="reveal-up" style="color: var(--accent-pink); text-transform: uppercase; letter-spacing: 3px; font-weight: 600; margin-bottom: 15px;">My Portfolio</h5>
            <h2 class="reveal-up" style="font-size: 3.5rem; margin-bottom: 25px;">Featured <span class="text-gradient">Creations</span></h2>
            <p class="reveal-up" style="color: var(--text-muted); max-width: 600px; margin: 0 auto; font-size: 1.1rem;">
                A selection of my most challenging and innovative projects, combining advanced logic with premium aesthetic.
            </p>
        </div>

        <div class="stagger-grid" style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
        ">
            <?php foreach ($projects as $project): ?>
            <div class="project-card glass-card interactive" style="padding: 0; overflow: hidden; position: relative; cursor: pointer;">
                <div class="card-image" style="height: 250px; overflow: hidden;">
                    <img src="<?php echo $project['image']; ?>" alt="<?php echo $project['title']; ?>" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);">
                </div>
                <div class="card-body" style="padding: 30px;">
                    <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-blue);"><?php echo $project['cat']; ?></span>
                    <h3 style="margin: 10px 0 15px; font-size: 1.5rem;"><?php echo $project['title']; ?></h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;"><?php echo $project['desc']; ?></p>
                    <div style="font-size: 0.8rem; font-weight: 600; color: white;">
                        <i class="fas fa-code" style="margin-right: 8px;"></i> <?php echo $project['tech']; ?>
                    </div>
                </div>
                <!-- Hover Overlay -->
                <div class="card-overlay" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(139, 92, 246, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    transition: var(--transition-base);
                    backdrop-filter: blur(10px);
                ">
                    <a href="#" class="btn-main" style="transform: translateY(20px); transition: 0.5s;">View Details</a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<style>
    .project-card:hover .card-image img {
        transform: scale(1.1) rotate(2deg);
    }
    
    .project-card:hover .card-overlay {
        opacity: 1;
    }
    
    .project-card:hover .card-overlay a {
        transform: translateY(0);
    }
</style>

<?php include 'includes/footer.php'; ?>
