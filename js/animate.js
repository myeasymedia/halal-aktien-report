/* ============================================================
   animate.js
   Leichte Scroll-Reveal-Animationen + Zähl-Animation für Stat-Zahlen.
   Respektiert prefers-reduced-motion vollständig.
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Zählt ein Element von 0 auf `target` hoch (oder setzt den Wert direkt bei reduzierter Bewegung). */
function animateCount(el, target, duration = 900) {
  if (!el) return;
  if (prefersReducedMotion || target <= 0) {
    el.textContent = target;
    return;
  }
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/** Markiert Kinder von [data-reveal-group] als .reveal (mit gestaffelter Verzögerung)
 *  und beobachtet alle .reveal-Elemente, um sie beim Scrollen einzublenden. */
function initRevealScan() {
  document.querySelectorAll('[data-reveal-group]').forEach((group) => {
    [...group.children].forEach((el, i) => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      el.style.transitionDelay = prefersReducedMotion ? '0ms' : `${Math.min(i * 70, 420)}ms`;
    });
  });

  const targets = document.querySelectorAll('.reveal:not(.is-visible)');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((t) => io.observe(t));
}

window.initRevealScan = initRevealScan;
document.addEventListener('DOMContentLoaded', initRevealScan);

/** Mobiles Hamburger-Menü: togglet die Dropdown-Liste, schließt beim Linkklick. */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-mobile-menu');
  if (!toggle || !menu) return;

  function close() {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
}

document.addEventListener('DOMContentLoaded', initMobileNav);

/** Nur auf Geräten mit echter Maus + ohne "reduzierte Bewegung"-Wunsch aktivieren. */
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion;

/** Cursor-Spotlight: sanfter Lichtkegel, der der Maus innerhalb eines
 *  [data-spotlight]-Containers folgt (z.B. Hero, Feature-Grid-Sections). */
function initSpotlights() {
  if (!canHover) return;
  document.querySelectorAll('[data-spotlight]').forEach((container) => {
    const glow = document.createElement('div');
    glow.className = 'spotlight';
    container.prepend(glow);
    container.addEventListener('mouseenter', () => glow.classList.add('is-active'));
    container.addEventListener('mouseleave', () => glow.classList.remove('is-active'));
    container.addEventListener('mousemove', (e) => {
      const r = container.getBoundingClientRect();
      glow.style.setProperty('--x', `${e.clientX - r.left}px`);
      glow.style.setProperty('--y', `${e.clientY - r.top}px`);
    });
  });
}

/** 3D-Tilt-Effekt: neigt Karten leicht Richtung Cursor (Apple/Stripe-Stil).
 *  Setzt das transform inline, damit es die bestehenden CSS-:hover-Transforms
 *  (z.B. translateY bei .company-card) beim Verlassen sauber wieder freigibt. */
function initTilt() {
  if (!canHover) return;
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.08s linear';
    });
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s var(--ease)';
      card.style.transform = '';
    });
  });
}

/** Registriert Tilt-Handler für Karten, die nach dem initialen Laden per
 *  innerHTML nachgerendert werden (z.B. Unternehmens-/Blog-Grid). */
function refreshTilt() {
  initTilt();
}
window.refreshTilt = refreshTilt;

/** FAQ-Akkordeon: schließt die jeweils anderen <details>-Einträge einer
 *  [data-faq-group], damit immer nur eine Antwort offen ist. */
function initFaqAccordion() {
  document.querySelectorAll('[data-faq-group]').forEach((group) => {
    const items = [...group.querySelectorAll('.faq-item')];
    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (item.open) items.forEach((other) => { if (other !== item) other.open = false; });
      });
    });
  });
}

/** Sticky Telegram-CTA: erscheint, sobald der Hero (falls vorhanden) aus dem
 *  Blickfeld gescrollt ist, und versteckt sich wieder, sobald die große
 *  Community/Telegram-Karte selbst sichtbar ist -- so gibt es nie zwei
 *  konkurrierende Beitreten-CTAs gleichzeitig auf dem Bildschirm. */
function initStickyCta() {
  const sticky = document.querySelector('.sticky-cta');
  if (!sticky || !('IntersectionObserver' in window)) return;

  const hero = document.querySelector('.hero');
  const community = document.querySelector('.community-card');
  let heroHidden = !hero;
  let communityVisible = false;

  function update() {
    sticky.classList.toggle('is-visible', heroHidden && !communityVisible);
  }

  if (hero) {
    new IntersectionObserver(([entry]) => {
      heroHidden = !entry.isIntersecting;
      update();
    }, { threshold: 0 }).observe(hero);
  }

  if (community) {
    new IntersectionObserver(([entry]) => {
      communityVisible = entry.isIntersecting;
      update();
    }, { threshold: 0.15 }).observe(community);
  }

  update();
}

document.addEventListener('DOMContentLoaded', () => {
  initSpotlights();
  initTilt();
  initFaqAccordion();
  initStickyCta();
});
