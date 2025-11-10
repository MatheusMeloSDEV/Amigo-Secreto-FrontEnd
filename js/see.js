const API = 'https://amigo-secreto-backend-md1k.onrender.com/api';

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const nome = params.get('nome');

  if (nome) {
    fetch(`${API}/participant/${encodeURIComponent(nome)}`)
      .then(res => res.json())
      .then(json => {
        if (json.assigned) {
          document.getElementById('amigo').textContent = `Você tirou: ${json.assigned}`;
          document.getElementById('seeError').textContent = '';
        } else {
          document.getElementById('amigo').textContent = '';
          document.getElementById('seeError').textContent = json.error || 'Nome não encontrado ou sorteio não realizado!';
        }
      })
      .catch(() => {
        document.getElementById('seeError').textContent = 'Erro ao conectar à API.';
      });
  } else {
    document.getElementById('seeError').textContent = 'Nome não informado na URL!';
  }
};
