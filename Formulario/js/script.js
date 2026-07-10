/**
 * Paytek — app.js (página de Pedido de Acesso)
 * Módulos: scroll reveal · formulário de pedido de acesso
 */

/* ══════════════════════════════════════════════════════════════
   SCROLL REVEAL — Intersection Observer
══════════════════════════════════════════════════════════════ */
(function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    /* Bidireccional: adiciona .visible ao entrar, remove ao sair */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    }, { rootMargin: '-8% 0px -8% 0px', threshold: 0.05 });

    elements.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════════════════════════════
   FORMULÁRIO DE PEDIDO DE ACESSO
══════════════════════════════════════════════════════════════ */
(function initAccessForm() {
    const form   = document.getElementById('access-form');
    const submit = document.getElementById('form-submit');
    if (!form) return;

    /* Campo condicional: "Outros" no Ramo de actividade (radio — selecção única) */
    const ramoGroupEl   = document.getElementById('af-ramo-group');
    const outrosCheckbox = document.getElementById('af-ramo-outros');
    const outrosWrap     = document.getElementById('af-ramo-outros-wrap');
    const outrosInput    = document.getElementById('af-ramo-outros-text');

    if (ramoGroupEl && outrosCheckbox && outrosWrap && outrosInput) {
        const syncOutros = () => {
            outrosWrap.hidden = !outrosCheckbox.checked;
            if (!outrosCheckbox.checked) {
                outrosInput.value = '';
                outrosInput.style.borderColor = '';
            }
        };
        /* Delegado no grupo: qualquer rádio "ramo" pode desmarcar "Outros" */
        ramoGroupEl.addEventListener('change', syncOutros);
        form.addEventListener('reset', () => setTimeout(syncOutros, 0));
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        /* Validação básica: campos de texto/select obrigatórios */
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let valid = true;
        fields.forEach(f => {
            f.style.borderColor = '';
            if (!f.value.trim()) {
                f.style.borderColor = '#ef4444';
                valid = false;
            }
        });

        /* Validação do grupo "Ramo de actividade" — pelo menos uma opção */
        const ramoGroup = document.getElementById('af-ramo-group');
        if (ramoGroup) {
            const ramoChecked = ramoGroup.querySelectorAll('input[name="ramo"]:checked').length > 0;
            ramoGroup.style.borderColor = ramoChecked ? '' : '#ef4444';
            if (!ramoChecked) valid = false;
        }

        /* Validação do campo condicional "Outros" */
        if (outrosCheckbox && outrosCheckbox.checked && outrosInput) {
            outrosInput.style.borderColor = '';
            if (!outrosInput.value.trim()) {
                outrosInput.style.borderColor = '#ef4444';
                valid = false;
            }
        }

        /* Validação da checkbox de termos */
        const consent = document.getElementById('af-consent');
        const consentLabel = document.querySelector('.cform-consent label');
        if (consent) {
            consentLabel.style.color = '';
            if (!consent.checked) {
                consentLabel.style.color = '#ef4444';
                valid = false;
            }
        }

        if (!valid) return;

        /* Feedback visual de sucesso */
        const original = submit.textContent;
        submit.textContent = 'Pedido enviado ✓';
        submit.style.background = '#6DC135';
        submit.disabled = true;

        setTimeout(() => {
            submit.textContent = original;
            submit.style.background = '';
            submit.disabled = false;
            form.reset();
        }, 3500);
    });
})();