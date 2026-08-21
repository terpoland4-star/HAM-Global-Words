export const API_BASE = "https://hamadine.mooo.com/ham-api";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "client" | "admin";
  createdAt?: string;
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

export function setToken(token: string) {
  localStorage.setItem("authToken", token);
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  return response;
}
