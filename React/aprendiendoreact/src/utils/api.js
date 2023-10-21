import axios from "axios";
import { BASE_URL } from "./constants";
import authProvider from "./AuthProvider";

const api = {
  login: (credentials) => {
    return axios.post(`${BASE_URL}/auth/login`, credentials);
  },
  crearPaciente: (data) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };

    return axios.post(`${BASE_URL}/pacientes`, data, { headers });
  },
  listarPacientes: () => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/pacientes`, { headers });
  },
  crearUsuario: (data) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };

    return axios.post(`${BASE_URL}/usuarios`, data, { headers });
  },
  listarUsuarios: () => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/usuarios`, { headers });
  },
};

export default api;
