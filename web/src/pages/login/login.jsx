import { Link, useNavigate } from "react-router-dom";
import "../../styles/global.css";
import { useState } from "react";
import api from "../../constants/api.js";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("carloseverton1995@gmail.com");
  const [password, setPassword] = useState("123456");
  const [msg, setMsg] = useState("");

  async function ExecuteLogin() {
    setMsg("");

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem("sessionToken", response.data.token);
        localStorage.setItem("sessionId", response.data.id_admin);
        localStorage.setItem("sessionEmail", response.data.email);
        localStorage.setItem("sessionName", response.data.name);
        api.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        navigate("/estoque");
      } else {
        setMsg("Erro ao efetuar login. Tente novamente mais tarde.");
      }
    } catch (error) {
      if (error.response?.data.error)
        setMsg(error.response?.data.error);
      else
        setMsg("Erro ao efetuar login. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="main-content">
      
      <h1>Acesse sua conta</h1>

      <section>
        <p>Gerencie seus agendamentos de forma descomplicada.</p>

        <div className="mt-4">
          <input
            type="email"
            placeholder="E-mail"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <input
            type="password"
            placeholder="Senha"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-3 mb-4">
          <button onClick={ExecuteLogin} className="btn btn-primary w-100" type="button">
            Login
          </button>
        </div>

        {msg.length > 0 && (
          <div className="alert alert-danger" role="alert">
            {msg}
          </div>
        )}

        <div>
          <span className="me-1">Não tenho uma conta. </span>
          <Link to="/register">Criar agora!</Link>
        </div>
      </section>
    </div>
  );
}
