/* Scroll reveal */
const obs = new IntersectionObserver(
    (entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 80);
                obs.unobserve(e.target);
            }
        });
    },
    { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

/* Stagger info cards */
document.querySelectorAll('.info-cards-row > *').forEach((el, i) => {
    el.style.transitionDelay = `${i * 70}ms`;
});

/* Form submit */
function handleSubmit() {
    const fields = [
        document.getElementById('dept'),
        document.getElementById('name'),
        document.getElementById('email'),
        document.getElementById('subject'),
        document.getElementById('message'),
    ];
    let ok = true;
    fields.forEach((el) => {
        if (!el.value.trim()) {
            el.style.borderColor = '#e74c3c';
            el.style.boxShadow = '0 0 0 3px rgba(231,76,60,.12)';
            setTimeout(() => {
                el.style.borderColor = '';
                el.style.boxShadow = '';
            }, 2500);
            ok = false;
        }
    });
    if (!ok) return;

    const btn = document.getElementById('submitBtn');
    btn.textContent = 'A enviar…';
    btn.disabled = true;
    btn.style.opacity = '.7';

    setTimeout(() => {
        btn.textContent = '✓ Enviado com sucesso!';
        btn.style.opacity = '1';
        const t = document.getElementById('toast');
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3200);
        setTimeout(() => {
            btn.textContent = 'Enviar mensagem →';
            btn.disabled = false;
        }, 3500);
    }, 1200);
}

document.getElementById('submitBtn').addEventListener('click', handleSubmit);