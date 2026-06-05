/**
 * Three.js 3D Background Scene (Optional Premium Feature)
 * Creates a floating geometric 3D world.
 */

// Only run if ENABLE_THREE_JS is true in config.php (simulated here)
const initThreeBackground = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('particles-canvas'),
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Objects
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    const spheres = [];
    for (let i = 0; i < 20; i++) {
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = (Math.random() - 0.5) * 10;
        sphere.position.y = (Math.random() - 0.5) * 10;
        sphere.position.z = (Math.random() - 0.5) * 10;
        sphere.rotation.x = Math.random() * Math.PI;
        sphere.rotation.y = Math.random() * Math.PI;

        const scale = Math.random() * 0.5 + 0.1;
        sphere.scale.set(scale, scale, scale);

        scene.add(sphere);
        spheres.push({
            mesh: sphere,
            speed: Math.random() * 0.01
        });
    }

    // Lights
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    camera.position.z = 5;

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        spheres.forEach(s => {
            s.mesh.rotation.x += s.speed;
            s.mesh.rotation.y += s.speed;
            s.mesh.position.y += Math.sin(Date.now() * 0.001 + s.mesh.position.x) * 0.002;
        });

        renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Check if Three.js is loaded
if (typeof THREE !== 'undefined') {
    // initThreeBackground(); // Uncomment to enable
}
