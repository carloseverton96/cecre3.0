import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/errorboundary/ErrorBoundary.jsx";




// Layouts
import LayoutSidebar from "./LayoutSidebar.jsx";
import LayoutNavbar from "./LayoutNavbar.jsx";

// [O restante dos imports permanece igual]
import Biografias from './pages/inicio/Biografias';
import Mediunicas from './pages/inicio/Mediunicas';
import Educacionais from './pages/inicio/Educacionais';
import Publicas from './pages/inicio/Publicas';
import Sociais from './pages/inicio/Sociais';
import Noticias from './pages/inicio/Noticias';
import VisualizarNoticia from './pages/inicio/VisualizarNoticia';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Account from './pages/account/account';
import EstoqueForm from './pages/estoque/estoque';
import NewsForm from './pages/news/NewsForm';
import HomeAdmin from './pages/homeadmin/HomeAdmin';
import Home from './pages/inicio/Home.jsx';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Público: Sidebar com Error Boundary */}
        <Route path="/" element={
          <ErrorBoundary>
            <LayoutSidebar />
          </ErrorBoundary>
        }>
          <Route index element={<Home />} />
          <Route path="biografias" element={<Biografias />} />
          <Route path="mediunicas" element={<Mediunicas />} />
          <Route path="educacionais" element={<Educacionais />} />
          <Route path="publicas" element={<Publicas />} />
          <Route path="sociais" element={<Sociais />} />
          <Route path="news" element={<Noticias />} /> 
          <Route path="visualizar" element={<VisualizarNoticia />} /> 
        </Route>

        {/* Páginas sem layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout Privado: Navbar */}
        <Route element={<LayoutNavbar />}>
          <Route path="/account" element={<Account />} />
          <Route path="/estoque" element={<EstoqueForm />} />
          <Route path="/users/news" element={<NewsForm />} />
          <Route path="/homeadmin" element={<HomeAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Rotas;