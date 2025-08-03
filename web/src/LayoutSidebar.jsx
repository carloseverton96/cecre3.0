// LayoutSidebar.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./components/navbar/sidebar.jsx";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export default function LayoutSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Atualize para verificar se está no navegador
  useEffect(() => {
    // Só executa no cliente
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        if (!mobile) setSidebarOpen(false);
      }
    };

    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  // Recupera estado salvo da sidebar (com verificação)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("sidebar-collapsed");
      if (saved === "true") setCollapsed(true);
    }
  }, []);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false); // Fecha sidebar em desktop
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Recupera estado salvo da sidebar
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved === "true") setCollapsed(true);
  }, []);

  // Fecha sidebar ao clicar no overlay
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <div className="app-container">
      {/* Botão hamburguer para mobile */}
      {isMobile && (
        <button 
          className="mobile-menu-button" 
          onClick={toggleMobileSidebar}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isOpen={isMobile ? sidebarOpen : true}
        onClose={closeSidebar}
      />

      {/* Overlay em mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Conteúdo principal */}
      <main 
        className={`main-content ${collapsed ? "collapsed" : ""} ${
          isMobile && sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}