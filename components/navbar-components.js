// assets/js/header-component.js
class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // ══════ CONFIGURAÇÃO DOS LINKS DE AUTENTICAÇÃO ══════
    const authBase = 'auth/index.html';
    const loginUrl = `${authBase}?tab=login`;
    const signupUrl = `${authBase}?tab=signup`;

    this.shadowRoot.innerHTML = `
      <style>
        /* ══════ RESET (apenas o necessário) ══════ */
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; font-family: inherit; border: none; background: none; }

        /* ══════ BOTÕES GLOBAIS (usados no mobile) ══════ */
        .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          font-family: var(--font-head); font-weight: 700; font-size: .88rem;
          letter-spacing: .01em; line-height: 1;
          border-radius: var(--r-md); padding: 0 22px; height: 44px;
          transition: all var(--t-fast); white-space: nowrap; cursor: pointer;
        }
        .btn-primary {
          background: var(--green); color: #fff;
          box-shadow: 0 2px 12px rgba(82,168,40,.32);
        }
        .btn-primary:hover {
          background: var(--green-dark); transform: translateY(-1px);
          box-shadow: 0 5px 20px rgba(82,168,40,.45);
        }
        .btn-primary:active { transform: translateY(0); }
        .btn-ghost {
          background: transparent; color: var(--text-primary);
          border: 1.5px solid var(--border-strong);
        }
        .btn-ghost:hover {
          background: var(--bg-card); border-color: var(--border-hover);
        }

        /* ══════ BOTÕES ESPECÍFICOS DA NAVBAR ══════ */
        .btn-ghost-nav {
          display: inline-flex; align-items: center; justify-content: center;
          background: transparent; color: var(--nav-link);
          border: 1px solid var(--border);
          font-family: var(--font-head); font-weight: 600; font-size: .8rem;
          line-height: 1; letter-spacing: .01em;
          padding: 0 14px; height: 34px; border-radius: var(--r-md);
          transition: all var(--t-fast);
        }
        .btn-ghost-nav:hover {
          border-color: var(--border-hover); color: var(--nav-link-hover);
        }
        .btn-primary-nav {
          display: inline-flex; align-items: center; justify-content: center;
          background: var(--green); color: #fff;
          font-family: var(--font-head); font-weight: 700; font-size: .8rem;
          line-height: 1; letter-spacing: .01em;
          padding: 0 14px; height: 34px; border-radius: var(--r-md);
          transition: all var(--t-fast);
        }
        .btn-primary-nav:hover { background: var(--green-dark); }

        /* ══════ NAVBAR ══════ */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: var(--nav-bg); backdrop-filter: blur(16px) saturate(180%);
          border-bottom: 1px solid var(--nav-border);
          transition: box-shadow var(--t-norm), background var(--t-norm), border-color var(--t-norm);
        }
        .navbar.scrolled { box-shadow: 0 2px 20px rgba(0,0,0,.3); }
        .nav-wrap {
          max-width: 1200px; margin: 0 auto; padding: 0 24px;
          height: 66px; display: flex; align-items: center; gap: 32px;
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .logo-text {
          font-family: var(--font-head); font-size: 1.18rem; font-weight: 400;
          color: var(--text-primary);
        }
        .logo-text strong { font-weight: 900; }
        .logo-text em { font-style: normal; font-weight: 700; color: var(--green-light); }
        .nav-links { display: flex; align-items: center; gap: 2px; flex: 1; justify-content: center; }
        .nav-link {
          font-family: var(--font-head); font-size: .83rem; font-weight: 600;
          color: var(--nav-link); padding: 7px 13px; border-radius: var(--r-md);
          transition: all var(--t-fast);
        }
        .nav-link:hover, .nav-link.active {
          color: var(--nav-link-hover); background: rgba(255,255,255,.06);
        }
        [data-theme="light"] .nav-link:hover,
        [data-theme="light"] .nav-link.active { background: #F7F8F6; }
        .nav-end { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

        /* ══════ THEME TOGGLE ══════ */
        .theme-toggle {
          width: 34px; height: 34px; border-radius: var(--r-full);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary); background: var(--bg-card);
          border: 1px solid var(--border); transition: all var(--t-fast);
        }
        .theme-toggle:hover { color: var(--text-primary); border-color: var(--border-hover); }
        .theme-icon { display: flex; align-items: center; justify-content: center; }
        :host([data-theme="dark"]) .theme-icon-light { display: none; }
        :host([data-theme="light"]) .theme-icon-dark  { display: none; }

        /* ══════ HAMBURGER + MENU MOBILE ══════ */
        .hamburger {
          display: none; flex-direction: column; justify-content: center; gap: 5px;
          width: 38px; height: 38px; border-radius: var(--r-md); padding: 0;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px; background: var(--text-primary);
          border-radius: 2px; transition: all var(--t-fast);
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu {
          display: none; flex-direction: column; gap: 6px;
          padding: 14px 24px 22px; background: var(--bg-section);
          border-top: 1px solid var(--border);
        }
        .mob-link {
          font-family: var(--font-head); font-weight: 600; font-size: .92rem;
          color: var(--text-primary); padding: 11px 0; border-bottom: 1px solid var(--border);
        }
        .mob-ctas { display: flex; gap: 10px; margin-top: 10px; }

        /* ══════ RESPONSIVO ══════ */
        @media (max-width: 768px) {
          .nav-links, .btn-ghost-nav, .btn-primary-nav { display: none; }
          .hamburger { display: flex; }
        }
      </style>

      <header class="navbar" id="navbar">
        <div class="nav-wrap">
          <a href="/IMaliWay-Website/" class="nav-logo" aria-label="IMaliway">
            <span class="logo-text"><strong>IMali</strong><em>way</em></span>
          </a>

          <nav class="nav-links" aria-label="Navegação">
            <a href="solutions/index.html" class="nav-link">Soluções</a>
            <a href="/IMaliWay-Website/taxas.html" class="nav-link">Taxas</a>
            <a href="doc2/doc.html" class="nav-link">Documentação</a>
            <a href="contact/index.html" class="nav-link">Contacto</a>
          </nav>

          <div class="nav-end">
            <button class="theme-toggle" id="themeToggle" aria-label="Alternar tema" title="Alternar tema claro/escuro">
              <span class="theme-icon theme-icon-dark" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              </span>
              <span class="theme-icon theme-icon-light" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              </span>
            </button>
            <a href="${loginUrl}" class="btn-ghost-nav">Entrar</a>
            <a href="${signupUrl}" class="btn-primary-nav">Criar Conta</a>
            <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
          <a href="/IMaliWay-Website/index2.html" class="mob-link">Soluções</a>
          <a href="/IMaliWay-Website/taxas.html" class="mob-link">Taxas</a>
          <a href="doc2/doc.html" class="mob-link">Documentação</a>
          <a href="contact/index.html" class="mob-link">Contacto</a>
          <div class="mob-ctas">
            <a href="${loginUrl}" class="btn btn-ghost">Entrar</a>
            <a href="${signupUrl}" class="btn btn-primary">Criar Conta</a>
          </div>
        </div>
      </header>
    `;

    // ═══ LÓGICA INTERATIVA (mantida inalterada) ═══
    const root = this.shadowRoot;
    const html = document.documentElement;
    const navbar = root.getElementById('navbar');
    const themeToggle = root.getElementById('themeToggle');
    const hamburger = root.getElementById('hamburger');
    const mobileMenu = root.getElementById('mobileMenu');

    const THEME_KEY = 'imaliway-theme';
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    html.setAttribute('data-theme', savedTheme);
    this.setAttribute('data-theme', savedTheme);

    function setTheme(theme) {
      html.setAttribute('data-theme', theme);
      this.setAttribute('data-theme', theme);
      localStorage.setItem(THEME_KEY, theme);
    }

    themeToggle?.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      setTheme.call(this, current === 'dark' ? 'light' : 'dark');
    });

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
      if (mobileMenu?.style.display === 'flex' && !navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.style.display = 'none';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Spy de navegação
    const sections = document.querySelectorAll('section[id]');
    const navLinks = root.querySelectorAll('.nav-link');
    const spyObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const match = root.querySelector(`.nav-link[href="#${e.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => spyObs.observe(s));

    // Smooth scroll para links internos
    root.querySelectorAll('a[href^="#"]').forEach(a => {
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
  }
}

customElements.define('site-header', SiteHeader);