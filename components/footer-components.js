// assets/js/footer-component.js
class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        /* ── Reset de links para evitar sublinhado azul padrão ── */
        a {
          text-decoration: none;
          color: inherit;
        }

        /* ══════ Footer styles (extraídos do main.css) ══════ */
        .footer { background: var(--footer-bg); }

        .footer-top {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 24px 48px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ── Logo (antes era herdado do navbar) ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .logo-text {
          font-family: var(--font-head, 'Montserrat', sans-serif);
          font-size: 1.18rem;
          font-weight: 400;
          color: var(--text-primary, #fff);
        }

        .logo-text strong { font-weight: 900; }

        .logo-text em {
          font-style: normal;
          font-weight: 700;
          color: var(--green-light, #6DC135);
        }

        .footer-logo-link {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-tagline {
          font-size: .82rem;
          color: var(--footer-text);
          line-height: 1.7;
        }

        .footer-socials {
          display: flex;
          gap: 8px;
        }

        .soc-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, .07);
          color: rgba(255, 255, 255, .45);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--t-fast, 150ms ease);
        }

        .soc-btn:hover {
          background: var(--green, #52A828);
          color: #fff;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-col-h {
          font-family: var(--font-head, 'Montserrat', sans-serif);
          font-size: .6rem;
          font-weight: 800;
          color: rgba(255, 255, 255, .28);
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .footer-lnk {
          font-size: .83rem;
          color: var(--footer-link);
          transition: color var(--t-fast, 150ms ease);
        }

        .footer-lnk:hover {
          color: var(--footer-link-h);
        }

        .footer-bottom {
          border-top: 1px solid var(--footer-border);
          padding: 18px 24px;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footer-copy {
          font-family: var(--font-head, 'Montserrat', sans-serif);
          font-size: .6rem;
          font-weight: 700;
          color: rgba(255, 255, 255, .2);
          letter-spacing: .04em;
        }

        .footer-reg {
          font-size: .58rem;
          color: rgba(255, 255, 255, .15);
          letter-spacing: .04em;
        }

        /* ── Responsivo ── */
        @media (max-width: 1100px) {
          .footer-top { grid-template-columns: 1fr 1fr 1fr; }
        }

        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 540px) {
          .footer-top { grid-template-columns: 1fr; }
        }
      </style>

      <!-- Estrutura HTML do footer (mantida) -->
      <footer class="footer">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="/IMaliWay-Website/" class="nav-logo footer-logo-link" aria-label="IMaliway">
              <span class="logo-text"><strong>IMali</strong><em>way</em></span>
            </a>
            <p class="footer-tagline">Liderando a revolução digital em Moçambique com tecnologia de pagamentos robusta e acessível.</p>
            <div class="footer-socials">
              <a href="https://www.facebook.com/imalimoz/" class="soc-btn" aria-label="Facebook" target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" class="soc-btn" aria-label="LinkedIn" target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" class="soc-btn" aria-label="Instagram" target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" class="soc-btn" aria-label="WhatsApp" target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div class="footer-col">
            <h4 class="footer-col-h">PRODUTO</h4>
            <a href="/IMaliWay-Website/index2.html#metodos" class="footer-lnk">API Checkout</a>
            <a href="/IMaliWay-Website/developers.html" class="footer-lnk">Checkout.net</a>
            <a href="#" class="footer-lnk">Payout API</a>
            <a href="#" class="footer-lnk">Segurança</a>
          </div>

          <div class="footer-col">
            <h4 class="footer-col-h">RECURSOS</h4>
            <a href="/IMaliWay-Website/developers.html" class="footer-lnk">Documentação</a>
            <a href="/IMaliWay-Website/developers.html#api" class="footer-lnk">API Reference</a>
            <a href="#" class="footer-lnk">Changelog</a>
            <a href="#" class="footer-lnk">Licenciabilidade</a>
          </div>

          <div class="footer-col">
            <h4 class="footer-col-h">LEGAL</h4>
            <a href="https://imali.co.mz/politicas-de-privacidade/" target="_blank" rel="noopener" class="footer-lnk">Privacidade</a>
            <a href="#" class="footer-lnk">Termos de Uso</a>
            <a href="#" class="footer-lnk">Compliance</a>
            <a href="#" class="footer-lnk">Cookies</a>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copy">© 2025 IMALIWAY® TODOS OS DIREITOS RESERVADOS. PAYTEK TECNOLOGIAS E SERVIÇOS DE PAGAMENTOS, LDA. · LICENÇA Nº 177/2022</p>
          <p class="footer-reg">DESENVOLVIDO E OPERADO SOB REGULAÇÃO DO BANCO DE MOÇAMBIQUE</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);