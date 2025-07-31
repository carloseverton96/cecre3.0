//páginas privadas (users)
// navbar.jsx

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Função de logout
  const handleLogout = () => {
    // Limpar dados de autenticação (exemplo com localStorage)
    localStorage.removeItem("authToken");

    // Redirecionar o usuário para a página de login
    navigate("/login");
  };

  return (
    <nav style={{ background: "#1f2937ff", color: "white", padding: "10px" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "15px" }}>
        <li>
          <Link to="/account" style={{ color: "white" }}>Account</Link>
        </li>
        <li>
          <Link to="/users" style={{ color: "white" }}>Users</Link>
        </li>
        <li>
          <Link to="/estoque" style={{ color: "white" }}>Estoque</Link>
        </li>
        <li>
          <Link to="users/news" style={{ color: "white" }}>Criar Post</Link>
        </li>
        <li>
          <Link to="/news" style={{ color: "white" }}>vizualizar Post</Link>
        </li>
        

        <li>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              color: "white",
              border: "none",
              padding: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
