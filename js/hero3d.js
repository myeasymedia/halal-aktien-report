/* ============================================================
   hero3d.js
   Signatur-3D-Element des Heros: ein Halbmond mit Stern (das
   universell erkennbare Halal-/Islamic-Finance-Symbol), umkreist
   von einer gezackten "Kurslinie" (steht für die Marktbewegungen)
   und vier kleinen Markern für die vier beobachteten Anlageklassen
   (Aktien/Gold/Silber/Bitcoin). Läuft nur, wenn Three.js geladen
   ist und der Nutzer keine reduzierte Bewegung eingestellt hat.
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

  function edgesFromShape(shape, depth, color, opacity) {
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.025, bevelSegments: 2,
    });
    const wireGeo = new THREE.EdgesGeometry(geo, 1);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    return new THREE.LineSegments(wireGeo, mat);
  }

  // --- Kern: Halbmond, konstruiert aus zwei sich schneidenden Kreisbögen
  //     (ein einzelnes, geschlossenes Umriss-Polygon -- kein "Loch", da sich
  //     zwei volle Kreise mit Loch-Subtraktion in three.js nicht sauber zu
  //     einer echten Mondsichel triangulieren lassen) ---
  function normalizeAngle(a) {
    a = a % (Math.PI * 2);
    return a < 0 ? a + Math.PI * 2 : a;
  }
  function angleDist(a, b) {
    const d = Math.abs(normalizeAngle(a) - normalizeAngle(b));
    return Math.min(d, Math.PI * 2 - d);
  }
  function arcPoints(cx, cy, r, aStart, aEnd, ccw, segments) {
    aStart = normalizeAngle(aStart);
    aEnd = normalizeAngle(aEnd);
    let delta;
    if (ccw) {
      delta = aEnd - aStart;
      if (delta <= 0) delta += Math.PI * 2;
    } else {
      delta = aStart - aEnd;
      if (delta <= 0) delta += Math.PI * 2;
      delta = -delta;
    }
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const t = aStart + delta * (i / segments);
      pts.push(new THREE.Vector2(cx + Math.cos(t) * r, cy + Math.sin(t) * r));
    }
    return pts;
  }
  function arcThrough(cx, cy, r, aStart, aEnd, throughAngle, segments) {
    const ccwPts = arcPoints(cx, cy, r, aStart, aEnd, true, segments);
    const cwPts = arcPoints(cx, cy, r, aStart, aEnd, false, segments);
    const mid = Math.floor(segments / 2);
    const ccwMidAngle = Math.atan2(ccwPts[mid].y - cy, ccwPts[mid].x - cx);
    const cwMidAngle = Math.atan2(cwPts[mid].y - cy, cwPts[mid].x - cx);
    return angleDist(ccwMidAngle, throughAngle) < angleDist(cwMidAngle, throughAngle) ? ccwPts : cwPts;
  }
  function circleIntersection(r1, r2, d) {
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    const h = Math.sqrt(Math.max(r1 * r1 - a * a, 0));
    return { a, h };
  }

  const coreGroup = new THREE.Group();

  const R1 = 1.7, R2 = 1.45, D = 0.9; // Außenkreis, Innenkreis (verschoben), Versatz
  const { a: ix, h: iy } = circleIntersection(R1, R2, D);
  const angle1P1 = Math.atan2(iy, ix);
  const angle1P2 = Math.atan2(-iy, ix);
  const angle2P1 = Math.atan2(iy, ix - D);
  const angle2P2 = Math.atan2(-iy, ix - D);

  const outerArc = arcThrough(0, 0, R1, angle1P1, angle1P2, Math.PI, 40); // großer Bogen: Rücken des Mondes
  const innerArc = arcThrough(D, 0, R2, angle2P2, angle2P1, Math.PI, 40); // konkaver Bogen: Sichel-Innenkante

  const moonShape = new THREE.Shape([...outerArc, ...innerArc]);
  const moon = edgesFromShape(moonShape, 0.3, 0x2dd4a7, 0.85);
  coreGroup.add(moon);

  // --- Kleiner Stern in der Mondsichel-Öffnung (klassisches Halal-Symbol) ---
  function starShape(radius, points) {
    const shapePoints = [];
    for (let i = 0; i < points * 2; i++) {
      const angle = (i / (points * 2)) * Math.PI * 2;
      const r = i % 2 === 0 ? radius : radius * 0.42;
      shapePoints.push(new THREE.Vector2(Math.cos(angle) * r, Math.sin(angle) * r));
    }
    return new THREE.Shape(shapePoints);
  }
  const star = edgesFromShape(starShape(0.5, 5), 0.22, 0xc9a15a, 0.9);
  star.position.set(0.25, 0.05, 0.55);
  coreGroup.add(star);

  scene.add(coreGroup);

  // --- Glow-Halo hinter dem Kern (Sprite mit Canvas-Gradient-Textur) ---
  function buildGlowSprite(color, size, opacity) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(size, size, 1);
    return sprite;
  }

  const glow = buildGlowSprite('rgba(45,212,167,0.9)', 8, 0.5);
  glow.position.z = -1.4;
  scene.add(glow);

  // --- Gezackte "Kurslinie" als umlaufender Ring -- steht für die
  //     Marktbewegungen, die Barakah Finance laufend auswertet ---
  const ringGroup = new THREE.Group();
  ringGroup.rotation.x = 0.34;

  function buildChartRing(baseRadius, zigzag, segments, color, opacity) {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const r = baseRadius + (i % 2 === 0 ? zigzag : -zigzag * 0.6);
      points.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, Math.sin(angle * 3) * 0.25));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    return new THREE.LineLoop(geo, mat);
  }

  const chartRing = buildChartRing(3.5, 0.22, 48, 0x2dd4a7, 0.55);
  ringGroup.add(chartRing);
  scene.add(ringGroup);

  // --- Kleine orbitende Marker für die vier Anlageklassen (Aktien/Gold/Silber/Bitcoin) ---
  const orbitMarkers = [];
  const markerColors = [0x2dd4a7, 0xc9a15a, 0x8fa69c, 0xf3efe6];
  markerColors.forEach((color, i) => {
    const geo = new THREE.OctahedronGeometry(0.16, 0);
    const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.75 });
    const mesh = new THREE.Mesh(geo, mat);
    const radius = 4.2 + i * 0.35;
    const tilt = 0.25 + i * 0.08;
    const offset = (i / markerColors.length) * Math.PI * 2;
    orbitMarkers.push({ mesh, radius, speed: 0.16 - i * 0.02, offset, tilt });
    mesh.position.set(Math.cos(offset) * radius, Math.sin(offset) * radius * tilt, 0);
    scene.add(mesh);
  });

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
  scene.add(particles);

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
      coreGroup.rotation.y = t * 0.16;
      coreGroup.rotation.x = Math.sin(t * 0.15) * 0.12;
      ringGroup.rotation.z = t * 0.1;
      particles.rotation.y = t * 0.02;

      orbitMarkers.forEach(({ mesh, radius, speed, offset, tilt }) => {
        const angle = t * speed + offset;
        mesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * tilt,
          Math.sin(angle * 0.6) * 1.2
        );
        mesh.rotation.x = t * 0.4;
        mesh.rotation.y = t * 0.3;
      });

      glow.material.opacity = 0.4 + Math.sin(t * 0.6) * 0.08;
    }

    // sanftes Parallax-Following der Maus
    camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
})();
