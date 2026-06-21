const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");

export function getToken() {
  return localStorage.getItem("lumix_token");
}

export function getUser() {
  const raw = localStorage.getItem("lumix_user");
  return raw ? JSON.parse(raw) : null;
}

export function saveSession(payload) {
  localStorage.setItem("lumix_token", payload.token);
  localStorage.setItem("lumix_user", JSON.stringify(payload.user));
}

export function clearSession() {
  localStorage.removeItem("lumix_token");
  localStorage.removeItem("lumix_user");
}

export async function api(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const token = getToken();
  if (token && !path.startsWith("/auth/")) {
    headers.Authorization = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }
  return data;
}

export function imageFor(movie) {
  return movie.thumbnail_url || "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg";
}
