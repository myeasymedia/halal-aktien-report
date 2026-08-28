/* ============================================================
   hero3d.js
   Das Signaturbild des Heros: ein Halbmond mit Stern, umgeben
   von einem Partikelfeld und einem gekippten Ring.

   Warum ausgerechnet das: Der Halbmond ist das Zeichen, das
   diese Seite in einer Sekunde einordnet -- islamische Finanzen,
   nicht irgendein Broker. Der Ring und die Partikel stehen für
   den Markt, der sich darum bewegt.

   Warum echtes 3D und kein Bild: Weil das Objekt dem Zeiger
   folgt. Genau dieser Moment -- die Seite reagiert auf mich --
   ist der Unterschied zwischen "gemacht" und "hingestellt".

   Bricht irgendetwas (kein WebGL, Three.js nicht geladen, alte
   Grafik), bleibt der ruhige Kreis aus dem CSS stehen. Ein
   leeres Loch im Hero wäre der schlechteste Ausfallmodus.
   ============================================================ */

(function () {
  "use strict";

  const canvas = document.getElementById("hero-canvas");
  const fallback = document.getElementById("hero-fallback");
  if (!canvas || typeof THREE === "undefined") return;
  // Auf dem Handy bleibt der Mond aus. Rueckmeldung vom 28.08.2026:
  // "auf pc sieht gut aus, aber auf handy ist der so random". Klein und
  // ohne Bezug wirkt er beliebig -- und eine 3D-Szene, die niemand
  // sehen soll, muss auch nicht gerechnet werden: das spart Akku und
  // laesst die Seite schneller starten.
  if (window.innerWidth <= 720) return;

  const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (e) {
    return;   // kein WebGL -- der CSS-Kreis bleibt stehen
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 6.4);

  const gruppe = new THREE.Group();
  scene.add(gruppe);

  const JADE = 0x2ee6a8;
  const BRASS = 0xd4a95f;
  const EMERALD = 0x0f4c46;

  /* ---------- Halbmond ----------
     Aus zwei Kreisbögen gebaut, die sich in denselben zwei
     Punkten treffen. Die Zahlen unten sind kein Zufall: Bei
     Aussenradius 1 und Innenkreis (Mittelpunkt 0.5, Radius
     0.82) schneiden sich die Kreise bei x = 0.5776, y = ±0.816
     -- daraus folgen die beiden Winkel. Stimmen sie nicht,
     klafft im Mond eine gerade Kante. */
  const aussen = Math.atan2(0.816, 0.5776);        // ≈ 54,7°
  const innen = Math.atan2(0.816, 0.0776);         // ≈ 84,6°

  const mondForm = new THREE.Shape();
  mondForm.absarc(0, 0, 1, aussen, -aussen, false);
  mondForm.absarc(0.5, 0, 0.82, -innen, innen, true);

  const mondGeo = new THREE.ExtrudeGeometry(mondForm, {
    depth: 0.22, bevelEnabled: true, bevelThickness: 0.05,
    bevelSize: 0.045, bevelSegments: 4, curveSegments: 64,
  });
  mondGeo.center();

  const mondMat = new THREE.MeshStandardMaterial({
    color: JADE, metalness: 0.72, roughness: 0.24,
    emissive: EMERALD, emissiveIntensity: 0.55,
  });
  const mond = new THREE.Mesh(mondGeo, mondMat);
  mond.scale.setScalar(1.28);
  gruppe.add(mond);

  /* ---------- Stern ---------- */
  const sternForm = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 0.3 : 0.13;
    const w = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(w) * r;
    const y = Math.sin(w) * r;
    if (i === 0) sternForm.moveTo(x, y); else sternForm.lineTo(x, y);
  }
  sternForm.closePath();

  const stern = new THREE.Mesh(
    new THREE.ExtrudeGeometry(sternForm, {
      depth: 0.14, bevelEnabled: true, bevelThickness: 0.03,
      bevelSize: 0.025, bevelSegments: 3,
    }),
    new THREE.MeshStandardMaterial({
      color: BRASS, metalness: 0.85, roughness: 0.2,
      emissive: 0x5a4213, emissiveIntensity: 0.5,
    })
  );
  stern.position.set(0.92, 0.5, 0.12);
  gruppe.add(stern);

  /* ---------- Ring ----------
     Gekippt, damit die Szene Tiefe bekommt. Ein waagerechter
     Ring läse sich als flacher Kreis. */
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.05, 0.012, 12, 180),
    new THREE.MeshBasicMaterial({ color: JADE, transparent: true, opacity: 0.42 })
  );
  ring.rotation.set(Math.PI * 0.42, 0.32, 0);
  gruppe.add(ring);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.42, 0.008, 12, 180),
    new THREE.MeshBasicMaterial({ color: BRASS, transparent: true, opacity: 0.28 })
  );
  ring2.rotation.set(Math.PI * 0.36, -0.5, 0.2);
  gruppe.add(ring2);

  /* ---------- Partikelfeld ----------
     Auf einer Kugelschale verteilt, nicht im Würfel: In einem
     Würfel sammeln sich die Punkte optisch in den Ecken, und
     das sieht nach Zufall aus statt nach Ordnung. */
  const ANZAHL = 520;
  const orte = new Float32Array(ANZAHL * 3);
  for (let i = 0; i < ANZAHL; i++) {
    const r = 2.6 + Math.random() * 1.9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    orte[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    orte[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    orte[i * 3 + 2] = r * Math.cos(phi);
  }
  const punktGeo = new THREE.BufferGeometry();
  punktGeo.setAttribute("position", new THREE.BufferAttribute(orte, 3));
  const punkte = new THREE.Points(punktGeo, new THREE.PointsMaterial({
    color: JADE, size: 0.028, transparent: true, opacity: 0.65, sizeAttenuation: true,
  }));
  gruppe.add(punkte);

  /* ---------- Licht ---------- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.32));
  const licht1 = new THREE.PointLight(JADE, 1.5, 22);
  licht1.position.set(3.4, 2.6, 4.2);
  scene.add(licht1);
  const licht2 = new THREE.PointLight(BRASS, 0.95, 22);
  licht2.position.set(-3.6, -1.8, 2.6);
  scene.add(licht2);
  const licht3 = new THREE.DirectionalLight(0xffffff, 0.35);
  licht3.position.set(-1, 2, 3);
  scene.add(licht3);

  /* ---------- Größe ---------- */
  function anpassen() {
    const kasten = canvas.getBoundingClientRect();
    const seite = Math.max(1, Math.min(kasten.width, kasten.height));
    renderer.setSize(seite, seite, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
  anpassen();
  window.addEventListener("resize", anpassen);

  /* ---------- Zeiger ----------
     Das Objekt folgt dem Zeiger nur zu einem Bruchteil und mit
     Trägheit. Eine 1:1-Kopplung wirkt nervös und macht bei
     schnellen Mausbewegungen seekrank. */
  let zielX = 0, zielY = 0, istX = 0, istY = 0;
  if (!ruhig && window.matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", function (e) {
      zielX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      zielY = (e.clientY / window.innerHeight - 0.5) * 0.35;
    }, { passive: true });
  }

  if (fallback) fallback.style.opacity = "0";

  let laeuft = true;
  /* Anhalten, sobald der Hero aus dem Blick ist -- eine
     unsichtbare 3D-Szene weiterzurechnen kostet Akku und
     verlangsamt alles darunter. */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { laeuft = e[0].isIntersecting; },
      { threshold: 0.02 }).observe(canvas);
  }

  const start = performance.now();
  function zeichnen(jetzt) {
    requestAnimationFrame(zeichnen);
    if (!laeuft) return;

    const t = (jetzt - start) / 1000;
    istX += (zielX - istX) * 0.045;
    istY += (zielY - istY) * 0.045;

    if (!ruhig) {
      gruppe.rotation.y = istX + Math.sin(t * 0.16) * 0.14;
      gruppe.rotation.x = istY + Math.sin(t * 0.22) * 0.07;
      mond.rotation.z = Math.sin(t * 0.3) * 0.06;
      stern.rotation.z = t * 0.5;
      punkte.rotation.y = t * 0.035;
      ring.rotation.z = t * 0.09;
      ring2.rotation.z = -t * 0.06;
    }
    renderer.render(scene, camera);
  }
  requestAnimationFrame(zeichnen);
})();
