// js/see.js

const API = 'http://localhost:4000/api';

document.getElementById('seeForm').onsubmit = async (e) => {
  e.preventDefault();
  const nome = e.target.nome.value;
  const res = await fetch(`${API}/participant/${encodeURIComponent(nome)}`);
  const json = await res.json();
  if (json.assigned) {
    document.getElementById('amigo').textContent = `Você tirou: ${json.assigned}`;
    document.getElementById('seeError').textContent = '';
  } else {
    document.getElementById('amigo').textContent = '';
    document.getElementById('seeError').textContent = json.error || 'Nome não encontrado ou sorteio não realizado!';
  }
};
