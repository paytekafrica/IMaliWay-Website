/**
 * Paytek — app.js (página de Contactos)
 * Módulos: scroll reveal · formulário de contacto
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
   FORMULÁRIO DE CONTACTO
══════════════════════════════════════════════════════════════ */
(function initContactForm() {
    const form   = document.getElementById('contact-form');
    const submit = document.getElementById('form-submit');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        /* Validação básica */
        const fields = form.querySelectorAll('[required]');
        let valid = true;
        fields.forEach(f => {
            f.style.borderColor = '';
            if (!f.value.trim()) {
                f.style.borderColor = '#ef4444';
                valid = false;
            }
        });
        if (!valid) return;

        /* Feedback visual de sucesso */
        const original = submit.textContent;
        submit.textContent = 'Mensagem enviada ✓';
        submit.style.background = 'var(--accent)';
        submit.style.color = '#000';
        submit.disabled = true;

        setTimeout(() => {
            submit.textContent = original;
            submit.style.background = '';
            submit.style.color = '';
            submit.disabled = false;
            form.reset();
        }, 3500);
    });
})();
