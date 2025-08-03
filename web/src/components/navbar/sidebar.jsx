// Sidebar.jsx
import {
  LayoutDashboard,
  Menu,
  BookOpen,
  User,
  Settings,
  Package,
  MenuIcon,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/global.css";


export default function Sidebar({ collapsed, setCollapsed, isOpen = true, onClose }) {
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
      navigate("/login");
    }
  };

  // ✅ Itens do menu
  const menuItems = [
    { to: "/", label: "Início", icon: <LayoutDashboard size={20} /> },
    { to: "/news", label: "Notícias", icon: <User size={20} /> },
    { to: "/publicas", label: "Públicas", icon: <Settings size={20} /> },
    { to: "/educacionais", label: "Educacionais", icon: <BookOpen size={20} /> },
    { to: "/mediunicas", label: "Mediúnicas", icon: <Package size={20} /> },
    { to: "/sociais", label: "Sociais", icon: <User size={20} /> },
    { to: "/biografias", label: "Biografias", icon: <User size={20} /> },
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

  // Não renderiza em mobile se não estiver aberta
  if (!isOpen) return null;

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="title">
        <span>{!collapsed && "Menu"}</span>
        <button
          onClick={() => {
            // Em mobile, fecha a sidebar
            if (window.innerWidth <= 768) {
              onClose();
            } else {
              setCollapsed(!collapsed);
            }
          }}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          <MenuIcon size={20} />
        </button>
      </div>

      <nav>
        {/* Itens principais */}
        {menuItems.map(({ to, label, icon }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => {
                // Fecha a sidebar em mobile ao clicar
                if (window.innerWidth <= 768) {
                  onClose();
                }
              }}
              className={isActive ? "active" : ""}
            >
              <div>
                {icon}
                {!collapsed && <span>{label}</span>}
              </div>
            </Link>
          );
        })}

        {/* Item de login/logout */}
        {authItem.isLogout ? (
          <button
            onClick={() => {
              authItem.action();
              if (window.innerWidth <= 768) {
                onClose();
              }
            }}
            className="auth-button"
          >
            <div>
              {authItem.icon}
              {!collapsed && <span>{authItem.label}</span>}
            </div>
          </button>
        ) : (
          <Link
            to={authItem.to}
            onClick={() => {
              if (window.innerWidth <= 768) {
                onClose();
              }
            }}
            className={pathname === "/login" ? "active" : ""}
          >
            <div>
              {authItem.icon}
              {!collapsed && <span>{authItem.label}</span>}
            </div>
          </Link>
        )}
      </nav>
    </div>
  );
}