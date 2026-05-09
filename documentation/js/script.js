// ============================================================
// iMaliPay API Reference — script.js v2.0
// Baseado na documentação oficial Paytek iMaliPay Gateway API v1.4
// Sem NFC. Conteúdo 100% gerado dinamicamente.
// ============================================================

(function () {
  'use strict';

  // ──────────────────────────────────────────────────────────
  // CONFIG
  // ──────────────────────────────────────────────────────────
  const BASE_URL = 'https://paytek-africa.net:11901/api/partners/imaliway/v2';

  // ──────────────────────────────────────────────────────────
  // STATE
  // ──────────────────────────────────────────────────────────
  let currentLang = localStorage.getItem('imali_lang') || 'pt';
  let currentEnv  = 'sandbox';
  let currentSection = 'intro';

  // ──────────────────────────────────────────────────────────
  // i18n
  // ──────────────────────────────────────────────────────────
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
      // sidebar labels
      lbl_intro: 'Introdução',
      lbl_auth: 'Autenticação',
      lbl_codes: 'Códigos de Resposta',
      lbl_payments: 'Pagamentos',
      lbl_transfers: 'Transferências',
      lbl_webhooks: 'Webhooks',
      lbl_sandbox: 'API Sandbox',
      // methods
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
    }
  };

  function t(key) { return T[currentLang][key] || key; }

  // ──────────────────────────────────────────────────────────
  // API ENDPOINTS DEFINITION (baseado na doc oficial)
  // ──────────────────────────────────────────────────────────
  const ENDPOINTS = {
    push: {
      method: 'POST',
      path: '/payments',
      titleKey: 'push',
      descPt: 'Cria uma transação de pagamento Push (C2B) para qualquer método disponível no gateway: M-Pesa, e-Mola, mKesh ou conta digital iMali. O cliente recebe uma notificação push no seu telemóvel para confirmar o pagamento.',
      descEn: 'Creates a Push payment (C2B) transaction for any gateway method: M-Pesa, e-Mola, mKesh, or iMali digital account. The customer receives a push notification on their mobile to confirm payment.',
      params: [
        { name: 'client_account_number', type: 'string',  kind: 'required', descPt: 'Número de telefone da carteira (M-Pesa: 84xxxxxxx) ou conta iMali (9 dígitos)', descEn: 'Mobile wallet number (M-Pesa: 84xxxxxxx) or iMali account number (9 digits)' },
        { name: 'amount',                type: 'decimal', kind: 'required', descPt: 'Valor a pagar. Mínimo 10 MT. Ex: 1000.00', descEn: 'Amount to pay. Minimum 10 MT. Ex: 1000.00' },
        { name: 'store_account_number',  type: 'string',  kind: 'required', descPt: 'Número da conta iMali da loja (conta STORE, 9 dígitos)', descEn: 'iMali store account number (STORE account, 9 digits)' },
        { name: 'partner_transaction_id',type: 'string',  kind: 'required', descPt: 'ID único da transação gerado pelo parceiro. Exatamente 12 caracteres alfanuméricos. Ex: MPS25KLHLIKA', descEn: 'Unique transaction ID generated by partner. Exactly 12 alphanumeric chars. Ex: MPS25KLHLIKA' },
        { name: 'payment_method',        type: 'enum',    kind: 'required', values: ['mpesa','emola','mkesh','imali'], descPt: 'Método de pagamento em minúsculas', descEn: 'Payment method in lowercase' },
        { name: 'payment_type',          type: 'enum',    kind: 'fixed',    values: ['push'], descPt: 'Fixo: "push"', descEn: 'Fixed: "push"' },
        { name: 'transaction_type',      type: 'enum',    kind: 'fixed',    values: ['C2B'],  descPt: 'Fixo: "C2B"', descEn: 'Fixed: "C2B"' },
        { name: 'expiration_datetime',   type: 'string',  kind: 'optional', descPt: 'Data/hora de expiração. Formato: Y-m-d H:i:s. Padrão: 2 minutos', descEn: 'Expiry datetime. Format: Y-m-d H:i:s. Default: 2 minutes' },
      ],
      example: { client_account_number: '842592349', amount: '1000.00', store_account_number: '290000001', partner_transaction_id: 'MPS25KLHLIKA', payment_method: 'mpesa', payment_type: 'push', transaction_type: 'C2B' },
      responsePt: 'Retorna a transação criada com status PENDING. Polling via Check Status ou aguardar Webhook.',
      responseEn: 'Returns the created transaction with PENDING status. Poll via Check Status or wait for Webhook.',
      mockResponse: (b) => ({ data: { transaction_id: 'MPS' + rid(9), partner_transaction_id: b.partner_transaction_id || '', amount: b.amount, expiration_datetime: fd(2), status: 'PENDING' } }),
    },

    link: {
      method: 'POST',
      path: '/payments',
      titleKey: 'link',
      descPt: 'Gera um link de pagamento e envia via SMS para o cliente. O link redireciona para a página web do gateway, onde o cliente escolhe o método de pagamento. Suporta tipos DIRECT, RECURRING e DONATION.',
      descEn: 'Generates a payment link and sends it via SMS to the customer. The link redirects to the gateway web page, where the customer chooses the payment method. Supports DIRECT, RECURRING and DONATION types.',
      params: [
        { name: 'title',                 type: 'string',  kind: 'required', descPt: 'Título do link de pagamento', descEn: 'Payment link title' },
        { name: 'short_description',     type: 'string',  kind: 'required', descPt: 'Descrição breve do link', descEn: 'Brief link description' },
        { name: 'amount',                type: 'decimal', kind: 'required', descPt: 'Valor a pagar', descEn: 'Amount to pay' },
        { name: 'type',                  type: 'enum',    kind: 'required', values: ['DIRECT','RECURRING','DONATION'], descPt: 'Tipo de link', descEn: 'Link type' },
        { name: 'store_account_number',  type: 'string',  kind: 'required', descPt: 'Número da conta STORE iMali', descEn: 'iMali STORE account number' },
        { name: 'customer_link_id',      type: 'string',  kind: 'required', descPt: 'ID personalizado do link (deve ser único)', descEn: 'Custom link ID (must be unique)' },
        { name: 'send_to_phone',         type: 'string',  kind: 'required', descPt: 'Número de telefone para enviar o link via SMS', descEn: 'Phone number to send the SMS link' },
        { name: 'partner_transaction_id',type: 'string',  kind: 'required', descPt: 'ID único da transação. Exatamente 12 caracteres', descEn: 'Unique transaction ID. Exactly 12 characters' },
        { name: 'payment_method',        type: 'enum',    kind: 'fixed',    values: ['imali'], descPt: 'Fixo: "imali"', descEn: 'Fixed: "imali"' },
        { name: 'payment_type',          type: 'enum',    kind: 'fixed',    values: ['link'],  descPt: 'Fixo: "link"', descEn: 'Fixed: "link"' },
        { name: 'transaction_type',      type: 'enum',    kind: 'fixed',    values: ['C2B'],   descPt: 'Fixo: "C2B"', descEn: 'Fixed: "C2B"' },
        { name: 'expiration_datetime',   type: 'string',  kind: 'optional', descPt: 'Data/hora de expiração. Formato: Y-m-d H:i:s', descEn: 'Expiry datetime. Format: Y-m-d H:i:s' },
        { name: 'thumbnail_image',       type: 'string',  kind: 'optional', descPt: 'URL da imagem associada ao link', descEn: 'URL of image associated with the link' },
        { name: 'payment_frequence',     type: 'enum',    kind: 'optional', values: ['DAILY','WEEKLY','MONTHLY','YEARLY'], descPt: 'Frequência de pagamento (apenas RECURRING)', descEn: 'Payment frequency (RECURRING only)' },
      ],
      example: { title: 'Pagamento de Serviços', short_description: 'PAY BY LINK', amount: '500.00', type: 'DIRECT', store_account_number: '290000001', customer_link_id: 'LINK_PARTNER_001', send_to_phone: '846002000', partner_transaction_id: 'SJM5LYOVU5GJ', payment_method: 'imali', payment_type: 'link', transaction_type: 'C2B' },
      responsePt: 'Retorna os detalhes do link criado incluindo customer_link_id (URL partilhável), imali_fee e amount_to_credit.',
      responseEn: 'Returns link details including customer_link_id (shareable URL), imali_fee and amount_to_credit.',
      mockResponse: (b) => ({ data: { link_id: rid(12), customer_link_id: `https://pay.imali.co.mz/l/${b.customer_link_id || rid(8)}`, partner_transaction_id: b.partner_transaction_id, send_to_phone: b.send_to_phone, title: b.title, amount: b.amount, imali_fee: +(parseFloat(b.amount) * 0.01).toFixed(2), amount_to_credit: +(parseFloat(b.amount) * 0.99).toFixed(2), short_description: b.short_description, type: b.type, status: 'PENDING', store_id: 290, business_account_id: 122, expiration_datetime: fd(1440), created_at: now(), updated_at: now(), id: 47 } }),
    },

    qrcode: {
      method: 'POST',
      path: '/payments',
      titleKey: 'qrcode',
      descPt: 'Gera um QR Code dinâmico para pagamento com conta iMali. DYNAMIC_TERMINAL: valor variável, validade de 2 minutos (sem título/descrição). DYNAMIC_TICKET: valor fixo, expiração e título/descrição obrigatórios, sem refresh.',
      descEn: 'Generates a dynamic QR Code for iMali account payment. DYNAMIC_TERMINAL: variable amount, 2 min validity (no title/description). DYNAMIC_TICKET: fixed amount, expiration and title/description required, no refresh.',
      params: [
        { name: 'store_account_number',  type: 'string',  kind: 'required', descPt: 'Número da conta STORE iMali', descEn: 'iMali STORE account number' },
        { name: 'amount',                type: 'decimal', kind: 'required', descPt: 'Valor a pagar', descEn: 'Amount to pay' },
        { name: 'partner_transaction_id',type: 'string',  kind: 'required', descPt: 'ID único da transação. Exatamente 12 caracteres', descEn: 'Unique transaction ID. Exactly 12 characters' },
        { name: 'payment_method',        type: 'enum',    kind: 'fixed',    values: ['imali'],  descPt: 'Fixo: "imali"', descEn: 'Fixed: "imali"' },
        { name: 'payment_type',          type: 'enum',    kind: 'fixed',    values: ['qrcode'], descPt: 'Fixo: "qrcode"', descEn: 'Fixed: "qrcode"' },
        { name: 'qrcode_type',           type: 'enum',    kind: 'required', values: ['DYNAMIC_TERMINAL','DYNAMIC_TICKET'], descPt: 'DYNAMIC_TERMINAL: valor variável, 2 min. DYNAMIC_TICKET: valor fixo, requer expiração/título/descrição', descEn: 'DYNAMIC_TERMINAL: variable amount, 2 min. DYNAMIC_TICKET: fixed amount, requires expiry/title/description' },
        { name: 'transaction_type',      type: 'enum',    kind: 'fixed',    values: ['C2B'],    descPt: 'Fixo: "C2B"', descEn: 'Fixed: "C2B"' },
        { name: 'title',                 type: 'string',  kind: 'optional', descPt: 'Título (obrigatório para DYNAMIC_TICKET, proibido para DYNAMIC_TERMINAL)', descEn: 'Title (required for DYNAMIC_TICKET, forbidden for DYNAMIC_TERMINAL)' },
        { name: 'description',           type: 'string',  kind: 'optional', descPt: 'Descrição (obrigatório para DYNAMIC_TICKET, proibido para DYNAMIC_TERMINAL)', descEn: 'Description (required for DYNAMIC_TICKET, forbidden for DYNAMIC_TERMINAL)' },
        { name: 'expiration_datetime',   type: 'string',  kind: 'optional', descPt: 'Data/hora de expiração (obrigatório para DYNAMIC_TICKET, proibido para DYNAMIC_TERMINAL)', descEn: 'Expiry datetime (required for DYNAMIC_TICKET, forbidden for DYNAMIC_TERMINAL)' },
      ],
      example: { store_account_number: '290000001', amount: '400.00', partner_transaction_id: 'FJNGMQWLXCP3', payment_method: 'imali', payment_type: 'qrcode', qrcode_type: 'DYNAMIC_TERMINAL', transaction_type: 'C2B' },
      responsePt: 'Retorna qrcode_id, qrcode_token (para refresh/status) e qrcode_image (base64 PNG para exibição).',
      responseEn: 'Returns qrcode_id, qrcode_token (for refresh/status) and qrcode_image (base64 PNG for display).',
      mockResponse: (b) => {
        const isTerminal = b.qrcode_type === 'DYNAMIC_TERMINAL';
        return { data: { qrcode_id: crypto.randomUUID ? crypto.randomUUID() : rid(36), partner_transaction_id: b.partner_transaction_id, expiration_datetime: isTerminal ? fd(2) : (b.expiration_datetime || fd(1440)), amount: b.amount, qrcode_type: b.qrcode_type || 'DYNAMIC_TERMINAL', status: 'PENDING' }, qrcode_token: randomToken(), qrcode_image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' };
      },
    },

    status: {
      method: 'GET',
      path: '/payments/status',
      titleKey: 'status',
      descPt: 'Verifica o estado de uma transação gerada via Push, Link ou QR Code. Para Push/Link usar partner_transaction_id. Para QR Code usar qrcode_token. Retorna PENDING, SUCCESS, FAILED ou EXPIRED.',
      descEn: 'Checks the status of a transaction generated via Push, Link, or QR Code. For Push/Link use partner_transaction_id. For QR Code use qrcode_token. Returns PENDING, SUCCESS, FAILED or EXPIRED.',
      params: [
        { name: 'payment_type',          type: 'enum',   kind: 'required', values: ['push','link','qrcode'], descPt: 'Tipo de pagamento', descEn: 'Payment type' },
        { name: 'partner_transaction_id',type: 'string', kind: 'optional', descPt: 'ID da transação (para push e link)', descEn: 'Transaction ID (for push and link)' },
        { name: 'qrcode_token',          type: 'string', kind: 'optional', descPt: 'Token do QR Code (apenas para qrcode)', descEn: 'QR Code token (qrcode only)' },
      ],
      example: { partner_transaction_id: 'MPS25KLHLIKA', payment_type: 'push' },
      responsePt: 'Retorna status (PENDING / SUCCESS / FAILED / EXPIRED) e left_time (tempo restante em mm:ss).',
      responseEn: 'Returns status (PENDING / SUCCESS / FAILED / EXPIRED) and left_time (remaining time mm:ss).',
      mockResponse: () => {
        const s = ['PENDING','SUCCESS','FAILED','EXPIRED'][Math.floor(Math.random() * 4)];
        return { data: { status: s, left_time: s === 'PENDING' ? '1:45' : s === 'SUCCESS' ? '0:22' : '0' } };
      },
    },

    refresh: {
      method: 'POST',
      path: '/payments/qrcode/refresh',
      titleKey: 'refresh',
      descPt: 'Atualiza a validade de um QR Code DYNAMIC_TERMINAL expirado. Estende a validade por mais 2 minutos e altera o status para PENDING. Não disponível para DYNAMIC_TICKET.',
      descEn: 'Updates the validity of an expired DYNAMIC_TERMINAL QR Code. Extends validity by an additional 2 minutes and changes status to PENDING. Not available for DYNAMIC_TICKET.',
      params: [
        { name: 'qrcode_token', type: 'string', kind: 'required', descPt: 'Token do QR Code obtido na criação', descEn: 'QR Code token obtained at creation' },
      ],
      example: { qrcode_token: 'a7c6a:fcc8ee9ceb82cb28...a37d0c8f9dfbf495ce05ff' },
      responsePt: 'Retorna os dados atualizados do QR Code com novo token e imagem, status: PENDING.',
      responseEn: 'Returns updated QR Code data with new token and image, status: PENDING.',
      mockResponse: () => ({ data: { qrcode_id: crypto.randomUUID ? crypto.randomUUID() : rid(36), partner_transaction_id: rid(12), expiration_datetime: fd(2), amount: '400.00', qrcode_type: 'DYNAMIC_TERMINAL', status: 'PENDING' }, qrcode_token: randomToken(), qrcode_image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' }),
    },

    b2c_check: {
      method: 'POST',
      path: '/payments/check',
      titleKey: 'b2c_check',
      descPt: 'Verifica as taxas que serão cobradas numa transferência B2C antes de a executar. Retorna fee, total e nome mascarado do destinatário. No ambiente Sandbox, masked_name retorna "Indisponível".',
      descEn: 'Verifies the fees that will be charged on a B2C transfer before executing it. Returns fee, total and masked recipient name. In Sandbox, masked_name returns "Indisponível".',
      params: [
        { name: 'client_account_number', type: 'string',  kind: 'required', descPt: 'Número de telefone ou conta iMali do destinatário', descEn: 'Recipient phone number or iMali account' },
        { name: 'amount',                type: 'decimal', kind: 'required', descPt: 'Valor a transferir (decimal, ex: 100.00)', descEn: 'Amount to transfer (decimal, ex: 100.00)' },
        { name: 'store_account_number',  type: 'string',  kind: 'required', descPt: 'Número da conta BUSINESS (não Store) de onde sai o dinheiro', descEn: 'BUSINESS account number (not Store) from which money is sent' },
        { name: 'partner_transaction_id',type: 'string',  kind: 'required', descPt: 'ID único da transação. Exatamente 12 caracteres', descEn: 'Unique transaction ID. Exactly 12 characters' },
        { name: 'payment_method',        type: 'enum',    kind: 'required', values: ['mpesa','emola','mkesh','imali'], descPt: 'Método de pagamento em minúsculas', descEn: 'Payment method in lowercase' },
        { name: 'transaction_type',      type: 'enum',    kind: 'fixed',    values: ['B2C'], descPt: 'Fixo: "B2C"', descEn: 'Fixed: "B2C"' },
      ],
      example: { client_account_number: '846002000', amount: '100.00', store_account_number: '290000002', partner_transaction_id: 'B2C25CHECKID1', payment_method: 'mpesa', transaction_type: 'B2C' },
      responsePt: 'Retorna o cálculo das taxas: amount, fee (2.25%), total e masked_name do destinatário.',
      responseEn: 'Returns fee calculation: amount, fee (2.25%), total and recipient masked_name.',
      mockResponse: (b) => ({ data: { client_account_number: b.client_account_number, amount: b.amount, total: +(parseFloat(b.amount) * 1.0225).toFixed(3), fee: '0.0225', masked_name: currentEnv === 'sandbox' ? 'Indisponível' : 'A*** B***' } }),
    },

    b2c: {
      method: 'POST',
      path: '/payments',
      titleKey: 'b2c',
      descPt: 'Executa uma transferência B2C (Business-to-Customer). Utiliza os mesmos parâmetros do método B2C Check. A conta store_account_number deve ser a conta BUSINESS (não Store).',
      descEn: 'Executes a B2C (Business-to-Customer) transfer. Uses the same parameters as B2C Check. The store_account_number must be the BUSINESS account (not Store).',
      params: [
        { name: 'client_account_number', type: 'string',  kind: 'required', descPt: 'Número de telefone ou conta iMali do destinatário', descEn: 'Recipient phone number or iMali account' },
        { name: 'amount',                type: 'decimal', kind: 'required', descPt: 'Valor a transferir (decimal, ex: 100.00)', descEn: 'Amount to transfer (decimal, ex: 100.00)' },
        { name: 'store_account_number',  type: 'string',  kind: 'required', descPt: 'Número da conta BUSINESS (não Store)', descEn: 'BUSINESS account number (not Store)' },
        { name: 'partner_transaction_id',type: 'string',  kind: 'required', descPt: 'ID único da transação. Exatamente 12 caracteres', descEn: 'Unique transaction ID. Exactly 12 characters' },
        { name: 'payment_method',        type: 'enum',    kind: 'required', values: ['mpesa','emola','mkesh','imali'], descPt: 'Método de pagamento em minúsculas', descEn: 'Payment method in lowercase' },
        { name: 'transaction_type',      type: 'enum',    kind: 'fixed',    values: ['B2C'], descPt: 'Fixo: "B2C"', descEn: 'Fixed: "B2C"' },
      ],
      example: { client_account_number: '846002000', amount: '100.00', store_account_number: '290000002', partner_transaction_id: 'B2C25TRANS001', payment_method: 'mpesa', transaction_type: 'B2C' },
      responsePt: 'Retorna código IMS002 de sucesso. Acompanhe o estado via Check Status.',
      responseEn: 'Returns success code IMS002. Track status via Check Status.',
      mockResponse: () => ({ code: 'IMS002', success: 'Created Successfully', type: 'IMS', message: currentLang === 'pt' ? 'Transferência feita com sucesso' : 'Success Transfer', messageLang: { pt: 'Transferência feita com sucesso', en: 'Success Transfer' } }),
    },
  };

  // ──────────────────────────────────────────────────────────
  // NAVIGATION STRUCTURE
  // ──────────────────────────────────────────────────────────
  const NAV = [
    { group: 'lbl_intro', sections: [
      { id: 'intro',    labelKey: 'lbl_intro',   icon: '' },
      { id: 'auth',     labelKey: 'lbl_auth',    icon: '' },
      { id: 'codes',    labelKey: 'lbl_codes',   icon: '' },
    ]},
    { group: 'lbl_payments', sections: [
      { id: 'push',     method: 'POST', labelKey: 'push' },
      { id: 'link',     method: 'POST', labelKey: 'link' },
      { id: 'qrcode',   method: 'POST', labelKey: 'qrcode' },
      { id: 'status',   method: 'GET',  labelKey: 'status' },
      { id: 'refresh',  method: 'POST', labelKey: 'refresh' },
    ]},
    { group: 'lbl_transfers', sections: [
      { id: 'b2c_check',method: 'POST', labelKey: 'b2c_check' },
      { id: 'b2c',      method: 'POST', labelKey: 'b2c' },
    ]},
    { group: 'lbl_webhooks', sections: [
      { id: 'webhooks',         labelKey: 'webhooks' },
      { id: 'webhook-security', labelKey: 'webhook-security' },
    ]},
    { group: '', sections: [
      { id: 'sandbox',  isSandbox: true, labelKey: 'sandbox' },
    ]},
  ];

  // ──────────────────────────────────────────────────────────
  // HELPERS
  // ──────────────────────────────────────────────────────────
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

  function methodClass(m) {
    return { POST: 'm-post', GET: 'm-get', PUT: 'm-put', DELETE: 'm-del' }[m] || '';
  }

  function kindClass(k) {
    return { required: 'k-req', optional: 'k-opt', fixed: 'k-fix' }[k] || '';
  }

  function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = t('copied');
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1800);
    });
  }

  // ──────────────────────────────────────────────────────────
  // SIDEBAR RENDER
  // ──────────────────────────────────────────────────────────
  function renderSidebar() {
    const sb = document.getElementById('sidebar');
    if (!sb) return;

    let html = '';
    NAV.forEach(group => {
      if (group.group) {
        html += `<div class="sb-group-label">${t(group.group)}</div>`;
      }
      group.sections.forEach(sec => {
        if (sec.isSandbox) {
          html += `<button class="sb-sandbox-btn${currentSection === sec.id ? ' active' : ''}" data-section="${sec.id}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            ${t(sec.labelKey)}
          </button>`;
        } else {
          html += `<button class="sb-link${currentSection === sec.id ? ' active' : ''}" data-section="${sec.id}">`;
          if (sec.method) html += `<span class="sb-method ${methodClass(sec.method)}">${sec.method}</span>`;
          html += `<span>${t(sec.labelKey)}</span></button>`;
        }
      });
    });

    sb.innerHTML = html;

    sb.querySelectorAll('[data-section]').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.section));
    });
  }

  // ──────────────────────────────────────────────────────────
  // SECTION RENDERERS
  // ──────────────────────────────────────────────────────────
  function renderIntro() {
    return `
      <div class="section-tag">${t('overview_tag')}</div>
      <h1 class="section-h">iMaliPay Gateway API</h1>
      <p class="section-p">${currentLang === 'pt'
        ? 'A API iMaliPay é organizada em torno de REST. Aceita corpos de pedido em JSON, devolve respostas em JSON e utiliza códigos de resposta HTTP padrão. Integre pagamentos M-Pesa, e-Mola, mKesh e iMali na sua aplicação em minutos.'
        : 'The iMaliPay API is organized around REST. It accepts JSON request bodies, returns JSON responses, and uses standard HTTP codes. Integrate M-Pesa, e-Mola, mKesh and iMali payments into your application in minutes.'}</p>

      <div class="base-url-block">
        <span class="bub-label">Base URL</span>
        <span class="bub-url">${esc(BASE_URL)}</span>
        <span class="env-badge" id="envBadge">${t('sandbox_badge')}</span>
      </div>

      <div class="alert alert-info">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <div>${currentLang === 'pt'
          ? 'Todos os pedidos requerem <code>Authorization: Bearer &lt;token&gt;</code> e <code>X-Client-ID</code> únicos. Contacte <strong>partner@paytekafrica.com</strong> para obter credenciais.'
          : 'All requests require <code>Authorization: Bearer &lt;token&gt;</code> and a unique <code>X-Client-ID</code>. Contact <strong>partner@paytekafrica.com</strong> to get credentials.'}</div>
      </div>

      <h3 class="sub-h">${currentLang === 'pt' ? 'Métodos de Pagamento Disponíveis' : 'Available Payment Methods'}</h3>
      <div class="methods-row">
        <div class="method-chip"><span class="chip-dot mpesa"></span>M-Pesa</div>
        <div class="method-chip"><span class="chip-dot emola"></span>e-Mola</div>
        <div class="method-chip"><span class="chip-dot mkesh"></span>mKesh</div>
        <div class="method-chip"><span class="chip-dot imali"></span>iMali</div>
      </div>

      <h3 class="sub-h">${currentLang === 'pt' ? 'Fluxos de Pagamento' : 'Payment Flows'}</h3>
      <div class="flow-cards">
        <div class="flow-card">
          <div class="flow-num">01</div>
          <div class="flow-title">Push Payment</div>
          <div class="flow-desc">${currentLang === 'pt' ? 'Cria uma transação e envia notificação push ao cliente para confirmar.' : 'Creates a transaction and sends a push notification to the customer to confirm.'}</div>
        </div>
        <div class="flow-card">
          <div class="flow-num">02</div>
          <div class="flow-title">Pay-By-Link</div>
          <div class="flow-desc">${currentLang === 'pt' ? 'Gera link e envia SMS. Cliente escolhe método ao clicar.' : 'Generates link and sends SMS. Customer picks method on click.'}</div>
        </div>
        <div class="flow-card">
          <div class="flow-num">03</div>
          <div class="flow-title">QR Code</div>
          <div class="flow-desc">${currentLang === 'pt' ? 'Gera QR Code dinâmico para pagamento com conta iMali.' : 'Generates dynamic QR Code for payment with iMali account.'}</div>
        </div>
      </div>
    `;
  }

  function renderAuth() {
    const phpEx = `$api_key   = 'your_api_key_here';
$publicKey = '-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ...
-----END PUBLIC KEY-----';

// Encrypt with RSA-ES-PKCS1
openssl_public_encrypt($api_key, $encrypted, $publicKey, OPENSSL_PKCS1_PADDING);
$privateKey = base64_encode($encrypted);

// Use in every request
$headers = [
    'Authorization: Bearer ' . $privateKey,
    'X-Client-ID: YOUR_CLIENT_ID',
    'Content-Type: application/json'
];`;

    return `
      <div class="section-tag">${t('security_tag')}</div>
      <h2 class="section-h">${currentLang === 'pt' ? 'Autenticação' : 'Authentication'}</h2>
      <p class="section-p">${currentLang === 'pt'
        ? 'A iMaliPay utiliza encriptação RSA-ES-PKCS1 para gerar uma chave privada a partir do api_key e publicKey fornecidos pela Paytek. Este token deve ser enviado em cada pedido.'
        : 'iMaliPay uses RSA-ES-PKCS1 encryption to generate a private key from the api_key and publicKey provided by Paytek. This token must be sent in every request.'}</p>

      <div class="auth-steps">
        ${[
          [1, currentLang === 'pt' ? 'Receber credenciais da Paytek' : 'Receive Paytek credentials',
              currentLang === 'pt' ? 'Após registo como parceiro, a Paytek fornece api_key e publicKey para o ambiente Sandbox.' : 'After partner registration, Paytek provides api_key and publicKey for the Sandbox environment.'],
          [2, currentLang === 'pt' ? 'Gerar a privateKey' : 'Generate privateKey',
              currentLang === 'pt' ? 'Encripte o api_key com RSA-ES-PKCS1 usando a publicKey para obter a privateKey.' : 'Encrypt api_key with RSA-ES-PKCS1 using the publicKey to obtain the privateKey.'],
          [3, currentLang === 'pt' ? 'Incluir em cada pedido' : 'Include in every request',
              currentLang === 'pt' ? 'Envie Authorization: Bearer {privateKey} e X-Client-ID em todos os headers.' : 'Send Authorization: Bearer {privateKey} and X-Client-ID in all headers.'],
        ].map(([n,title,desc]) => `
          <div class="auth-step">
            <div class="auth-step-num">${n}</div>
            <div><div class="auth-step-title">${title}</div><div class="auth-step-desc">${desc}</div></div>
          </div>`).join('')}
      </div>

      <div class="alert alert-warn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div>${currentLang === 'pt' ? 'Nunca exponha a privateKey em código do lado do cliente. Gere-a sempre no servidor.' : 'Never expose the privateKey in client-side code. Always generate it server-side.'}</div>
      </div>

      <h3 class="sub-h">${currentLang === 'pt' ? 'Headers obrigatórios em todos os pedidos' : 'Required headers in all requests'}</h3>
      <div class="headers-table">
        <div class="ht-row ht-head"><span>Header</span><span>${currentLang === 'pt' ? 'Valor' : 'Value'}</span></div>
        <div class="ht-row"><span><code>Authorization</code></span><span><code>Bearer &lt;privateKey&gt;</code></span></div>
        <div class="ht-row"><span><code>X-Client-ID</code></span><span><code>&lt;your_client_id&gt;</code></span></div>
        <div class="ht-row"><span><code>Content-Type</code></span><span><code>application/json</code></span></div>
        <div class="ht-row"><span><code>Accept</code></span><span><code>application/json</code></span></div>
      </div>

      <h3 class="sub-h">${currentLang === 'pt' ? 'Exemplo de geração (PHP)' : 'Generation example (PHP)'}</h3>
      ${codeBlock(phpEx)}
    `;
  }

  function renderCodes() {
    const success = [[200,'Success'],[201,'Success — Created']];
    const errors = [
      [400, currentLang === 'pt' ? 'partner_transaction_id com menos de 12 caracteres' : 'partner_transaction_id less than 12 characters'],
      [401, currentLang === 'pt' ? 'Pagamento não aceite / transação expirada' : 'Payment not accepted / transaction expired'],
      [402, currentLang === 'pt' ? 'Valor inválido (negativo ou zero)' : 'Invalid amount (negative or zero)'],
      [404, currentLang === 'pt' ? 'Cliente/loja/conta inválida' : 'Invalid customer/store/account'],
      [405, currentLang === 'pt' ? 'Método não permitido' : 'Method not allowed'],
      [406, currentLang === 'pt' ? 'partner_transaction_id já em uso' : 'partner_transaction_id already in use'],
      [407, currentLang === 'pt' ? 'Saldo insuficiente' : 'Insufficient funds'],
      [408, currentLang === 'pt' ? 'Conta/loja bloqueada' : 'Account/store blocked'],
      [409, currentLang === 'pt' ? 'Valor não disponível' : 'Amount not available'],
      [422, currentLang === 'pt' ? 'Pedido mal formatado' : 'Badly formatted request'],
      [500, currentLang === 'pt' ? 'Token inválido' : 'Invalid token'],
      [501, currentLang === 'pt' ? 'Limite KYC do cliente atingido' : 'Customer KYC limit reached'],
      [502, currentLang === 'pt' ? 'Limite KYC da loja atingido' : 'Store KYC limit reached'],
    ];

    return `
      <div class="section-tag">${t('reference_tag')}</div>
      <h2 class="section-h">${currentLang === 'pt' ? 'Códigos de Resposta' : 'Response Codes'}</h2>
      <p class="section-p">${currentLang === 'pt' ? 'A API usa códigos no estilo HTTP para indicar sucesso ou falha.' : 'The API uses HTTP-style codes to indicate success or failure.'}</p>

      <div class="codes-grid">
        <div class="codes-card">
          <div class="codes-card-h ok">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${currentLang === 'pt' ? 'Sucesso' : 'Success'}
          </div>
          ${success.map(([c,m]) => `<div class="code-row"><span class="code-num ok">${c}</span><span>${m}</span></div>`).join('')}
        </div>
        <div class="codes-card">
          <div class="codes-card-h err">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ${currentLang === 'pt' ? 'Erros' : 'Errors'}
          </div>
          ${errors.map(([c,m]) => `<div class="code-row"><span class="code-num err">${c}</span><span>${esc(m)}</span></div>`).join('')}
        </div>
      </div>
    `;
  }

  function renderEndpoint(id) {
    const ep = ENDPOINTS[id];
    if (!ep) return '';

    const desc = currentLang === 'pt' ? ep.descPt : ep.descEn;
    const fullUrl = BASE_URL + ep.path;
    const noteText = currentLang === 'pt' ? ep.responsePt : ep.responseEn;
    const kindLabel = { required: t('required'), optional: t('optional'), fixed: t('fixed') };

    const paramsHTML = `
      <table class="params-table">
        <thead><tr>
          <th>${currentLang === 'pt' ? 'Parâmetro' : 'Parameter'}</th>
          <th>${currentLang === 'pt' ? 'Tipo' : 'Type'}</th>
          <th>${currentLang === 'pt' ? 'Estado' : 'Status'}</th>
          <th>${currentLang === 'pt' ? 'Descrição' : 'Description'}</th>
        </tr></thead>
        <tbody>
          ${ep.params.map(p => `
            <tr>
              <td><code>${p.name}</code></td>
              <td><span class="p-type">${p.type}${p.values ? `<br><span class="p-values">${p.values.join(' | ')}</span>` : ''}</span></td>
              <td><span class="p-kind ${kindClass(p.kind)}">${kindLabel[p.kind] || p.kind}</span></td>
              <td>${esc(currentLang === 'pt' ? p.descPt : p.descEn)}</td>
            </tr>`).join('')}
        </tbody>
      </table>`;

    const exJSON = JSON.stringify(ep.example, null, 2);
    const mockJSON = JSON.stringify(ep.mockResponse(ep.example), null, 2);

    return `
      <div class="section-tag">${currentLang === 'pt' ? (id.startsWith('b2c') ? t('transfer_tag') : t('payment_tag')) : (id.startsWith('b2c') ? t('transfer_tag') : t('payment_tag'))}</div>
      <h2 class="section-h">${t(ep.titleKey)}</h2>

      <div class="endpoint-banner">
        <span class="ep-method ${methodClass(ep.method)}">${ep.method}</span>
        <code class="ep-url">${esc(fullUrl)}</code>
        <button class="copy-btn ep-copy-btn" data-copy="${esc(fullUrl)}">${t('copy')}</button>
      </div>

      <p class="section-p">${esc(desc)}</p>

      <h3 class="sub-h">${t('params')}</h3>
      ${paramsHTML}

    `;
  }

  function renderWebhooks() {
    const structJSON = `{
  "id": "evt_123456",
  "type": "payment.success",
  "data": {
    "payment_id": "pay_123",
    "amount": 5000,
    "status": "SUCCESS"
  }
}`;

    return `
      <div class="section-tag">${t('webhook_tag')}</div>
      <h2 class="section-h">${currentLang === 'pt' ? 'Webhooks — Visão Geral' : 'Webhooks — Overview'}</h2>
      <p class="section-p">${currentLang === 'pt'
        ? 'Webhooks permitem que o sistema notifique automaticamente a sua aplicação sempre que ocorrer um evento importante, como a confirmação de um pagamento. Elimina a necessidade de polling constante.'
        : 'Webhooks allow the system to automatically notify your application whenever an important event occurs, such as payment confirmation. Eliminates constant polling.'}</p>

      <div class="alert alert-info">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <div>${currentLang === 'pt'
          ? 'A adesão ao webhook é feita automaticamente no acto da parceria. O parceiro deve fornecer uma <strong>callback_url</strong> e receberá uma <strong>webhook_secret</strong> para validação.'
          : 'Webhook enrollment is done automatically at partnership registration. The partner must provide a <strong>callback_url</strong> and will receive a <strong>webhook_secret</strong> for validation.'}</div>
      </div>

      <h3 class="sub-h">${currentLang === 'pt' ? 'Eventos Disponíveis' : 'Available Events'}</h3>
      <div class="events-list">
        <div class="event-item pending"><span class="event-dot"></span><code>PAYMENT.PENDING</code><span>${currentLang === 'pt' ? 'Pagamento criado, aguarda conclusão' : 'Payment created, awaiting completion'}</span></div>
        <div class="event-item success"><span class="event-dot"></span><code>PAYMENT.SUCCESS</code><span>${currentLang === 'pt' ? 'Pagamento concluído com sucesso' : 'Payment completed successfully'}</span></div>
        <div class="event-item failed"><span class="event-dot"></span><code>PAYMENT.FAILED</code><span>${currentLang === 'pt' ? 'Pagamento falhou' : 'Payment failed'}</span></div>
      </div>

      <h3 class="sub-h">${currentLang === 'pt' ? 'Fluxo do Webhook' : 'Webhook Flow'}</h3>
      <ol class="flow-list">
        ${[
          currentLang === 'pt' ? 'Cliente inicia transação no sistema do parceiro' : 'Customer initiates transaction in the partner system',
          currentLang === 'pt' ? 'iMali Gateway processa a transação e atualiza o estado' : 'iMali Gateway processes the transaction and updates status',
          currentLang === 'pt' ? 'Gateway envia requisição HTTP POST para a callback_url configurada' : 'Gateway sends HTTP POST request to the configured callback_url',
          currentLang === 'pt' ? 'Sistema do parceiro valida assinatura e processa a notificação' : 'Partner system validates signature and processes the notification',
        ].map(s => `<li>${s}</li>`).join('')}
      </ol>

      <h3 class="sub-h">${currentLang === 'pt' ? 'Estrutura do Payload' : 'Payload Structure'}</h3>
      <h4 class="sub-sub-h">Headers</h4>
      ${codeBlock(`Content-Type: application/json
X-Webhook-Id: evt_123456
X-Webhook-Timestamp: 1712750000
X-Webhook-Signature: sha256=abc123...`)}
      <h4 class="sub-sub-h">Body</h4>
      ${codeBlock(structJSON)}

      <div class="alert alert-info">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <div>${currentLang === 'pt'
          ? '<strong>Retentativas:</strong> Se o endpoint não responder com HTTP 2xx, o webhook será reenviado automaticamente — até 10 tentativas em 72h com intervalo progressivo.'
          : '<strong>Retries:</strong> If the endpoint does not respond with HTTP 2xx, the webhook will be automatically retried — up to 10 attempts over 72h with progressive intervals.'}</div>
      </div>
    `;
  }

  function renderWebhookSecurity() {
    const phpEx = `$payload   = file_get_contents('php://input');
$timestamp = $_SERVER['HTTP_X_WEBHOOK_TIMESTAMP'];
$received  = $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'];

// 1. Build signed payload
$signed = $timestamp . '.' . $payload;

// 2. Generate expected signature
$expected = hash_hmac('sha256', $signed, $webhookSecret);

// 3. Compare (constant-time)
if (!hash_equals($expected, $received)) {
    http_response_code(401);
    exit('Invalid signature');
}

// 4. Anti-replay: reject if older than 5 minutes
if (abs(time() - $timestamp) > 300) {
    http_response_code(400);
    exit('Webhook expired');
}`;

    return `
      <div class="section-tag">${t('webhook_tag')}</div>
      <h2 class="section-h">${currentLang === 'pt' ? 'Segurança dos Webhooks' : 'Webhook Security'}</h2>
      <p class="section-p">${currentLang === 'pt'
        ? 'Valide cada webhook recebido usando a assinatura HMAC-SHA256 no cabeçalho X-Webhook-Signature para garantir autenticidade e proteção anti-replay.'
        : 'Validate every incoming webhook using the HMAC-SHA256 signature in the X-Webhook-Signature header to ensure authenticity and anti-replay protection.'}</p>

      <div class="alert alert-warn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div>${currentLang === 'pt'
          ? 'Rejeite sempre webhooks com timestamp superior a 5 minutos para prevenir ataques de repetição.'
          : 'Always reject webhooks with a timestamp older than 5 minutes to prevent replay attacks.'}</div>
      </div>

      <h3 class="sub-h">${currentLang === 'pt' ? 'Processo de Validação' : 'Validation Process'}</h3>
      <div class="auth-steps">
        ${[
          [1, currentLang === 'pt' ? 'Ler dados do header' : 'Read header data',
              currentLang === 'pt' ? 'Obter X-Webhook-Timestamp e X-Webhook-Signature do header.' : 'Get X-Webhook-Timestamp and X-Webhook-Signature from header.'],
          [2, currentLang === 'pt' ? 'Construir string assinada' : 'Build signed string',
              currentLang === 'pt' ? 'Concatenar: timestamp + "." + payload_bruto' : 'Concatenate: timestamp + "." + raw_payload'],
          [3, currentLang === 'pt' ? 'Gerar assinatura esperada' : 'Generate expected signature',
              currentLang === 'pt' ? 'HMAC-SHA256(signed_string, webhook_secret)' : 'HMAC-SHA256(signed_string, webhook_secret)'],
          [4, currentLang === 'pt' ? 'Comparar e validar tempo' : 'Compare and validate time',
              currentLang === 'pt' ? 'Usar hash_equals() para comparação. Validar que timestamp ≤ 5 minutos.' : 'Use constant-time comparison. Validate timestamp ≤ 5 minutes.'],
        ].map(([n,title,desc]) => `
          <div class="auth-step">
            <div class="auth-step-num">${n}</div>
            <div><div class="auth-step-title">${title}</div><div class="auth-step-desc">${desc}</div></div>
          </div>`).join('')}
      </div>

      <h3 class="sub-h">${currentLang === 'pt' ? 'Exemplo de Validação (PHP)' : 'Validation Example (PHP)'}</h3>
      ${codeBlock(phpEx)}
    `;
  }

  function renderSandbox() {
    const endpointOptions = Object.entries(ENDPOINTS).map(([id, ep]) =>
      `<option value="${id}">${ep.method} — ${t(ep.titleKey)}</option>`
    ).join('');

    return `
      <div class="section-tag">${t('devtools_tag')}</div>
      <h2 class="section-h">API Sandbox</h2>
      <p class="section-p">${currentLang === 'pt'
        ? 'Teste os endpoints directamente no browser. Nenhum dinheiro real é movimentado. As respostas são simuladas para desenvolvimento.'
        : 'Test endpoints directly from the browser. No real money is moved. Responses are simulated for development.'}</p>

      <div class="alert alert-info">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <div>${currentLang === 'pt'
          ? 'Para obter credenciais de Sandbox, contacte <strong>partner@paytekafrica.com</strong>.'
          : 'To get Sandbox credentials, contact <strong>partner@paytekafrica.com</strong>.'}</div>
      </div>

      <div class="sb-shell">

        <!-- ENDPOINT PICKER -->
        <div class="sb-picker">
          <div class="sb-picker-label">${currentLang === 'pt' ? 'Endpoint' : 'Endpoint'}</div>
          <div class="sb-picker-row">
            <select id="sbEndpoint" class="sb-ep-select">${endpointOptions}</select>
            <span class="env-badge" id="sbEnvBadge">${t('sandbox_badge')}</span>
          </div>
        </div>

        <!-- MAIN GRID: form + response -->
        <div class="sb-grid">

          <!-- FORM COLUMN -->
          <div class="sb-col-form">

            <!-- Auth card -->
            <div class="sb-card">
              <div class="sb-card-hd">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                ${currentLang === 'pt' ? 'Autenticação' : 'Authentication'}
              </div>
              <div class="sb-card-body">
                <div class="form-group">
                  <label>${currentLang === 'pt' ? 'Bearer Token' : 'Bearer Token'} <span class="req-star">*</span></label>
                  <div class="sb-input-wrap">
                    <input id="sbToken" type="password" placeholder="privateKey gerada via RSA-ES-PKCS1" autocomplete="off">
                    <button class="sb-eye-btn" id="sbTokenEye" type="button" aria-label="Toggle visibility">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                  <div class="field-err" id="sbTokenErr"></div>
                </div>
                <div class="form-group" style="border-bottom:none;padding-bottom:0">
                  <label>X-Client-ID <span class="req-star">*</span></label>
                  <input id="sbClientId" type="text" placeholder="1234567890" autocomplete="off">
                  <div class="field-err" id="sbClientErr"></div>
                </div>
              </div>
            </div>

            <!-- Params card -->
            <div class="sb-card">
              <div class="sb-card-hd">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                ${currentLang === 'pt' ? 'Parâmetros' : 'Parameters'}
              </div>
              <div id="sbDynamicFields" class="dynamic-fields sb-card-body"></div>
            </div>

            <!-- Submit -->
            <button class="send-btn" id="sbRunBtn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>${t('send')}</span>
            </button>
          </div>

          <!-- RESPONSE COLUMN -->
          <div class="sb-col-resp">
            <div class="sb-terminal">
              <div class="sb-term-header">
                <span class="term-dot" style="background:#ff5f57"></span>
                <span class="term-dot" style="background:#ffbd2e"></span>
                <span class="term-dot" style="background:#28c840"></span>
                <span class="sb-term-title">${currentLang === 'pt' ? 'Resposta' : 'Response'}</span>
                <span class="resp-status" id="sbStatus"></span>
                <button class="copy-btn sb-copy-resp" id="sbCopyResp" style="display:none">${t('copy')}</button>
              </div>
              <div class="sb-term-tabs" id="sbRespTabs" style="display:none">
                <button class="term-tab active" data-resp-tab="body">${currentLang === 'pt' ? 'Resposta' : 'Response'}</button>
                <button class="term-tab" data-resp-tab="headers">Headers</button>
              </div>
              <div class="sb-term-body">
                <div id="sbRespBody" class="resp-body">
                  <div class="sb-resp-placeholder">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".25"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    <span>${t('resp_ph')}</span>
                  </div>
                </div>
                <div id="sbRespHeaders" class="resp-body" style="display:none">
                  <pre><span class="t-key">Content-Type:</span> <span class="t-str">application/json</span>
<span class="t-key">X-Request-Id:</span>  <span class="t-str">req_sandbox_${Math.random().toString(36).substr(2,8)}</span>
<span class="t-key">X-Environment:</span> <span class="t-str">sandbox</span></pre>
                </div>
              </div>
              <div class="sb-term-footer" id="sbTermFooter" style="display:none">
                <span class="sb-timing" id="sbTiming"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function codeBlock(code) {
    return `
      <div class="code-block">
        <button class="copy-btn code-copy" data-copy="${esc(code)}">${t('copy')}</button>
        <pre><code>${syntaxHL(esc(code))}</code></pre>
      </div>`;
  }

  // ──────────────────────────────────────────────────────────
  // CODE PANEL — Terminal window style
  // Oculto quando não há endpoint activo
  // ──────────────────────────────────────────────────────────
  function renderCodePanel(id) {
    const panel = document.getElementById('codePanel');
    const ep = ENDPOINTS[id];

    // Sem endpoint → painel oculto
    if (!ep) {
      panel.innerHTML = '';
      panel.classList.add('cp-hidden');
      return;
    }

    panel.classList.remove('cp-hidden');

    const fullUrl = BASE_URL + ep.path;
    const exJSON  = JSON.stringify(ep.example, null, 2);

    const tabs = {
      'cURL':    curlEx(ep.method, fullUrl, exJSON),
      'Node.js': nodeEx(ep.method, fullUrl, exJSON),
      'PHP':     phpEx(ep.method, fullUrl, exJSON),
      'Python':  pythonEx(ep.method, fullUrl, exJSON),
    };

    // Monta o terminal
    const tabButtons = Object.keys(tabs).map((k, i) =>
      `<button class="term-tab${i === 0 ? ' active' : ''}" data-tab="${k}">${k}</button>`
    ).join('');

    const bodies = Object.entries(tabs).map(([k, v], i) =>
      `<div class="cp-body${i === 0 ? ' active' : ''}" data-body="${k}">
        <pre><code>${codeHL(k, v)}</code></pre>
      </div>`
    ).join('');

    // Response mock
    const mockJSON = JSON.stringify(ep.mockResponse(ep.example), null, 2);
    const noteText = currentLang === 'pt' ? ep.responsePt : ep.responseEn;

    panel.innerHTML = `
      <!-- REQUEST BLOCK -->
      <div class="cp-block">
        <div class="cp-block-label">
          <span class="cp-block-dot req-dot"></span>
          ${currentLang === 'pt' ? 'Request' : 'Request'}
        </div>
        <div class="dev-terminal">
          <div class="term-header">
            <span class="term-dot" style="background:#ff5f57"></span>
            <span class="term-dot" style="background:#ffbd2e"></span>
            <span class="term-dot" style="background:#28c840"></span>
            <span class="term-title">${ep.method} ${ep.path}</span>
            <button class="term-copy-btn copy-btn" id="cpCopyBtn">${t('copy')}</button>
          </div>
          <div class="term-tabs-bar">
            ${tabButtons}
          </div>
          <div class="term-body">
            ${bodies}
          </div>
        </div>
      </div>

      <!-- RESPONSE BLOCK -->
      <div class="cp-block">
        <div class="cp-block-label">
          <span class="cp-block-dot resp-dot"></span>
          ${currentLang === 'pt' ? 'Response' : 'Response'}
          <span class="cp-resp-note">${esc(noteText)}</span>
        </div>
        <div class="dev-terminal">
          <div class="term-header">
            <span class="term-dot" style="background:#ff5f57"></span>
            <span class="term-dot" style="background:#ffbd2e"></span>
            <span class="term-dot" style="background:#28c840"></span>
            <span class="term-title">200 OK</span>
            <button class="term-copy-btn copy-btn" id="cpCopyResp" data-copy="${esc(mockJSON)}">${t('copy')}</button>
          </div>
          <div class="term-body">
            <pre><code>${syntaxHL(esc(mockJSON))}</code></pre>
          </div>
        </div>
      </div>`;

    // Tab switching (REQUEST block)
    panel.querySelectorAll('.term-tab[data-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        panel.querySelectorAll('.term-tab[data-tab]').forEach(t => t.classList.remove('active'));
        panel.querySelectorAll('.cp-body').forEach(b => b.classList.remove('active'));
        tab.classList.add('active');
        panel.querySelector(`[data-body="${tab.dataset.tab}"]`).classList.add('active');
        updateCopyBtn();
      });
    });

    function updateCopyBtn() {
      const activeTab = panel.querySelector('.term-tab[data-tab].active');
      if (!activeTab) return;
      const raw = tabs[activeTab.dataset.tab] || '';
      const btn = panel.querySelector('#cpCopyBtn');
      if (btn) btn.dataset.copy = raw;
    }

    const copyBtn = panel.querySelector('#cpCopyBtn');
    if (copyBtn) {
      copyBtn.dataset.copy = tabs['cURL'];
      copyBtn.addEventListener('click', () => {
        const activeTab = panel.querySelector('.term-tab[data-tab].active');
        const raw = activeTab ? tabs[activeTab.dataset.tab] : tabs['cURL'];
        copyText(raw, copyBtn);
      });
    }

    // Response copy
    const copyRespBtn = panel.querySelector('#cpCopyResp');
    if (copyRespBtn) {
      copyRespBtn.addEventListener('click', () => copyText(mockJSON, copyRespBtn));
    }
  }

  // ──────────────────────────────────────────────────────────
  // SYNTAX HIGHLIGHT por linguagem (estilo terminal)
  // ──────────────────────────────────────────────────────────
  function codeHL(lang, code) {
    const e = esc(code);

    if (lang === 'cURL') {
      return e
        // método HTTP
        .replace(/^(curl)/m, '<span class="t-cmd">$1</span>')
        .replace(/(-X\s+)(POST|GET|PUT|DELETE|PATCH)/g, '<span class="t-flag">$1</span><span class="t-cmd">$2</span>')
        // URL
        .replace(/(&#x27;|')(https?:\/\/[^\s&#x27;']+)(&#x27;|')/g, '$1<span class="t-url">$2</span>$3')
        // flags
        .replace(/\s(-[A-Za-z]+)/g, ' <span class="t-flag">$1</span>')
        // strings com aspas
        .replace(/(&#x27;[^&#x27;]*&#x27;)/g, '<span class="t-str">$1</span>')
        // chaves JSON
        .replace(/(&quot;)([a-zA-Z_]+)(&quot;)(\s*:)/g, '<span class="t-key">$1$2$3</span>$4')
        // valores numéricos
        .replace(/:\s*(\d+\.?\d*)/g, ': <span class="t-num">$1</span>')
        // valores string JSON
        .replace(/:\s*(&quot;)([^&]*)(&quot;)/g, ': <span class="t-str">$1$2$3</span>');
    }

    if (lang === 'Node.js') {
      return e
        .replace(/\b(const|let|var|await|async|function|return)\b/g, '<span class="t-flag">$1</span>')
        .replace(/(fetch|console\.log|JSON\.stringify)/g, '<span class="t-cmd">$1</span>')
        .replace(/(&#x27;[^&#x27;]*&#x27;)/g, '<span class="t-str">$1</span>')
        .replace(/(&quot;[^&]*&quot;)/g, '<span class="t-str">$1</span>')
        .replace(/\/\/.*/g, '<span class="t-comment">$&</span>')
        .replace(/\b(true|false|null)\b/g, '<span class="t-bool">$1</span>')
        .replace(/(?<!["\w])(\d+\.?\d*)(?![":\w])/g, '<span class="t-num">$1</span>');
    }

    if (lang === 'PHP') {
      return e
        .replace(/\b(curl_init|curl_setopt_array|curl_exec|curl_close|json_encode|json_decode)\b/g, '<span class="t-cmd">$1</span>')
        .replace(/\b(true|false|null|CURLOPT_\w+)\b/g, '<span class="t-bool">$1</span>')
        .replace(/(\$\w+)/g, '<span class="t-url">$1</span>')
        .replace(/(&#x27;[^&#x27;]*&#x27;)/g, '<span class="t-str">$1</span>')
        .replace(/(\/\/.*)/g, '<span class="t-comment">$1</span>')
        .replace(/(?<!["\w])(\d+\.?\d*)(?![":\w])/g, '<span class="t-num">$1</span>');
    }

    if (lang === 'Python') {
      return e
        .replace(/\b(import|requests|print|json)\b/g, '<span class="t-flag">$1</span>')
        .replace(/\b(requests\.\w+)/g, '<span class="t-cmd">$1</span>')
        .replace(/(&#x27;[^&#x27;]*&#x27;)/g, '<span class="t-str">$1</span>')
        .replace(/(#.*)/g, '<span class="t-comment">$1</span>')
        .replace(/\b(True|False|None)\b/g, '<span class="t-bool">$1</span>')
        .replace(/(?<!["\w])(\d+\.?\d*)(?![":\w])/g, '<span class="t-num">$1</span>');
    }

    return syntaxHL(e);
  }

  function curlEx(method, url, body) {
    const bodyStr = method !== 'GET' ? `\\\n  --data '${body}'` : '';
    return `curl -X ${method} '${url}' \\
  -H 'Authorization: Bearer {privateKey}' \\
  -H 'X-Client-ID: {client_id}' \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json'${method !== 'GET' ? ` \\
  --data '${body}'` : ''}`;
  }

  function nodeEx(method, url, body) {
    const hasBody = method !== 'GET';
    return `const response = await fetch('${url}', {
  method: '${method}',
  headers: {
    'Authorization': 'Bearer {privateKey}',
    'X-Client-ID': '{client_id}',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },${hasBody ? `
  body: JSON.stringify(${body}),` : ''}
});

const data = await response.json();
console.log(data);`;
  }

  function phpEx(method, url, body) {
    const hasBody = method !== 'GET';
    return `<?php
$ch = curl_init('${url}');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST  => '${method}',
  CURLOPT_HTTPHEADER     => [
    'Authorization: Bearer {privateKey}',
    'X-Client-ID: {client_id}',
    'Content-Type: application/json',
    'Accept: application/json',
  ],${hasBody ? `
  CURLOPT_POSTFIELDS     => json_encode(${body}),` : ''}
]);
$response = json_decode(curl_exec($ch), true);
curl_close($ch);`;
  }

  function pythonEx(method, url, body) {
    const hasBody = method !== 'GET';
    return `import requests

response = requests.${method.toLowerCase()}(
    '${url}',
    headers={
        'Authorization': 'Bearer {privateKey}',
        'X-Client-ID': '{client_id}',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },${hasBody ? `
    json=${body},` : ''}
)
print(response.json())`;
  }

  // ──────────────────────────────────────────────────────────
  // SANDBOX DYNAMIC FIELDS
  // ──────────────────────────────────────────────────────────
  function renderSandboxFields(epId) {
    const ep = ENDPOINTS[epId];
    if (!ep) return;
    const container = document.getElementById('sbDynamicFields');
    if (!container) return;

    let html = '';
    ep.params.forEach(p => {
      if (p.kind === 'fixed') return;
      const val = ep.example[p.name] || '';
      const desc = currentLang === 'pt' ? p.descPt : p.descEn;

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

  // ──────────────────────────────────────────────────────────
  // NAVIGATION
  // ──────────────────────────────────────────────────────────
  function navigate(sectionId) {
    currentSection = sectionId;
    renderSidebar();

    const main = document.getElementById('mainContent');
    let html = '';

    switch (sectionId) {
      case 'intro':           html = renderIntro(); break;
      case 'auth':            html = renderAuth(); break;
      case 'codes':           html = renderCodes(); break;
      case 'webhooks':        html = renderWebhooks(); break;
      case 'webhook-security':html = renderWebhookSecurity(); break;
      case 'sandbox':         html = renderSandbox(); break;
      default:
        if (ENDPOINTS[sectionId]) html = renderEndpoint(sectionId);
        else html = `<p>Section not found.</p>`;
    }

    main.innerHTML = `<div class="section-content fade-in">${html}</div>`;
    main.scrollTop = 0;

    // Bind copy buttons
    main.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => copyText(btn.dataset.copy, btn));
    });

    // Code panel — renderCodePanel decide mostrar/ocultar
    renderCodePanel(sectionId);

    // Sandbox setup
    if (sectionId === 'sandbox') {
      setupSandbox();
    }

    // Update env badge
    const badge = document.getElementById('envBadge');
    if (badge) badge.textContent = t(currentEnv === 'sandbox' ? 'sandbox_badge' : 'live_badge');
  }

  // ──────────────────────────────────────────────────────────
  // SANDBOX LOGIC
  // ──────────────────────────────────────────────────────────
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

      // Update response body
      const respEl    = document.getElementById('sbRespBody');
      const statusEl  = document.getElementById('sbStatus');
      const copyResp  = document.getElementById('sbCopyResp');
      const respTabs  = document.getElementById('sbRespTabs');
      const footer    = document.getElementById('sbTermFooter');
      const timing    = document.getElementById('sbTiming');

      respEl.innerHTML = `<pre><code>${syntaxHL(esc(jsonStr))}</code></pre>`;
      respEl.style.display = '';
      document.getElementById('sbRespHeaders').style.display = 'none';

      // Status badge
      statusEl.textContent = '200 OK';
      statusEl.className = 'resp-status ok';

      // Show tabs, copy, footer
      if (respTabs) respTabs.style.display = '';
      if (footer)   footer.style.display   = '';
      if (timing)   timing.textContent     = `${elapsed}ms`;

      copyResp.style.display = '';
      copyResp.onclick = () => copyText(jsonStr, copyResp);

      // Reset response tabs to body
      document.querySelectorAll('[data-resp-tab]').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.respTab === 'body');
      });

      btnSpan.textContent = t('send');
      runBtn.disabled = false;
      runBtn.classList.remove('loading');
    });
  }

  // ──────────────────────────────────────────────────────────
  // SEARCH
  // ──────────────────────────────────────────────────────────
  function setupSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    input.placeholder = t('search_ph');

    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      document.querySelectorAll('#sidebar [data-section]').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        btn.style.display = (!q || text.includes(q)) ? '' : 'none';
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

  // ──────────────────────────────────────────────────────────
  // THEME
  // ──────────────────────────────────────────────────────────
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

  // ──────────────────────────────────────────────────────────
  // ENV TOGGLE
  // ──────────────────────────────────────────────────────────
  function setupEnv() {
    document.querySelectorAll('.env-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentEnv = btn.dataset.env;
        document.querySelectorAll('.env-btn').forEach(b => b.classList.toggle('active', b.dataset.env === currentEnv));
        const badge = document.getElementById('envBadge');
        const sbBadge = document.getElementById('sbEnvBadge');
        const label = t(currentEnv === 'sandbox' ? 'sandbox_badge' : 'live_badge');
        if (badge)   badge.textContent   = label;
        if (sbBadge) sbBadge.textContent = label;
      });
    });
  }

  // ──────────────────────────────────────────────────────────
  // LANG TOGGLE
  // ──────────────────────────────────────────────────────────
  function setupLang() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentLang = btn.dataset.lang;
        localStorage.setItem('imali_lang', currentLang);
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
        // Re-render current section + sidebar
        renderSidebar();
        navigate(currentSection);
        setupSearch();
      });
    });

    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
  }

  // ──────────────────────────────────────────────────────────
  // TOPBAR CTA
  // ──────────────────────────────────────────────────────────
  function setupCTA() {
    const btn = document.querySelector('.topbar-cta');
    if (btn) {
      btn.addEventListener('click', () => {
        window.location.href = 'mailto:partner@paytekafrica.com?subject=API%20Keys%20Request';
      });
    }
  }

  // ──────────────────────────────────────────────────────────
  // MOBILE SIDEBAR
  // ──────────────────────────────────────────────────────────
  function setupMobile() {
    const toggle = document.getElementById('menuToggle');
    const sb = document.getElementById('sidebar');
    if (toggle && sb) {
      toggle.addEventListener('click', () => sb.classList.toggle('open'));
      document.getElementById('mainContent')?.addEventListener('click', () => sb.classList.remove('open'));
    }
  }

  // ──────────────────────────────────────────────────────────
  // INIT
  // ──────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupLang();
    setupEnv();
    setupSearch();
    setupCTA();
    setupMobile();
    renderSidebar();
    navigate('intro');
  });

})();