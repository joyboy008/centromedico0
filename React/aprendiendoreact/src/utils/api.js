import axios from "axios";
import { BASE_URL } from "./constants";

const api = {
  login: (credentials) => {
    return axios.post(`${BASE_URL}/auth/login`, credentials);
  },
};

export default api;
