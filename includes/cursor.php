<!-- Custom Cursor -->
<div id="custom-cursor" class="custom-cursor"></div>
<div id="cursor-follower" class="cursor-follower"></div>

<style>
    .custom-cursor {
        width: 10px;
        height: 10px;
        background-color: var(--accent-pink);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, background-color 0.3s;
    }
    
    .cursor-follower {
        width: 30px;
        height: 30px;
        border: 2px solid var(--accent-blue);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 99998;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease-out, width 0.3s, height 0.3s, border-color 0.3s;
    }
    
    .cursor-active .custom-cursor {
        width: 60px;
        height: 60px;
        background-color: rgba(236, 72, 153, 0.2);
        mix-blend-mode: screen;
    }
    
    .cursor-active .cursor-follower {
        width: 70px;
        height: 70px;
        border-color: var(--accent-pink);
    }
</style>

<script>
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });
    
    const interactables = document.querySelectorAll('a, button, .interactive');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-active');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-active');
        });
    });
</script>
