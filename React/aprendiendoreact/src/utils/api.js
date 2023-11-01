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
  getPaciente: (pacienteId) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/pacientes/${pacienteId}`, { headers });
  },
  actualizarPaciente: (data, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };

    return axios.put(`${BASE_URL}/pacientes/${id}`, data, { headers });
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
  getUsuario: (usuarioId) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/usuarios/${usuarioId}`, { headers });
  },
  actualizarUsuario: (data, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.put(`${BASE_URL}/usuarios/${id}`, data, { headers });
  },
  chat: (userInput, chatId, fecha) => {
    const headers = {
      "Content-Type": "application/json",
    };
    let chatData = { mensaje: "", fecha: fecha };
    if (!!userInput) {
      chatData = { mensaje: userInput, fecha: fecha };
    }
    return axios.post(`${BASE_URL}/chat/${chatId}`, chatData, { headers });
  },
  crearConsulta: (data) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.post(`${BASE_URL}/consultas`, data, { headers });
  },
  actualizarConsulta: (data, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.put(`${BASE_URL}/pacientes/consulta/${id}`, data, { headers });
  },
  getConsulta: (id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/pacientes/consulta/${id}`, { headers });
  },
  listarPacienteConsultas: (paciente_id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/pacientes/consultas/${paciente_id}`, {
      headers,
    });
  },
  crearCita: (data) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.post(`${BASE_URL}/citas/`, data, {
      headers,
    });
  },
  listarCitas: () => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/citas/`, {
      headers,
    });
  },
  actualizarCita: (data, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.put(`${BASE_URL}/citas/${id}`, data, {
      headers,
    });
  },
  getCita: (id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/citas/${id}`, {
      headers,
    });
  },
  crearHospitalizacion: (data) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.post(`${BASE_URL}/hospitalizaciones`, data, { headers });
  },
  actualizarHospitalizacion: (data, id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.put(`${BASE_URL}/pacientes/hospitalizacion/${id}`, data, {
      headers,
    });
  },
  getHospitalizacion: (id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/pacientes/hospitalizacion/${id}`, {
      headers,
    });
  },
  putHospitalizacion: (id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.put(`${BASE_URL}/hospitalizaciones/${id}/dar-de-alta`, {
      headers,
    });
  },
  listarPacienteHospitalizacion: (paciente_id) => {
    const authHeaders = authProvider.getAuthHeaders();
    const headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
    return axios.get(`${BASE_URL}/pacientes/hospitalizaciones/${paciente_id}`, {
      headers,
    });
  },
};

export default api;
