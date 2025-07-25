import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";
import api from "../../constants/api.js";
import "./edituser.css"; // Use o mesmo estilo em CSS para manter consistência

function EditUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id_user } = useParams(); // Assume que a rota tem o parâmetro id_user

    useEffect(() => {
        // Carrega os dados do usuário ao montar o componente
        async function loadUserData() {
            try {
                const response = await api.get(`/users/${id_user}`); // Endpoint corrigido
                const { name, email } = response.data;
                setName(name);
                setEmail(email);
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                setMsg("Erro ao carregar dados do usuário.");
            }
        }
        loadUserData();
    }, [id_user]);

    async function handleUpdateUser() {
        setMsg("");

        try {
            const response = await api.put(`/users/${id_user}`, {
                name,
                email,
            });

            if (response.status === 200) {
                setMsg("Usuário atualizado com sucesso!");
                navigate("/users"); // Redireciona para a lista de usuários
            } else {
                setMsg("Erro ao atualizar usuário. Tente novamente mais tarde.");
            }
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            setMsg("Erro ao atualizar usuário. Tente novamente mais tarde.");
        }
    }

    return (
        <div className="row">
            <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
                <form className="form-signin">
                    <img src={logo} alt="Logo" className="logo mb-4" />
                    <h5 className="mb-5">Edite os dados do usuário.</h5>
                    <h5 className="mb-4 text-secondary">Atualize os campos abaixo</h5>

                    <div className="mt-4">
                        <input 
                            type="text" 
                            placeholder="Nome"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className="mt-2">
                        <input 
                            type="email" 
                            placeholder="E-mail"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    
                    <div className="mt-3 mb-5">
                        <button onClick={handleUpdateUser} className="btn btn-primary w-100" type="button">
                            Salvar Alterações
                        </button>
                    </div>

                    {msg.length > 0 && (
                        <div className="alert alert-danger" role="alert">
                            {msg}
                        </div>
                    )}

                    <div>
                        <Link aschild to="/users">Voltar para lista de usuários</Link>
                    </div>
                </form>
            </div>

            <div className="col-sm-7">
                <img src={fundo} alt="Fundo" className="background-login" />
            </div>
        </div>
    );
}

export default EditUser;
