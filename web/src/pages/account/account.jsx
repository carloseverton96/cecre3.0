import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import api from "../../constants/api.js";
import "../../styles/global.css";

function Account() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setMsg("");

    try {
      const response = await api.post("/users/register", form);

      if (response.data) {
        setMsg("Usuário criado com sucesso!");
        navigate("/appointments");
      } else {
        setMsg("Erro ao criar conta. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.error || "Erro ao criar conta. Tente novamente mais tarde.";
      setMsg(errorMsg);
    }
  };

  return (
    <div className="row">
      <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form className="form-signin">
          <img src={logo} alt="Logo" className="logo mb-4" />
          <h5 className="mb-5">Crie um novo usuário CLIENTE.</h5>
          <h5 className="mb-4 text-secondary">Preencha os campos abaixo</h5>

          <div className="mt-4">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              className="form-control"
              onChange={handleChange}
              value={form.name}
            />
          </div>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="form-control"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <div className="mt-2">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              className="form-control"
              onChange={handleChange}
              value={form.password}
            />
          </div>

          <div className="mt-3 mb-5">
            <button onClick={handleSubmit} className="btn btn-primary w-100" type="button">
              Cadastrar usuário
            </button>
          </div>

          {msg && (
            <div className={`alert ${msg.includes("sucesso") ? "alert-success" : "alert-danger"}`} role="alert">
              {msg}
            </div>
          )}

          <div>
            <Link to="/users">Voltar para lista de usuários</Link>
          </div>
        </form>
      </div>

      
    </div>
  );
}

export default Account;
