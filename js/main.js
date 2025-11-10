// js/main.js

const API = 'https://amigo-secreto-backend-md1k.onrender.com/api';
const token = localStorage.getItem('token');
if (!token) window.location = 'index.html';

async function fetchParticipantes() {
  const res = await fetch(`${API}/participant`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const participantes = await res.json();
  const ul = document.getElementById('participantes');
  ul.innerHTML = '';
  participantes.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p.name + (p.assigned ? ` ➔ ${p.assigned}` : '');
    ul.appendChild(li);
  });
}

document.getElementById('nomeForm').onsubmit = async (e) => {
  e.preventDefault();
  const nome = e.target.nome.value;
  const res = await fetch(`${API}/participant`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ name: nome })
  });
  const json = await res.json();
  if (json.error) {
    document.getElementById('nomeError').textContent = json.error;
  } else {
    document.getElementById('nomeError').textContent = '';
    fetchParticipantes();
    e.target.reset();
  }
};

document.getElementById('sortearBtn').onclick = async () => {
  const res = await fetch(`${API}/participant/draw`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type':'application/json' }
  });
  const json = await res.json();
  if (json.success) {
    document.getElementById('sorteioResult').textContent = 'Sorteio realizado!';
    fetchParticipantes();
  } else {
    document.getElementById('sorteioResult').textContent = json.error || 'Erro ao sortear';
  }
};

window.onload = fetchParticipantes;
