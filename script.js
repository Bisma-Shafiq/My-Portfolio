document.addEventListener("DOMContentLoaded", () => {
  /* === Global 3D Background Scene (Particle System) === */
  const bgCanvas = document.getElementById("bg-canvas");
  const bgScene = new THREE.Scene();
  const bgCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  bgCamera.position.z = 100;

  const bgRenderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true });
  bgRenderer.setSize(window.innerWidth, window.innerHeight);
  bgRenderer.setPixelRatio(window.devicePixelRatio);

  // Create a particle system for the background
  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 1000;
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xffffff, // Using accent1
    size: 2,
    transparent: true,
    opacity: 0.7,
  });
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  bgScene.add(particles);

  function animateBg() {
    requestAnimationFrame(animateBg);
    particles.rotation.y += 0.0005;
    bgRenderer.render(bgScene, bgCamera);
  }
  animateBg();

  window.addEventListener("resize", () => {
    bgCamera.aspect = window.innerWidth / window.innerHeight;
    bgCamera.updateProjectionMatrix();
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
  });
});
