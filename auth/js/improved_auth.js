// improved_auth.js - Handles theme toggle and mock login for the premium auth page

// Theme toggle (persist in localStorage)
(function() {
  const root = document.documentElement;
  const stored = localStorage.getItem('theme') || 'dark';
  setTheme(stored);
  // Create a button
  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Alternar tema');
  btn.textContent = stored === 'dark' ? '🌙' : '☀️';
  btn.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    btn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  });
  document.body.appendChild(btn);

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
})();

// Mock login handling – provides visual feedback
const form = document.getElementById('loginForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = 'A processar...';
    setTimeout(() => {
      alert('Login simulado com sucesso!');
      btn.textContent = original;
      btn.disabled = false;
      form.reset();
    }, 1200);
  });
}
