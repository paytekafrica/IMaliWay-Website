
/* ── THEME TOGGLE ── */
function toggleTheme(){
  const html = document.documentElement;
  html.setAttribute('data-theme', html.getAttribute('data-theme')==='dark' ? 'light' : 'dark');
}

/* ── SWITCH SCREENS ── */
function switchScreen(name){
  document.querySelectorAll('.auth-screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  document.getElementById('tab-'+name).classList.add('active');
}

/* ── TOGGLE PASSWORD VISIBILITY ── */
function togglePwd(inputId, iconEl){
  const inp = document.getElementById(inputId);
  const isHidden = inp.type === 'password';
  inp.type = isHidden ? 'text' : 'password';
  iconEl.innerHTML = isHidden
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
}

/* ── PASSWORD STRENGTH ── */
function checkStrength(input){
  const v = input.value;
  let score = 0;
  if(v.length >= 8) score++;
  if(/[A-Z]/.test(v)) score++;
  if(/[0-9]/.test(v)) score++;
  if(/[^A-Za-z0-9]/.test(v)) score++;

  const bars = ['bar1','bar2','bar3','bar4'];
  const levels = ['filled-weak','filled-ok','filled-good','filled-strong'];
  const hints = ['Muito fraca','Fraca','Boa','Forte 🔒'];
  const colors = ['filled-weak','filled-ok','filled-good','filled-strong'];

  bars.forEach((id,i) => {
    const el = document.getElementById(id);
    el.className = 'pwd-bar' + (i < score ? ' ' + colors[Math.min(score-1,3)] : '');
  });

  const hint = document.getElementById('pwd-hint');
  if(v.length === 0){
    hint.textContent = 'Use letras, números e símbolos';
    hint.style.color = '';
  } else {
    hint.textContent = hints[Math.min(score-1,3)] || hints[0];
    const hintColors = ['#e53e3e','#EF9F27','#52A828','#6DC135'];
    hint.style.color = hintColors[Math.min(score-1,3)] || hintColors[0];
  }
}
// ── INICIALIZAÇÃO: LÊ O PARÂMETRO 'tab' DA URL ──
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab');

  if (tab === 'signup') {
    switchScreen('signup');
  } else if (tab === 'login') {
    switchScreen('login');
  }
  // Se não houver parâmetro, mantém a tela de login (padrão)
});

// ── (OPCIONAL) SINCRONIZA A URL AO TROCAR DE ABA MANUALMENTE ──
// Guarda a função original para não perder comportamento
const originalSwitchScreen = window.switchScreen;
window.switchScreen = function(name) {
  originalSwitchScreen(name);
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set('tab', name);
  window.history.replaceState({}, '', newUrl);
};