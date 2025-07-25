import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Account from "./pages/account/account.jsx";
import Users from "./pages/users/users.jsx";
import EditUser from "./pages/edituser/edituser.jsx";

import EstoqueForm from "./pages/estoque/estoque.jsx";


function Rotas() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/account" element={<Account />} />
            
            
            <Route path="/users" element={<Users />} />
            <Route path="/users/edit/:id_user" element={<EditUser />} />
            

            <Route path="/estoque" element={<EstoqueForm />} />
            
        </Routes>
    </BrowserRouter>
}

export default Rotas;