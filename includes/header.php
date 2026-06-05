<?php require_once __DIR__ . '/../config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . " | " . SITE_NAME : SITE_NAME; ?></title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Awais Khan - Junior Full-Stack Web Developer Portfolio. Ultra-premium web development services with cinematic animations.">
    <meta name="keywords" content="Awais Khan, Web Developer, Full-Stack, Portfolio, GSAP Animations, Premium UI/UX">
    <meta name="author" content="Awais Khan">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo SITE_URL; ?>">
    <meta property="og:title" content="<?php echo SITE_NAME; ?>">
    <meta property="og:description" content="Explore the ultra-premium web development portfolio of Awais Khan.">
    <meta property="og:image" content="<?php echo SITE_URL; ?>/assets/images/og-image.jpg">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Core CSS -->
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/assets/css/variables.css">
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/assets/css/glassmorphism.css">
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/assets/css/animations.css">
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/assets/css/particles.css">
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/assets/css/style.css">
    
    <!-- Animation Libs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <script src="https://unpkg.com/lenis@1.1.9/dist/lenis.min.js"></script>
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="<?php echo SITE_URL; ?>/assets/images/favicon.ico">
</head>
<body class="loading">
<?php include 'preloader.php'; ?>
<?php if (ENABLE_CURSOR_EFFECTS) include 'cursor.php'; ?>
