const API = 'https://amigo-secreto-backend-md1k.onrender.com/api';

document.getElementById('seeForm').onsubmit = async (e) => {
  e.preventDefault();
  const nome = e.target.nome.value;
  document.getElementById('amigo').textContent = '';
  document.getElementById('seeError').textContent = '';
  
  const res = await fetch(`${API}/participant/${encodeURIComponent(nome)}`);
  const json = await res.json();
  if (json.assigned) {
    document.getElementById('amigo').textContent = `Você tirou: ${json.assigned} 🎉`;
  } else {
    document.getElementById('seeError').textContent = json.error || 'Nome não encontrado ou sorteio não realizado!';
  }
};
