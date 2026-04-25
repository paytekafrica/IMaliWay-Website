/* ═══════════════════════════════════════════════════
   IMALIWAY — main.js
   Interactions: navbar · scroll reveal · stepper · FAQ
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR: scroll shadow + mobile toggle ─── */
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.style.display = open ? 'flex' : 'none';
      hamburger.setAttribute('aria-expanded', String(open));
      mobileNav.setAttribute('aria-hidden', String(!open));
    });
    mobileNav.querySelectorAll('.mob-link').forEach(l => {
      l.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.style.display = 'none';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─── SCROLL REVEAL ─── */
  const revealObs = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ─── ACTIVE NAV on scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const spyObs = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    }),
    { threshold: 0.4 }
  );
  sections.forEach(s => spyObs.observe(s));

  /* ─── SMOOTH SCROLL for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 12 : 80;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  });

  /* ─── STEPPER ─── */
  const stepTabs   = document.querySelectorAll('.step-tab');
  const stepPanels = document.querySelectorAll('.step-panel');

  function activateStep(n) {
    const num = parseInt(n);
    stepTabs.forEach(t => {
      const isActive = parseInt(t.dataset.step) === num;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', String(isActive));
    });
    stepPanels.forEach(p => p.classList.toggle('active', p.id === `panel-${num}`));
  }

  stepTabs.forEach(t => t.addEventListener('click', () => activateStep(t.dataset.step)));
  document.querySelectorAll('.panel-btn-next').forEach(btn => {
    btn.addEventListener('click', () => activateStep(btn.dataset.next));
  });
  document.querySelectorAll('.panel-btn-prev').forEach(btn => {
    if (btn.dataset.prev) btn.addEventListener('click', () => activateStep(btn.dataset.prev));
  });

  /* ─── FAQ ACCORDION ─── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      document.querySelectorAll('.faq-q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.hidden = true;
      });
      // Open clicked if it was closed
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling.hidden = false;
      }
    });
  });

  /* ─── MOBILE NAV: close on outside click ─── */
  document.addEventListener('click', e => {
    if (mobileNav?.style.display === 'flex' && !navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileNav.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ─── MOCK PROGRESS BAR animation ─── */
  const progressFill = document.querySelector('.mock-progress-fill');
  if (progressFill) {
    progressFill.style.animationPlayState = 'running';
  }

});