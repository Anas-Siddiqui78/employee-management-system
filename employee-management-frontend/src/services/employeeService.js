import { getToken } from "./authService";

//const API_BASE_URL = "http://localhost:8081";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081" ;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getToken()}`
});

export const createEmployee = (employee) => {
  return fetch(`${API_BASE_URL}/api/employees`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(employee)
  }).then(res => res.json());
};

export const getAllEmployees = () => {
  return fetch(`${API_BASE_URL}/api/employees`, {
    headers: getHeaders()
  }).then(res => res.json());
};

export const getEmployeeById = (id) => {
  return fetch(`${API_BASE_URL}/api/employees/${id}`, {
    headers: getHeaders()
  }).then(res => res.json());
};

export const updateEmployee = (id, employee) => {
  return fetch(`${API_BASE_URL}/api/employees/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(employee)
  }).then(res => res.json());
};

export const deleteEmployee = (id) => {
  return fetch(`${API_BASE_URL}/api/employees/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  }).then(res => res.json());
};

export const searchEmployeeByName = (name) => {
  return fetch(`${API_BASE_URL}/api/employees/search?name=${name}`, {
    headers: getHeaders()
  }).then(res => res.json());
};

