import React, { useEffect, useState } from "react";
import DefaulLayout from "../components/DefaultLayout";
import authProvider from "../utils/AuthProvider";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    api.login(data).then((response) => {
      const session = {
        user: {
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email,
          rol: response.data.rol,
        },
        token: response.data.token,
      };
      authProvider.saveSession(session);
      navigate("/pacientes-listado");
    });
  };

  useEffect(() => {
    if (authProvider.checkAuth()) {
      navigate("/pacientes-listado");
    }
  }, [navigate]);

  return (
    <DefaulLayout title="Login">
      <div id="center-body">
        <form className="wrapper" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              onChange={handleChange}
              value={email}
              type="email"
              autoComplete="off"
              name="email"
              className="FaUserDoctor"
              placeholder="email"
              required
            />
            <FaUserDoctor className="i" />
          </div>
          <div className="input-box">
            <input
              onChange={handleChange}
              value={password}
              type="password"
              name="password"
              placeholder="password"
              required
            />
            <RiLockPasswordLine className="i" />
          </div>
          <input type="submit" value="Confirmar" className="boton" />
        </form>
      </div>
    </DefaulLayout>
  );
}
export default Login;
