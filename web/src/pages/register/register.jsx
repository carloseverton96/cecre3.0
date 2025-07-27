import { Link, useNavigate } from "react-router-dom";
import "../../styles/global.css";
import { useState } from "react";
import api from "../../constants/api.js";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");

  async function ExecuteAccount() {
    setMsg("");

    if (password !== password2)
      return setMsg("As senhas não conferem. Digite novamente.");

    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem("sessionToken", response.data.token);
        localStorage.setItem("sessionId", response.data.id_admin);
        localStorage.setItem("sessionEmail", email);
        localStorage.setItem("sessionName", name);
        api.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        navigate("/estoque");
      } else {
        setMsg("Erro ao criar conta. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data.error)
        setMsg(error.response?.data.error);
      else
        setMsg("Erro ao criar conta. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="main-content">
      <h1>Crie sua conta</h1>

      <section>
        <p>Preencha os campos abaixo para se cadastrar.</p>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Nome"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <input
            type="email"
            placeholder="E-mail"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <input
            type="password"
            placeholder="Senha"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <input
            type="password"
            placeholder="Confirme a senha"
            className="form-control"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <div className="mt-3 mb-4">
          <button onClick={ExecuteAccount} className="btn btn-primary w-100" type="button">
            Criar minha conta
          </button>
        </div>

        {msg.length > 0 && (
          <div className="alert alert-danger" role="alert">
            {msg}
          </div>
        )}

        <div>
          <span className="me-1">Já tenho uma conta.</span>
          <Link to="/login">Acessar agora!</Link>
        </div>
      </section>
    </div>
  );
}
