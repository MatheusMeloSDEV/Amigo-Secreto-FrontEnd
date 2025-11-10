// js/ver.js
const API = 'https://amigo-secreto-backend-md1k.onrender.com/api';
const params = new URLSearchParams(window.location.search);
const nome = params.get('nome');
if (nome) {
  fetch(`${API}/participant/${encodeURIComponent(nome)}`)
    .then(res => res.json())
    .then(json => {
      if (json.assigned) {
        document.getElementById('amigo').textContent = `Você tirou: ${json.assigned}`;
      } else {
        document.getElementById('amigo').textContent = json.error || 'Nome não encontrado ou sorteio não realizado!';
      }
    });
} else {
  document.getElementById('amigo').textContent = 'Nome não informado!';
}
