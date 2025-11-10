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
  const urlBase = 'https://amigo-secreto-frontend-4pzo.onrender.com/painel-participante.html'; // ajuste conforme necessário

  participantes.forEach(p => {
    const li = document.createElement('li');
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.marginBottom = "10px";

    // Nome como link
    const link = document.createElement('a');
    link.href = `${urlBase}?nome=${encodeURIComponent(p.name)}`;
    link.textContent = p.name;
    link.target = "_blank";
    link.style.fontWeight = "bold";
    link.style.flex = "1";
    li.appendChild(link);

    // Ícone de copiar (estilizado pequeno, minimalista)
    if (p.assigned) {
      const copyBtn = document.createElement('button');
      copyBtn.className = "copy-btn"; // classe específica!
      copyBtn.innerHTML = '🔗';
      copyBtn.title = "Copiar link";
      copyBtn.style.fontSize = "1rem";
      copyBtn.style.padding = "2px 6px";
      copyBtn.style.marginLeft = "6px";
      copyBtn.style.background = "transparent";
      copyBtn.style.border = "none";
      copyBtn.style.cursor = "pointer";
      copyBtn.style.transition = "color .2s";
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(link.href);
        copyBtn.innerHTML = '✔️';
        setTimeout(() => copyBtn.innerHTML = '🔗', 1400);
      };
      li.appendChild(copyBtn);
    }
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
