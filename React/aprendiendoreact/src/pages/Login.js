import React, { useEffect, useState } from "react";
import DefaulLayout from "../components/DefaultLayout";
import authProvider from "../utils/AuthProvider";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

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
      navigate("/pacientes");
    });
  };

  useEffect(() => {
    if (authProvider.checkAuth()) {
      navigate("/pacientes");
    }
  }, [navigate]);

  return (
    <DefaulLayout title="Login">
      <div id="center">
        <form className="full-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              onChange={handleChange}
              value={email}
              type="email"
              name="email"
              placeholder="ingrese el correo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">password</label>
            <input
              onChange={handleChange}
              value={password}
              type="password"
              name="password"
              placeholder="ingrese password"
            />
          </div>
          <input type="submit" value="Confirmar" className="btn btn-success" />
        </form>
      </div>
    </DefaulLayout>
  );
}
export default Login;
