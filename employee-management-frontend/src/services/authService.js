const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

export const loginUser = (email, password) => {
  return fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  }).then(res => res.json());
};

export const registerUser = (name, email, password) => {
  return fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  }).then(res => res.json());
};

export const saveToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const saveUserRole = (role) => {
  localStorage.setItem("userRole", role);
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const getUserRole = () => {
  return localStorage.getItem("userRole") || "USER";
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const isAdmin = () => {
  return getUserRole() === "ADMIN";
};
