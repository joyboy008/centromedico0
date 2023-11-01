import React, { useEffect, useState } from "react";
import DefaulLayout from "../components/DefaultLayout";
import authProvider from "../utils/AuthProvider";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import Alert from "react-bootstrap/Alert";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showValidationAlert, setShowValidationAlert] = useState(false);

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
    api
      .login(data)
      .then((response) => {
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
      })
      .catch((err) => {
        setShowValidationAlert(true);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "enter") {
      const form = document.querySelector("#login-form");
      if (form) {
        form.submit();
      }
    }
  };
  useEffect(() => {
    if (authProvider.checkAuth()) {
      navigate("/pacientes-listado");
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <DefaulLayout title="Login">
      <div className={`pt-4 ${showValidationAlert ? "" : "hidden"}`}>
        <Alert key="password-warning" variant="warning">
          Usuario o Password Incorrecto
        </Alert>
      </div>

      <div id="center-body">
        <form id="login-form" className="wrapper" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              onChange={handleChange}
              value={email}
              type="email"
              autoComplete="off"
              name="email"
              className="FaUserDoctor"
              pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
              placeholder="email"
              onFocus={() => {
                if (showValidationAlert) {
                  setShowValidationAlert(false);
                }
              }}
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
              onFocus={() => {
                if (showValidationAlert) {
                  setShowValidationAlert(false);
                }
              }}
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
