// Sidebar.jsx
import {
  LayoutDashboard,
  Menu,
  BookOpen,
  User,
  Settings,
  Package,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/global.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ✅ Verifica se o usuário está logado
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed);
  }, [collapsed]);

  // ✅ Função de logout
  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("sessionId");
      localStorage.removeItem("sessionEmail");
      localStorage.removeItem("sessionName");
      navigate("/login"); // Redireciona para login
      window.location.reload(); // Garante limpeza de estado (opcional)
    }
  };

  // ✅ Itens do menu
  const menuItems = [
    { to: "/", label: "Início", icon: <LayoutDashboard size={20} /> },
    { to: "/biografias", label: "Biografias", icon: <User size={20} /> },
    { to: "/educacionais", label: "Educacionais", icon: <BookOpen size={20} /> },
    { to: "/mediunicas", label: "Mediúnicas", icon: <Package size={20} /> },
    { to: "/publicas", label: "Públicas", icon: <Settings size={20} /> },
    { to: "/sociais", label: "Sociais", icon: <User size={20} /> },
    { to: "/news", label: "Notícias", icon: <User size={20} /> },
  ];

  // ✅ Último item: Login ou Logout
  const authItem = isLoggedIn
    ? {
        label: "Logout",
        icon: <Settings size={20} />,
        action: handleLogout,
        isLogout: true,
      }
    : {
        to: "/login",
        label: "Login",
        icon: <Settings size={20} />,
        isLogout: false,
      };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="title">
        {!collapsed && "Menu"}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            float: "right",
            background: "#8dc8ffff",
            border: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <Menu size={20} />
        </button>
      </div>

      <nav style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* Itens principais */}
        {menuItems.map(({ to, label, icon }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              style={{
                color: isActive ? "#b2e1f5ff" : "#5e5e5eff",
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {icon}
                {!collapsed && <span>{label}</span>}
              </div>
            </Link>
          );
        })}

        {/* Item de login/logout */}
        {authItem.isLogout ? (
          <button
            onClick={authItem.action}
            style={{
              background: "none",
              border: "none",
              color: "#5e5e5eff",
              textAlign: "left",
              cursor: "pointer",
              padding: "0",
              margin: "0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {authItem.icon}
              {!collapsed && <span>Logout</span>}
            </div>
          </button>
        ) : (
          <Link
            to={authItem.to}
            style={{
              color: pathname === "/login" ? "#b2e1f5ff" : "#5e5e5eff",
              fontWeight: pathname === "/login" ? "bold" : "normal",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {authItem.icon}
              {!collapsed && <span>{authItem.label}</span>}
            </div>
          </Link>
        )}
      </nav>
    </div>
  );
}