document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("canvas-container");
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const count = 2000;

  const positions = new Float32Array(count * 3);
  const originalPositions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    // Create a spread of particles
    positions[i] = (Math.random() - 0.5) * 100;
    originalPositions[i] = positions[i];
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2, // Small, subtle dots
    color: 0x000000, // Black particles
    transparent: true,
    opacity: 0.4,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = container.clientWidth / 2;
  const windowHalfY = container.clientHeight / 2;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  });

  // Resize handler
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Rotate scene slightly based on mouse
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

    // Gentle float wave
    const positions = particlesGeometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Add wave motion
      positions[i3 + 1] =
        originalPositions[i3 + 1] +
        Math.sin(elapsedTime + originalPositions[i3] * 0.5) * 2;

      // Mouse repulsion (optional, keep simple for now to avoid lag)
    }

    particlesGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
});
