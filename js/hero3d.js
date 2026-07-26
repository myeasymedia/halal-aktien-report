/* ============================================================
   hero3d.js
   Rotierender Wireframe-Sternkörper (angelehnt an islamische
   Geometrie-Muster / Girih-Sterne) als Signatur-Element des Heros.
   Läuft nur, wenn Three.js geladen ist und der Nutzer keine
   reduzierte Bewegung eingestellt hat.
   ============================================================ */

(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  // --- Baue einen 8-zackigen Sternkörper (zwei verschränkte Tetraeder-artige
  //     Spitzen-Ringe), inspiriert von islamischer Girih-Geometrie ---
  const group = new THREE.Group();

  function buildStarLayer(radius, points, depth, color, opacity) {
    const shapePoints = [];
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const r = i % 2 === 0 ? radius : radius * 0.42;
      shapePoints.push(new THREE.Vector2(Math.cos(angle) * r, Math.sin(angle) * r));
    }
    const shape = new THREE.Shape(shapePoints);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.03, bevelSegments: 2,
    });
    const wireGeo = new THREE.EdgesGeometry(geo, 1);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    return new THREE.LineSegments(wireGeo, mat);
  }

  const outer = buildStarLayer(2.6, 8, 0.35, 0x2dd4a7, 0.85);
  const inner = buildStarLayer(1.7, 8, 0.35, 0xc9a15a, 0.55);
  inner.rotation.z = Math.PI / 8;
  inner.position.z = 0.6;

  group.add(outer, inner);

  // feine Partikel im Hintergrund für Tiefe
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 140;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0xf3efe6, size: 0.02, transparent: true, opacity: 0.35 });
  const particles = new THREE.Points(particleGeo, particleMat);

  scene.add(group, particles);

  resize();
  window.addEventListener('resize', resize);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      group.rotation.y = t * 0.18;
      group.rotation.x = Math.sin(t * 0.15) * 0.15;
      inner.rotation.z = Math.PI / 8 + Math.sin(t * 0.2) * 0.1;
      particles.rotation.y = t * 0.02;
    }

    // sanftes Parallax-Following der Maus
    camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
})();
