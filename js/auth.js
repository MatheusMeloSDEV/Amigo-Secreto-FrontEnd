// js/auth.js

const API = 'https://amigo-secreto-backend-md1k.onrender.com';

document.getElementById('loginForm').onsubmit = async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ username, password })
  });
  const json = await res.json();
  if (json.token) {
    localStorage.setItem('token', json.token);
    window.location = 'painel-organizador.html';
  } else {
    document.getElementById('loginError').textContent = json.error || 'Falha no login';
  }
};

document.getElementById('registerForm').onsubmit = async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ username, password })
  });
  const json = await res.json();
  if (json.success) {
    document.getElementById('registerError').textContent = 'Cadastro realizado! Faça login.';
  } else {
    document.getElementById('registerError').textContent = json.error || 'Falha no cadastro';
  }
};
