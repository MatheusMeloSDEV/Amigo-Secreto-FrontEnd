const API = 'https://amigo-secreto-backend-md1k.onrender.com/api';

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const nome = params.get('nome');
  document.getElementById('amigo').textContent = '';
  document.getElementById('seeError').textContent = '';

  if (nome) {
    document.getElementById('nomeinfo').textContent = `Olá, ${nome}!`;
    document.getElementById('revelarBtn').onclick = async () => {
      const res = await fetch(`${API}/participant/${encodeURIComponent(nome)}`);
      const json = await res.json();
      if (json.assigned) {
        document.getElementById('amigo').textContent = `Você tirou: ${json.assigned} 🎉`;
        document.getElementById('seeError').textContent = '';
      } else {
        document.getElementById('seeError').textContent = json.error || 'Nome não encontrado ou sorteio não realizado!';
        document.getElementById('amigo').textContent = '';
      }
    };
  } else {
    document.getElementById('nomeinfo').textContent = 'Nome não informado na URL!';
    document.getElementById('revelarBtn').disabled = true;
  }
};
