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

      const { token, id_admin, email: userEmail, name } = response.data;

      if (!token) {
        setMsg("Token não recebido. Verifique suas credenciais.");
        return;
      }

      // ✅ Salva com chaves consistentes
      localStorage.setItem("token", token);
      localStorage.setItem("sessionId", id_admin);
      localStorage.setItem("sessionEmail", userEmail);
      localStorage.setItem("sessionName", name);

      // ✅ Define o header de autorização global
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // ✅ Redireciona
      navigate("/estoque");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Erro ao efetuar login. Tente novamente.";
      setMsg(errorMsg);
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

        {msg && (
          <div className="alert alert-danger" role="alert">
            {msg}
          </div>
        )}

        <div>
          <span className="me-1">Acesso restrito aos administradores. </span>
          <p><Link to="/register">Criar conta agora!</Link></p>
          <p><Link to="/">Voltar à página inicial.</Link></p>
        </div>

      </section>
    </div>
  );
}