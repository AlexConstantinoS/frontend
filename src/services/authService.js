
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function request(endpoint, { method = "GET", body, token } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || "Ocurrio un error");
  }

  return data;
}

export function registerUser({ name, email, password }) {
  return request("/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
}

export function loginUser({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function getCurrentUser(token) {
  return request("/me", { token });
}
