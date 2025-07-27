import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import LayoutSidebar from "./LayoutSidebar.jsx";
import LayoutNavbar from "./Layoutnavbar.jsx";

// Páginas sem layout
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";

// Páginas com Sidebar
import Home from "./pages/inicio/Home.jsx";
import Biografias from "./pages/inicio/Biografias.jsx";
import Mediunicas from "./pages/inicio/Mediunicas.jsx";
import Educacionais from "./pages/inicio/Educacionais.jsx";
import Publicas from "./pages/inicio/Publicas.jsx";
import Sociais from "./pages/inicio/Sociais.jsx";

// Páginas com Navbar
import Account from "./pages/account/account.jsx";
import Users from "./pages/users/users.jsx";
import EditUser from "./pages/edituser/edituser.jsx";
import EstoqueForm from "./pages/estoque/estoque.jsx";

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas com layout Sidebar */}
        <Route path="/" element={<LayoutSidebar />}>
          <Route index element={<Home />} />
          <Route path="biografias" element={<Biografias />} />
          <Route path="mediunicas" element={<Mediunicas />} />
          <Route path="educacionais" element={<Educacionais />} />
          <Route path="publicas" element={<Publicas />} />
          <Route path="sociais" element={<Sociais />} />
        </Route>

        {/* Rotas com layout Navbar */}
        <Route element={<LayoutNavbar />}>
          <Route path="/account" element={<Account />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/edit/:id_user" element={<EditUser />} />
          <Route path="/estoque" element={<EstoqueForm />} />
        </Route>

        {/* Rotas sem layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
