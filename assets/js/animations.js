/**
 * Master Animation Controller (GSAP + ScrollTrigger)
 */

gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scrolling (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Global Animation Initializer
function initAnimations() {
    console.log("Initializing GSAP Animations...");

    // Hero Entry Animation
    const heroTl = gsap.timeline();

    heroTl.from('.reveal-up', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
    });

    // Name Sweep Effect
    gsap.from('#hero-name', {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    });

    // Scroll Triggered Reveals
    const reveals = document.querySelectorAll('.scroll-reveal');
    reveals.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Staggered Cards Reveal
    const cardGrids = document.querySelectorAll('.stagger-grid');
    cardGrids.forEach((grid) => {
        const cards = grid.children;
        gsap.from(cards, {
            scrollTrigger: {
                trigger: grid,
                start: "top 80%"
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)"
        });
    });

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar) => {
        const targetWidth = bar.getAttribute('data-width');
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 90%"
            },
            width: targetWidth,
            duration: 1.5,
            ease: "power2.inOut"
        });
    });
}

// Call init on window load
window.addEventListener('load', () => {
    // Only run if preloader didn't trigger it
    if (!document.body.classList.contains('loading')) {
        initAnimations();
    }
});
