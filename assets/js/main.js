/* ═══════════════════════════════════════════════════
   IMALIWAY v3 — main.js
   Interactions: theme toggle · navbar · reveal ·
                 stepper · FAQ · smooth scroll
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const html         = document.documentElement;
  const navbar       = document.getElementById('navbar');
  const themeToggle  = document.getElementById('themeToggle');
  const hamburger    = document.getElementById('hamburger');
  const mobileMenu   = document.getElementById('mobileMenu');

  /* ─────────────────────────────────────────
     THEME TOGGLE — dark / light
  ───────────────────────────────────────── */
  const THEME_KEY = 'imaliway-theme';

  // Load saved preference, fallback to dark
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  html.setAttribute('data-theme', savedTheme);

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  themeToggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ─────────────────────────────────────────
     NAVBAR — scroll shadow + mobile
  ───────────────────────────────────────── */
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.style.display = isOpen ? 'flex' : 'none';
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (mobileMenu?.style.display === 'flex' && !navbar?.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ─────────────────────────────────────────
     SCROLL REVEAL
  ───────────────────────────────────────── */
  const revealObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ─────────────────────────────────────────
     ACTIVE NAV LINK on scroll
  ───────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const spyObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    }),
    { threshold: 0.4 }
  );
  sections.forEach(s => spyObs.observe(s));

  /* ─────────────────────────────────────────
     SMOOTH SCROLL — anchor links
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = (navbar?.offsetHeight ?? 70) + 12;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ─────────────────────────────────────────
     STEPPER
  ───────────────────────────────────────── */
  const stepTabs   = document.querySelectorAll('.step-tab');
  const stepPanels = document.querySelectorAll('.step-panel');

  function activateStep(n) {
    const num = parseInt(n);
    stepTabs.forEach(t => {
      const active = parseInt(t.dataset.step) === num;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
    stepPanels.forEach(p => {
      p.classList.toggle('active', p.id === `panel-${num}`);
    });
  }

  stepTabs.forEach(tab =>
    tab.addEventListener('click', () => activateStep(tab.dataset.step))
  );

  document.querySelectorAll('.btn-step-next').forEach(btn =>
    btn.addEventListener('click', () => activateStep(btn.dataset.next))
  );

  document.querySelectorAll('.btn-step-prev').forEach(btn => {
    if (btn.dataset.prev) {
      btn.addEventListener('click', () => activateStep(btn.dataset.prev));
    }
  });

  /* ─────────────────────────────────────────
     FAQ ACCORDION
  ───────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const wasOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      document.querySelectorAll('.faq-q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.hidden = true;
      });

      // Open this one if it was closed
      if (!wasOpen) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling.hidden = false;
      }
    });
  });

  /* ─────────────────────────────────────────
     TERMINAL TABS (developer section)
  ───────────────────────────────────────── */
  document.querySelectorAll('.term-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.term-header');
      parent.querySelectorAll('.term-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Content switching can be added here when real snippets are provided
    });
  });

});

/**
 * FEATURES CARDS — JavaScript
 * iMalway · Maputo, Moçambique
 * Controla a animação de revelação e cliques nos itens.
 */
(function() {
  'use strict';

  // ═══════════════ 1. REVEAL ON SCROLL ═══════════════
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  // ═══════════════ 2. FEATURE LIST ITEM CLICK ═══════════════
  document.querySelectorAll('.feature-list-item').forEach(item => {
    item.addEventListener('click', () => {
      const texto = item.textContent.trim();
      console.log('📋 Item de funcionalidade clicado:', texto);
      // Feedback visual opcional
      item.style.transform = 'scale(0.97)';
      setTimeout(() => { item.style.transform = ''; }, 150);
    });
  });

  // ═══════════════ 3. FEATURE CARD CLICK (excluindo itens internos) ═══════════════
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function(e) {
      // Não dispara se o clique foi num item da lista
      if (e.target.closest('.feature-list-item')) return;
      const titulo = this.querySelector('h3')?.textContent || 'Card';
      console.log('📦 Card clicado:', titulo);
    });
  });

  console.log('✅ Features Cards inicializados.');
})();