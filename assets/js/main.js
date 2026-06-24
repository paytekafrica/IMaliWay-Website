/* ═══════════════════════════════════════════════════
   IMALIWAY v3 — main.js
   Component loader (Promise) + App init after load
═══════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   1. COMPONENT LOADER (retorna Promise)
   ───────────────────────────────────────── */
function loadComponents() {
  return new Promise(resolve => {
    const includes = document.querySelectorAll('[data-include]');
    if (includes.length === 0) { resolve(); return; }

    let loaded = 0;
    const total = includes.length;
    includes.forEach(el => {
      const file = el.getAttribute('data-include');
      if (!file) {
        loaded++;
        if (loaded === total) resolve();
        return;
      }
      fetch(file)
        .then(res => {
          if (!res.ok) throw new Error(`Falha ao carregar ${file}`);
          return res.text();
        })
        .then(html => {
          el.insertAdjacentHTML('afterend', html);
          el.remove();
          loaded++;
          if (loaded === total) resolve();
        })
        .catch(err => {
          console.error(err);
          loaded++;
          if (loaded === total) resolve();
        });
    });
  });
}

/* ─────────────────────────────────────────
   2. TODA A LÓGICA DA APLICAÇÃO
   (só executa quando componentes estiverem prontos)
   ───────────────────────────────────────── */
function initializeApp() {
  const html         = document.documentElement;
  const navbar       = document.getElementById('navbar');
  const themeToggle  = document.getElementById('themeToggle');
  const hamburger    = document.getElementById('hamburger');
  const mobileMenu   = document.getElementById('mobileMenu');

  /* ── THEME TOGGLE ── */
  html.setAttribute('data-theme', 'light');

  /* ── NAVBAR: scroll shadow + mobile ── */
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.style.display = isOpen ? 'flex' : 'none';
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  });

  mobileMenu?.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (mobileMenu?.style.display === 'flex' && !navbar?.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── SCROLL REVEAL ── */
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

  /* ── ACTIVE NAV LINK (spy) ── */
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

  /* ── SMOOTH SCROLL (inclui links no navbar/footer) ── */
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

  /* ── STEPPER ── */
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

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const wasOpen = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.hidden = true;
      });

      if (!wasOpen) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling.hidden = false;
      }
    });
  });

  /* ── TERMINAL TABS ── */
  document.querySelectorAll('.term-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.term-header');
      parent.querySelectorAll('.term-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

/* ─────────────────────────────────────────
   3. ARRANQUE: carrega componentes → inicia app
   ───────────────────────────────────────── */
loadComponents().then(initializeApp);
