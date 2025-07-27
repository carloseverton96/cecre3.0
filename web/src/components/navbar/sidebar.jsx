import {
  LayoutDashboard,
  Menu,
  BookOpen,
  User,
  Settings,
  Package,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/global.css"; // Caso queira usar um CSS separado para o Sidebar

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed);
  }, [collapsed]);

  const { pathname } = useLocation();

  const menuItems = [
    { to: "/", label: "Início", icon: <LayoutDashboard size={20} /> },
    { to: "/biografias", label: "Biografias", icon: <User size={20} /> },
    { to: "/educacionais", label: "Educacionais", icon: <BookOpen size={20} /> },
    { to: "/mediunicas", label: "Mediúnicas", icon: <Package size={20} /> },
    { to: "/publicas", label: "Públicas", icon: <Settings size={20} /> },
    { to: "/sociais", label: "Sociais", icon: <User size={20} /> },
    { to: "/news", label: "Noticias", icon: <User size={20} /> },
    { to: "/login", label: "Login", icon: <Settings size={20} /> },
  ];

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
      </nav>
    </div>
  );
}
