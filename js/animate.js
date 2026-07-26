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
