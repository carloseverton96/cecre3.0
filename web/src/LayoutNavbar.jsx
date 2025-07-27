import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";

export default function LayoutNavbar() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
