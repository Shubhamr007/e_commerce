// Centralized API service for admin frontend
const API_BASE = 'http://localhost:4004';

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function changePassword(currentPassword, newPassword, token) {
  const res = await fetch(`${API_BASE}/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });
  return res.json();
}

export async function approveUser(userId, token) {
  const res = await fetch(`${API_BASE}/users/${userId}/approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function rejectUser(userId, token) {
  const res = await fetch(`${API_BASE}/users/${userId}/reject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// Add more API methods as needed (users, products, etc.)
