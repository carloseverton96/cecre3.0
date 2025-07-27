import { Outlet } from "react-router-dom";
import Sidebar from "./components/navbar/sidebar.jsx";

export default function LayoutSidebar() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
}
