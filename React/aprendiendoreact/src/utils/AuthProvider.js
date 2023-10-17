import { Roles } from "./constants";

const key = "session";

const authProvider = {
  saveSession: (session) => {
    localStorage.setItem(key, JSON.stringify(session));
  },

  getSession: () => {
    return localStorage.getItem(key);
  },
  checkAuth: () => {
    const session = JSON.parse(localStorage.getItem(key));

    return !!session?.token;
  },
  getUsuario: () => {
    const session = JSON.parse(localStorage.getItem(key));
    return session.user;
  },
  checkRoutePermissions: (route) => {
    const _session = localStorage.getItem(key);

    if (!_session) {
      return false;
    }

    const {
      user: { rol },
    } = JSON.parse(_session);

    if (route === "pacientes") {
      if (
        rol === Roles.ADMIN ||
        rol === Roles.DOCTOR ||
        rol === Roles.ENFERMERO ||
        rol === Roles.SECRETARIA
      ) {
        return true;
      }

      return false;
    } else if (route === "usuarios") {
      if (rol === Roles.ADMIN) {
        return true;
      }
      return false;
    }

    return false;
  },
  deleteSession: () => {
    localStorage.removeItem(key);
  },
};

export default authProvider;
