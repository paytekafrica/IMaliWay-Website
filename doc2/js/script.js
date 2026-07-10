// ============================================================
// IMaliWay API Reference — script.js v2.1 (estático)
// Interage com o HTML estático: traduções, scroll spy, sandbox, etc.
// ============================================================

(function () {
  'use strict';

  // ─── CONFIG
  const BASE_URL = 'https://paytek-africa.net:11901/api/partners/imaliway/v2';

  // ─── STATE
  let currentLang = localStorage.getItem('imali_lang') || 'pt';
  let currentEnv  = 'sandbox';

  // ══════════════════════════════════════════════════════════
  // i18n (mantido para traduções e para o sandbox)
  // ══════════════════════════════════════════════════════════
  const T = {
    pt: {
      api_ref: 'Referência da API',
      get_keys: 'Obter Chaves API',
      search_ph: 'Pesquisar endpoints…',
      copy: 'Copiar',
      copied: 'Copiado!',
      send: 'Enviar Pedido',
      sending: 'Enviando…',
      resp_ph: 'Envie um pedido para ver a resposta aqui.',
      sandbox_badge: 'Sandbox',
      live_badge: 'Live',
      required: 'obrigatório',
      optional: 'opcional',
      fixed: 'fixo',
      params: 'Parâmetros',
      response: 'Resposta',
      example: 'Exemplo',
      endpoint_label: 'Endpoint',
      try_it: 'Experimentar',
      err_token: 'Token de autenticação é obrigatório',
      err_client: 'X-Client-ID é obrigatório',
      err_required: 'Campo obrigatório',
      err_txn12: 'partner_transaction_id deve ter exatamente 12 caracteres',
      err_amount: 'amount deve ser maior que 10 MT',
      overview_tag: 'Visão Geral',
      security_tag: 'Segurança',
      reference_tag: 'Referência',
      payment_tag: 'Pagamentos',
      transfer_tag: 'Transferências',
      webhook_tag: 'Webhooks',
      devtools_tag: 'Ferramentas de Dev',
      lbl_intro: 'Introdução',
      lbl_auth: 'Autenticação',
      lbl_codes: 'Códigos de Resposta',
      lbl_payments: 'Pagamentos',
      lbl_transfers: 'Transferências',
      lbl_webhooks: 'Webhooks',
      lbl_sandbox: 'API Sandbox',
      push: 'Push Payment',
      link: 'Pay-By-Link',
      qrcode: 'QR Code',
      status: 'Verificar Estado',
      refresh: 'Atualizar QR',
      b2c_check: 'Verificação B2C',
      b2c: 'Transferência B2C',
      webhooks: 'Visão Geral',
      'webhook-security': 'Segurança',
      sandbox: 'Sandbox',
      // extras para alguns textos estáticos
      bearer_token: 'Bearer Token',
      value: 'Valor',
      success: 'Sucesso',
      errors: 'Erros',
      // descrições dos códigos de erro
      err_400: 'partner_transaction_id com menos de 12 caracteres',
      err_401: 'Pagamento não aceite / transação expirada',
      err_402: 'Valor inválido (negativo ou zero)',
      err_404: 'Cliente/loja/conta inválida',
      err_405: 'Método não permitido',
      err_406: 'partner_transaction_id já em uso',
      err_407: 'Saldo insuficiente',
      err_408: 'Conta/loja bloqueada',
      err_409: 'Valor não disponível',
      err_422: 'Pedido mal formatado',
      err_500: 'Token inválido',
      err_501: 'Limite KYC do cliente atingido',
      err_502: 'Limite KYC da loja atingido',
      // webhooks
      webhooks_title: 'Webhooks — Visão Geral',
      webhook_sec_title: 'Segurança dos Webhooks',
      // etc...
    },
    en: {
      api_ref: 'API Reference',
      get_keys: 'Get API Keys',
      search_ph: 'Search endpoints…',
      copy: 'Copy',
      copied: 'Copied!',
      send: 'Send Request',
      sending: 'Sending…',
      resp_ph: 'Send a request to see the response here.',
      sandbox_badge: 'Sandbox',
      live_badge: 'Live',
      required: 'required',
      optional: 'optional',
      fixed: 'fixed',
      params: 'Parameters',
      response: 'Response',
      example: 'Example',
      endpoint_label: 'Endpoint',
      try_it: 'Try it',
      err_token: 'Authentication token is required',
      err_client: 'X-Client-ID is required',
      err_required: 'Required field',
      err_txn12: 'partner_transaction_id must be exactly 12 characters',
      err_amount: 'amount must be greater than 10 MT',
      overview_tag: 'Overview',
      security_tag: 'Security',
      reference_tag: 'Reference',
      payment_tag: 'Payments',
      transfer_tag: 'Transfers',
      webhook_tag: 'Webhooks',
      devtools_tag: 'Dev Tools',
      lbl_intro: 'Introduction',
      lbl_auth: 'Authentication',
      lbl_codes: 'Response Codes',
      lbl_payments: 'Payments',
      lbl_transfers: 'Transfers',
      lbl_webhooks: 'Webhooks',
      lbl_sandbox: 'API Sandbox',
      push: 'Push Payment',
      link: 'Pay-By-Link',
      qrcode: 'QR Code',
      status: 'Check Status',
      refresh: 'QR Refresh',
      b2c_check: 'B2C Check',
      b2c: 'B2C Transfer',
      webhooks: 'Overview',
      'webhook-security': 'Security',
      sandbox: 'Sandbox',
      bearer_token: 'Bearer Token',
      value: 'Value',
      success: 'Success',
      errors: 'Errors',
      err_400: 'partner_transaction_id less than 12 characters',
      err_401: 'Payment not accepted / transaction expired',
      err_402: 'Invalid amount (negative or zero)',
      err_404: 'Invalid customer/store/account',
      err_405: 'Method not allowed',
      err_406: 'partner_transaction_id already in use',
      err_407: 'Insufficient funds',
      err_408: 'Account/store blocked',
      err_409: 'Amount not available',
      err_422: 'Badly formatted request',
      err_500: 'Invalid token',
      err_501: 'Customer KYC limit reached',
      err_502: 'Store KYC limit reached',
      webhooks_title: 'Webhooks — Overview',
      webhook_sec_title: 'Webhook Security',
    }
  };

  function t(key) { return T[currentLang][key] || key; }

  // ══════════════════════════════════════════════════════════
  // ENDPOINTS (apenas para o sandbox)
  // ══════════════════════════════════════════════════════════
  const ENDPOINTS = {
    push: {
      method: 'POST',
      path: '/payments',
      titleKey: 'push',
      params: [
        { name: 'client_account_number', type: 'string',  kind: 'required', descPt: 'Número de telefone da carteira (M-Pesa: 84xxxxxxx) ou conta iMali (9 dígitos)', descEn: 'Mobile wallet number (M-Pesa: 84xxxxxxx) or iMali account number (9 digits)' },
        { name: 'amount',                type: 'decimal', kind: 'required', descPt: 'Valor a pagar. Mínimo 10 MT. Ex: 1000.00', descEn: 'Amount to pay. Minimum 10 MT. Ex: 1000.00' },
        { name: 'store_account_number',  type: 'string',  kind: 'required', descPt: 'Número da conta iMali da loja (conta STORE, 9 dígitos)', descEn: 'iMali store account number (STORE account, 9 digits)' },
        { name: 'partner_transaction_id',type: 'string',  kind: 'required', descPt: 'ID único da transação. Exatamente 12 caracteres', descEn: 'Unique transaction ID. Exactly 12 characters' },
        { name: 'payment_method',        type: 'enum',    kind: 'required', values: ['mpesa','emola','mkesh','imali'], descPt: 'Método de pagamento em minúsculas', descEn: 'Payment method in lowercase' },
        { name: 'payment_type',          type: 'enum',    kind: 'fixed',    values: ['push'] },
        { name: 'transaction_type',      type: 'enum',    kind: 'fixed',    values: ['C2B'] },
        { name: 'expiration_datetime',   type: 'string',  kind: 'optional', descPt: 'Data/hora de expiração. Padrão: 2 minutos', descEn: 'Expiry datetime. Default: 2 minutes' },
      ],
      example: { client_account_number: '842592349', amount: '1000.00', store_account_number: '290000001', partner_transaction_id: 'MPS25KLHLIKA', payment_method: 'mpesa', payment_type: 'push', transaction_type: 'C2B' },
      mockResponse: (b) => ({ data: { transaction_id: 'MPS' + rid(9), partner_transaction_id: b.partner_transaction_id || '', amount: b.amount, expiration_datetime: fd(2), status: 'PENDING' } }),
    },
    link: {
      method: 'POST',
      path: '/payments',
      titleKey: 'link',
      params: [
        { name: 'title',                 type: 'string',  kind: 'required', descPt: 'Título do link de pagamento', descEn: 'Payment link title' },
        { name: 'short_description',     type: 'string',  kind: 'required', descPt: 'Descrição breve do link', descEn: 'Brief link description' },
        { name: 'amount',                type: 'decimal', kind: 'required', descPt: 'Valor a pagar', descEn: 'Amount to pay' },
        { name: 'type',                  type: 'enum',    kind: 'required', values: ['DIRECT','RECURRING','DONATION'], descPt: 'Tipo de link', descEn: 'Link type' },
        { name: 'store_account_number',  type: 'string',  kind: 'required', descPt: 'Conta STORE iMali', descEn: 'iMali STORE account number' },
        { name: 'customer_link_id',      type: 'string',  kind: 'required', descPt: 'ID personalizado do link (deve ser único)', descEn: 'Custom link ID (must be unique)' },
        { name: 'send_to_phone',         type: 'string',  kind: 'required', descPt: 'Número de telefone para SMS', descEn: 'Phone number for SMS' },
        { name: 'partner_transaction_id',type: 'string',  kind: 'required', descPt: 'ID único da transação. Exatamente 12 caracteres', descEn: 'Unique transaction ID. Exactly 12 characters' },
        { name: 'payment_method',        type: 'enum',    kind: 'fixed',    values: ['imali'] },
        { name: 'payment_type',          type: 'enum',    kind: 'fixed',    values: ['link'] },
        { name: 'transaction_type',      type: 'enum',    kind: 'fixed',    values: ['C2B'] },
        { name: 'expiration_datetime',   type: 'string',  kind: 'optional', descPt: 'Data/hora de expiração', descEn: 'Expiry datetime' },
        { name: 'thumbnail_image',       type: 'string',  kind: 'optional', descPt: 'URL da imagem', descEn: 'Image URL' },
        { name: 'payment_frequence',     type: 'enum',    kind: 'optional', values: ['DAILY','WEEKLY','MONTHLY','YEARLY'], descPt: 'Frequência (apenas RECURRING)', descEn: 'Frequency (RECURRING only)' },
      ],
      example: { title: 'Pagamento de Serviços', short_description: 'PAY BY LINK', amount: '500.00', type: 'DIRECT', store_account_number: '290000001', customer_link_id: 'LINK_PARTNER_001', send_to_phone: '846002000', partner_transaction_id: 'SJM5LYOVU5GJ', payment_method: 'imali', payment_type: 'link', transaction_type: 'C2B' },
      mockResponse: (b) => ({ data: { link_id: rid(12), customer_link_id: `https://pay.imali.co.mz/l/${b.customer_link_id || rid(8)}`, partner_transaction_id: b.partner_transaction_id, send_to_phone: b.send_to_phone, title: b.title, amount: b.amount, imali_fee: +(parseFloat(b.amount) * 0.01).toFixed(2), amount_to_credit: +(parseFloat(b.amount) * 0.99).toFixed(2), short_description: b.short_description, type: b.type, status: 'PENDING', store_id: 290, business_account_id: 122, expiration_datetime: fd(1440), created_at: now(), updated_at: now(), id: 47 } }),
    },
    qrcode: {
      method: 'POST',
      path: '/payments',
      titleKey: 'qrcode',
      params: [
        { name: 'store_account_number',  type: 'string',  kind: 'required', descPt: 'Conta STORE iMali', descEn: 'iMali STORE account number' },
        { name: 'amount',                type: 'decimal', kind: 'required', descPt: 'Valor a pagar', descEn: 'Amount to pay' },
        { name: 'partner_transaction_id',type: 'string',  kind: 'required', descPt: 'ID único da transação. 12 caracteres', descEn: 'Unique transaction ID. 12 characters' },
        { name: 'payment_method',        type: 'enum',    kind: 'fixed',    values: ['imali'] },
        { name: 'payment_type',          type: 'enum',    kind: 'fixed',    values: ['qrcode'] },
        { name: 'qrcode_type',           type: 'enum',    kind: 'required', values: ['DYNAMIC_TERMINAL','DYNAMIC_TICKET'] },
        { name: 'transaction_type',      type: 'enum',    kind: 'fixed',    values: ['C2B'] },
        { name: 'title',                 type: 'string',  kind: 'optional', descPt: 'Título (obrigatório para DYNAMIC_TICKET)', descEn: 'Title (required for DYNAMIC_TICKET)' },
        { name: 'description',           type: 'string',  kind: 'optional', descPt: 'Descrição (obrigatório para DYNAMIC_TICKET)', descEn: 'Description (required for DYNAMIC_TICKET)' },
        { name: 'expiration_datetime',   type: 'string',  kind: 'optional', descPt: 'Expiração (obrigatório para DYNAMIC_TICKET)', descEn: 'Expiry (required for DYNAMIC_TICKET)' },
      ],
      example: { store_account_number: '290000001', amount: '400.00', partner_transaction_id: 'FJNGMQWLXCP3', payment_method: 'imali', payment_type: 'qrcode', qrcode_type: 'DYNAMIC_TERMINAL', transaction_type: 'C2B' },
      mockResponse: (b) => {
        const isTerminal = b.qrcode_type === 'DYNAMIC_TERMINAL';
        return { data: { qrcode_id: crypto.randomUUID ? crypto.randomUUID() : rid(36), partner_transaction_id: b.partner_transaction_id, expiration_datetime: isTerminal ? fd(2) : (b.expiration_datetime || fd(1440)), amount: b.amount, qrcode_type: b.qrcode_type || 'DYNAMIC_TERMINAL', status: 'PENDING' }, qrcode_token: randomToken(), qrcode_image: 'data:image/png;base64,...' };
      },
    },
    status: {
      method: 'GET',
      path: '/payments/status',
      titleKey: 'status',
      params: [
        { name: 'payment_type',          type: 'enum',   kind: 'required', values: ['push','link','qrcode'] },
        { name: 'partner_transaction_id',type: 'string', kind: 'optional', descPt: 'ID da transação (push/link)', descEn: 'Transaction ID (push/link)' },
        { name: 'qrcode_token',          type: 'string', kind: 'optional', descPt: 'Token QR Code', descEn: 'QR Code token' },
      ],
      example: { partner_transaction_id: 'MPS25KLHLIKA', payment_type: 'push' },
      mockResponse: () => {
        const s = ['PENDING','SUCCESS','FAILED','EXPIRED'][Math.floor(Math.random() * 4)];
        return { data: { status: s, left_time: s === 'PENDING' ? '1:45' : s === 'SUCCESS' ? '0:22' : '0' } };
      },
    },
    refresh: {
      method: 'POST',
      path: '/payments/qrcode/refresh',
      titleKey: 'refresh',
      params: [
        { name: 'qrcode_token', type: 'string', kind: 'required', descPt: 'Token do QR Code', descEn: 'QR Code token' },
      ],
      example: { qrcode_token: 'a7c6a:fcc8ee9ceb82cb28...a37d0c8f9dfbf495ce05ff' },
      mockResponse: () => ({ data: { qrcode_id: crypto.randomUUID ? crypto.randomUUID() : rid(36), partner_transaction_id: rid(12), expiration_datetime: fd(2), amount: '400.00', qrcode_type: 'DYNAMIC_TERMINAL', status: 'PENDING' }, qrcode_token: randomToken(), qrcode_image: '...' }),
    },
    b2c_check: {
      method: 'POST',
      path: '/payments/check',
      titleKey: 'b2c_check',
      params: [
        { name: 'client_account_number', type: 'string',  kind: 'required', descPt: 'Número do destinatário', descEn: 'Recipient number' },
        { name: 'amount',                type: 'decimal', kind: 'required', descPt: 'Valor', descEn: 'Amount' },
        { name: 'store_account_number',  type: 'string',  kind: 'required', descPt: 'Conta BUSINESS', descEn: 'BUSINESS account' },
        { name: 'partner_transaction_id',type: 'string',  kind: 'required', descPt: 'ID único, 12 caracteres', descEn: 'Unique ID, 12 chars' },
        { name: 'payment_method',        type: 'enum',    kind: 'required', values: ['mpesa','emola','mkesh','imali'] },
        { name: 'transaction_type',      type: 'enum',    kind: 'fixed',    values: ['B2C'] },
      ],
      example: { client_account_number: '846002000', amount: '100.00', store_account_number: '290000002', partner_transaction_id: 'B2C25CHECKID1', payment_method: 'mpesa', transaction_type: 'B2C' },
      mockResponse: (b) => ({ data: { client_account_number: b.client_account_number, amount: b.amount, total: +(parseFloat(b.amount) * 1.0225).toFixed(3), fee: '0.0225', masked_name: currentEnv === 'sandbox' ? 'Indisponível' : 'A*** B***' } }),
    },
    b2c: {
      method: 'POST',
      path: '/payments',
      titleKey: 'b2c',
      params: [
        { name: 'client_account_number', type: 'string',  kind: 'required', descPt: 'Número do destinatário', descEn: 'Recipient number' },
        { name: 'amount',                type: 'decimal', kind: 'required', descPt: 'Valor', descEn: 'Amount' },
        { name: 'store_account_number',  type: 'string',  kind: 'required', descPt: 'Conta BUSINESS', descEn: 'BUSINESS account' },
        { name: 'partner_transaction_id',type: 'string',  kind: 'required', descPt: 'ID único, 12 caracteres', descEn: 'Unique ID, 12 chars' },
        { name: 'payment_method',        type: 'enum',    kind: 'required', values: ['mpesa','emola','mkesh','imali'] },
        { name: 'transaction_type',      type: 'enum',    kind: 'fixed',    values: ['B2C'] },
      ],
      example: { client_account_number: '846002000', amount: '100.00', store_account_number: '290000002', partner_transaction_id: 'B2C25TRANS001', payment_method: 'mpesa', transaction_type: 'B2C' },
      mockResponse: () => ({ code: 'IMS002', success: 'Created Successfully', type: 'IMS', message: currentLang === 'pt' ? 'Transferência feita com sucesso' : 'Success Transfer', messageLang: { pt: 'Transferência feita com sucesso', en: 'Success Transfer' } }),
    },
  };

  // ══════════════════════════════════════════════════════════
  // HELPERS
  // ══════════════════════════════════════════════════════════
  function rid(n = 12) {
    const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({length: n}, () => c[Math.floor(Math.random() * c.length)]).join('');
  }

  function randomToken() {
    return Math.random().toString(36).substr(2,8) + ':' +
           Math.random().toString(36).substr(2,24) + '...' +
           Math.random().toString(36).substr(2,8);
  }

  function fd(mins) {
    const d = new Date(Date.now() + mins * 60000);
    return d.toISOString().replace('T',' ').substr(0,19);
  }

  function now() {
    return new Date().toISOString().replace('T',' ').substr(0,19);
  }

  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function syntaxHL(json) {
    if (typeof json !== 'string') json = JSON.stringify(json, null, 2);
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, m => {
      let cls = 'hl-num';
      if (/^"/.test(m)) cls = /:$/.test(m) ? 'hl-key' : 'hl-str';
      else if (/true|false/.test(m)) cls = 'hl-bool';
      else if (/null/.test(m)) cls = 'hl-null';
      return `<span class="${cls}">${m}</span>`;
    });
  }

  function kindClass(k) {
    return { required: 'k-req', optional: 'k-opt', fixed: 'k-fix' }[k] || '';
  }

  // ══════════════════════════════════════════════════════════
  // COPY TEXT
  // ══════════════════════════════════════════════════════════
  function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = t('copied');
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1800);
    });
  }

  // ══════════════════════════════════════════════════════════
  // i18n UPDATE (percorre o DOM e actualiza textos)
  // ══════════════════════════════════════════════════════════
  function updateI18nElements() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (T[currentLang][key]) {
        el.textContent = T[currentLang][key];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (T[currentLang][key]) {
        el.innerHTML = T[currentLang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (T[currentLang][key]) {
        el.setAttribute('placeholder', T[currentLang][key]);
      }
    });

    // Actualiza badge do ambiente
    const badge = document.getElementById('envBadge');
    if (badge) badge.textContent = t(currentEnv === 'sandbox' ? 'sandbox_badge' : 'live_badge');
    const sbBadge = document.getElementById('sbEnvBadge');
    if (sbBadge) sbBadge.textContent = t(currentEnv === 'sandbox' ? 'sandbox_badge' : 'live_badge');
  }

  // ══════════════════════════════════════════════════════════
  // SANDBOX DYNAMIC FIELDS
  // ══════════════════════════════════════════════════════════
  function renderSandboxFields(epId) {
    const ep = ENDPOINTS[epId];
    if (!ep) return;
    const container = document.getElementById('sbDynamicFields');
    if (!container) return;

    let html = '';
    ep.params.forEach(p => {
      if (p.kind === 'fixed') return;
      const val = ep.example[p.name] || '';
      const desc = currentLang === 'pt' ? (p.descPt || '') : (p.descEn || '');

      if (p.type === 'enum' && p.values) {
        html += `<div class="form-group">
          <label>${p.name} <span class="p-kind ${kindClass(p.kind)}">${p.kind}</span></label>
          <select id="sb_${p.name}" data-param="${p.name}">
            ${p.values.map(v => `<option value="${v}"${v===val?' selected':''}>${v}</option>`).join('')}
          </select>
          <div class="field-hint">${esc(desc)}</div>
        </div>`;
      } else {
        html += `<div class="form-group">
          <label>${p.name} <span class="p-kind ${kindClass(p.kind)}">${p.kind}</span></label>
          <input id="sb_${p.name}" data-param="${p.name}" type="text" value="${esc(val)}" placeholder="${esc(desc)}">
          <div class="field-err" id="err_${p.name}"></div>
          <div class="field-hint">${esc(desc)}</div>
        </div>`;
      }
    });

    container.innerHTML = html;
  }

  function collectSandboxBody(epId) {
    const ep = ENDPOINTS[epId];
    const body = {};
    let valid = true;

    ep.params.forEach(p => {
      if (p.kind === 'fixed') {
        body[p.name] = p.values[0];
        return;
      }
      const el = document.getElementById(`sb_${p.name}`);
      const err = document.getElementById(`err_${p.name}`);
      if (err) err.textContent = '';
      if (!el) return;

      const val = el.value.trim();

      if (p.kind === 'required' && !val) {
        if (err) err.textContent = t('err_required');
        valid = false; return;
      }
      if (!val && p.kind === 'optional') return;

      if (p.name === 'partner_transaction_id' && val && val.length !== 12) {
        if (err) err.textContent = t('err_txn12');
        valid = false; return;
      }
      if (p.name === 'amount' && val && parseFloat(val) < 10) {
        if (err) err.textContent = t('err_amount');
        valid = false; return;
      }

      body[p.name] = val;
    });

    return valid ? body : null;
  }

  // ══════════════════════════════════════════════════════════
  // COPY BUTTONS (inline code panels e blocos de código)
  // ══════════════════════════════════════════════════════════
  function setupCopyButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.copy-btn');
      if (!btn) return;

      // Grupo de tabs do painel inline de código
      if (btn.hasAttribute('data-copy-group')) {
        const group = btn.getAttribute('data-copy-group');
        const panel = document.querySelector(`.code-panel-inline[data-section="${group}"]`);
        if (panel) {
          const activeTab = panel.querySelector('.code-tab.active');
          if (activeTab) {
            const lang = activeTab.dataset.lang;
            const body = panel.querySelector(`.code-body[data-lang="${lang}"]`);
            if (body) {
              const code = body.querySelector('pre code')?.textContent || '';
              copyText(code, btn);
              return;
            }
          }
        }
        // Fallback: copiar todo o conteúdo visível do primeiro código
        const firstBody = panel?.querySelector('.code-body:not([style*="display:none"]) pre code');
        if (firstBody) {
          copyText(firstBody.textContent, btn);
          return;
        }
      }

      // Endpoint banner copy
      if (btn.classList.contains('ep-copy-btn')) {
        const text = btn.dataset.copyText || btn.parentElement.querySelector('.ep-url')?.textContent || '';
        copyText(text, btn);
        return;
      }

      // Blocos de código estáticos (ex: auth, webhook)
      const codeBlock = btn.closest('.code-block');
      if (codeBlock) {
        const code = codeBlock.querySelector('pre code')?.textContent || '';
        copyText(code, btn);
        return;
      }

      // Copy no sandbox
      if (btn.id === 'sbCopyResp') {
        const respText = document.getElementById('sbRespBody')?.querySelector('pre code')?.textContent || '';
        copyText(respText, btn);
        return;
      }
    });
  }

  // ══════════════════════════════════════════════════════════
  // SANDBOX LOGIC
  // ══════════════════════════════════════════════════════════
  function setupSandbox() {
    const epSel  = document.getElementById('sbEndpoint');
    const runBtn = document.getElementById('sbRunBtn');
    if (!epSel || !runBtn) return;

    renderSandboxFields(epSel.value);

    epSel.addEventListener('change', () => renderSandboxFields(epSel.value));

    // Toggle password visibility
    const eyeBtn = document.getElementById('sbTokenEye');
    const tokenInput = document.getElementById('sbToken');
    if (eyeBtn && tokenInput) {
      eyeBtn.addEventListener('click', () => {
        tokenInput.type = tokenInput.type === 'password' ? 'text' : 'password';
        eyeBtn.classList.toggle('active');
      });
    }

    // Response tabs
    document.querySelectorAll('[data-resp-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('[data-resp-tab]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const isHeaders = tab.dataset.respTab === 'headers';
        document.getElementById('sbRespBody').style.display    = isHeaders ? 'none' : '';
        document.getElementById('sbRespHeaders').style.display = isHeaders ? '' : 'none';
      });
    });

    runBtn.addEventListener('click', async () => {
      const epId = epSel.value;
      const tokenEl   = document.getElementById('sbToken');
      const clientEl  = document.getElementById('sbClientId');
      const tokenErr  = document.getElementById('sbTokenErr');
      const clientErr = document.getElementById('sbClientErr');

      tokenErr.textContent = '';
      clientErr.textContent = '';

      let valid = true;
      if (!tokenEl.value.trim())  { tokenErr.textContent  = t('err_token');  valid = false; }
      if (!clientEl.value.trim()) { clientErr.textContent = t('err_client'); valid = false; }
      if (!valid) return;

      const body = collectSandboxBody(epId);
      if (!body) return;

      const btnSpan = runBtn.querySelector('span');
      btnSpan.textContent = t('sending');
      runBtn.disabled = true;
      runBtn.classList.add('loading');

      const t0 = Date.now();
      const delay = 500 + Math.random() * 700;
      await new Promise(r => setTimeout(r, delay));
      const elapsed = Date.now() - t0;

      const ep = ENDPOINTS[epId];
      const mock = ep.mockResponse(body);
      const jsonStr = JSON.stringify(mock, null, 2);

      const respEl    = document.getElementById('sbRespBody');
      const statusEl  = document.getElementById('sbStatus');
      const copyResp  = document.getElementById('sbCopyResp');
      const respTabs  = document.getElementById('sbRespTabs');
      const footer    = document.getElementById('sbTermFooter');
      const timing    = document.getElementById('sbTiming');

      respEl.innerHTML = `<pre><code>${syntaxHL(esc(jsonStr))}</code></pre>`;
      respEl.style.display = '';
      document.getElementById('sbRespHeaders').style.display = 'none';

      statusEl.textContent = '200 OK';
      statusEl.className = 'resp-status ok';

      if (respTabs) respTabs.style.display = '';
      if (footer)   footer.style.display   = '';
      if (timing)   timing.textContent     = `${elapsed}ms`;

      copyResp.style.display = '';
      copyResp.onclick = null; // removemos handler antigo para evitar múltiplos, o global setup de copy vai capturar

      // Reset response tabs to body
      document.querySelectorAll('[data-resp-tab]').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.respTab === 'body');
      });

      btnSpan.textContent = t('send');
      runBtn.disabled = false;
      runBtn.classList.remove('loading');
    });
  }

  // ══════════════════════════════════════════════════════════
  // SEARCH
  // ══════════════════════════════════════════════════════════
  function setupSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    input.placeholder = t('search_ph');

    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      document.querySelectorAll('#sidebar [data-nav]').forEach(link => {
        const text = link.textContent.toLowerCase();
        link.style.display = (!q || text.includes(q)) ? '' : 'none';
      });
      // Esconder group labels se não houver links visíveis
      document.querySelectorAll('.sb-group-label').forEach(label => {
        const section = label.nextElementSibling;
        let hasVisible = false;
        let sibling = section;
        while (sibling && !sibling.classList.contains('sb-group-label')) {
          if (sibling.style.display !== 'none') hasVisible = true;
          sibling = sibling.nextElementSibling;
        }
        label.style.display = (q && !hasVisible) ? 'none' : '';
      });
    });

    // ⌘K / Ctrl+K focus
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  // ══════════════════════════════════════════════════════════
  // THEME
  // ══════════════════════════════════════════════════════════
  function setupTheme() {
    const saved = localStorage.getItem('imali_theme') || 'dark';
    setTheme(saved);

    ['themeToggle','themeToggleLight'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', () => {
        const curr = document.documentElement.getAttribute('data-theme');
        setTheme(curr === 'dark' ? 'light' : 'dark');
      });
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('imali_theme', theme);
    const dark  = document.getElementById('themeToggle');
    const light = document.getElementById('themeToggleLight');
    if (dark)  dark.style.display  = theme === 'dark'  ? '' : 'none';
    if (light) light.style.display = theme === 'light' ? '' : 'none';
  }

  // ══════════════════════════════════════════════════════════
  // ENV TOGGLE
  // ══════════════════════════════════════════════════════════
  function setupEnv() {
    document.querySelectorAll('.env-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentEnv = btn.dataset.env;
        document.querySelectorAll('.env-btn').forEach(b => b.classList.toggle('active', b.dataset.env === currentEnv));
        updateI18nElements(); // actualiza badges
      });
    });
  }

  // ══════════════════════════════════════════════════════════
  // LANG TOGGLE
  // ══════════════════════════════════════════════════════════
  function setupLang() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentLang = btn.dataset.lang;
        localStorage.setItem('imali_lang', currentLang);
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
        updateI18nElements();
        // Se o sandbox estiver activo, recria os campos dinâmicos
        if (document.getElementById('sandbox') && isSectionInViewport('sandbox')) {
          const epSel = document.getElementById('sbEndpoint');
          if (epSel) renderSandboxFields(epSel.value);
        }
        // Actualiza placeholder da pesquisa
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.placeholder = t('search_ph');
      });
    });
  }

  function isSectionInViewport(id) {
    const el = document.getElementById(id);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  // ══════════════════════════════════════════════════════════
  // SCROLL SPY (actualiza active no sidebar)
  // ══════════════════════════════════════════════════════════
  function setupScrollSpy() {
    const sections = document.querySelectorAll('.doc-section');
    const navLinks = document.querySelectorAll('#sidebar [data-nav]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.nav === id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -80% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
  }

  // ══════════════════════════════════════════════════════════
  // TROCA DO PAINEL DE CÓDIGO (fade in/out ao encadear secções)
  // ══════════════════════════════════════════════════════════
  function setupCodePanelSwap() {
    const codeSections = document.querySelectorAll('.doc-section.has-code');
    if (!codeSections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const panel = entry.target.querySelector('.code-panel-inline');
        if (panel) panel.classList.toggle('is-active', entry.isIntersecting);
      });
    }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });

    codeSections.forEach(section => observer.observe(section));
  }

  // ══════════════════════════════════════════════════════════
  // SIDEBAR TOGGLE (mobile: mostra overlay · desktop: colapsa coluna)
  // ══════════════════════════════════════════════════════════
  function setupMobile() {
    const toggle = document.getElementById('menuToggle');
    const sb = document.getElementById('sidebar');
    const layout = document.querySelector('.layout');
    if (toggle && sb) {
      toggle.addEventListener('click', () => {
        sb.classList.toggle('open');               // mobile: desliza para dentro
        layout?.classList.toggle('sidebar-collapsed'); // desktop: colapsa a coluna
        toggle.classList.toggle('active');
      });
      document.getElementById('mainContent')?.addEventListener('click', (e) => {
        if (!e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) {
          sb.classList.remove('open');
        }
      });
    }
  }

  // A sidebar deve começar sempre aberta (não persiste estado colapsado entre
  // carregamentos, incluindo restauro via bfcache ao usar o botão "Voltar").
  function resetSidebarOpen() {
    document.querySelector('.layout')?.classList.remove('sidebar-collapsed');
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('menuToggle')?.classList.remove('active');
  }

  // ══════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    resetSidebarOpen();
    setupTheme();
    setupLang();
    setupEnv();
    setupSearch();
    setupCopyButtons();
    setupMobile();
    setupScrollSpy();
    setupCodePanelSwap();

    // Activar o sandbox se houver, mas apenas se a secção existir
    if (document.getElementById('sandbox')) {
      setupSandbox();
    }

    // Marcar o link activo inicial com base na hash
    const hash = window.location.hash.slice(1);
    if (hash) {
      const activeLink = document.querySelector(`#sidebar [data-nav="${hash}"]`);
      if (activeLink) activeLink.classList.add('active');
    }

    updateI18nElements();
  });

  // Cobre o caso de a página ser restaurada da bfcache (ex: botão "Voltar"),
  // que não dispara DOMContentLoaded de novo.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) resetSidebarOpen();
  });

})();