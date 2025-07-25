async function request(url, options = {}) {
  const res = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...(options.headers||{}) } });
  if (res.status === 401) {
    showLogin();
    throw new Error('unauthenticated');
  }
  return res.json();
}

function showLogin() {
  document.getElementById('login').style.display = 'block';
  document.getElementById('dashboard').style.display = 'none';
}

function showDashboard() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
}

async function loadStats() {
  const stats = await request('/stats');
  const table = document.getElementById('stats');
  table.innerHTML = '<tr><th>ID</th><th>Titel</th><th>Retouren</th></tr>' +
    stats.map(s => `<tr><td>${s.id}</td><td>${s.title}</td><td>${s.rate}</td></tr>`).join('');
}

async function loadSuggestions() {
  const list = await request('/suggestions');
  const div = document.getElementById('suggestions');
  div.innerHTML = '';
  list.forEach(item => {
    const p = document.createElement('p');
    p.textContent = `#${item.id} (${item.product_id}): ${item.suggestion}`;
    const accept = document.createElement('button');
    accept.textContent = 'Annehmen';
    accept.onclick = () => sendFeedback(item.id, true);
    const decline = document.createElement('button');
    decline.textContent = 'Ablehnen';
    decline.onclick = () => sendFeedback(item.id, false);
    const applyBtn = document.createElement('button');
    applyBtn.textContent = 'Aktualisieren';
    applyBtn.onclick = () => applySuggestion(item.id);
    p.append(' ', accept, ' ', decline);
    p.append(' ', applyBtn);
    div.appendChild(p);
  });
}

async function sendFeedback(id, accepted) {
  await request(`/feedback/${id}`, { method: 'POST', body: JSON.stringify({ accepted }) });
  loadSuggestions();
}

async function applySuggestion(id) {
  await request(`/apply/${id}`, { method: 'POST' });
  loadSuggestions();
}

async function login() {
  const email = document.getElementById('email').value;
  await request('/login', { method: 'POST', body: JSON.stringify({ email }) });
  showDashboard();
  await Promise.all([loadStats(), loadSuggestions()]);
}

async function saveSettings() {
  const lang = document.getElementById('lang').value;
  await request('/settings', { method: 'POST', body: JSON.stringify({ lang }) });
  alert('Gespeichert');
}

document.getElementById('loginBtn').onclick = login;
document.getElementById('saveSettings').onclick = saveSettings;

// init
request('/session')
  .then(() => { showDashboard(); loadStats(); loadSuggestions(); })
  .catch(showLogin);
