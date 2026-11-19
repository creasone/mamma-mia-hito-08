export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || data.message || "No fue posible completar la solicitud.");
  return data;
}
