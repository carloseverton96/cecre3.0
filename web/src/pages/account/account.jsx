import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";
import api from "../../constants/api.js";
import "../../styles/global.css"


function Account() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    // async function ExecuteAccount() {
    //     setMsg("");

        

    //     try {
    //         const response = await api.post("/users/register", {
    //             name,
    //             email,
    //             password
    //         });

    //         if (response.data) {
    //             localStorage.setItem("sessionToken", response.data.token);
    //             localStorage.setItem("sessionId", response.data.id_user);
    //             localStorage.setItem("sessionEmail", email);
    //             localStorage.setItem("sessionName", name);
    //             api.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    //             navigate("/appointments");
    //         } else {
    //             setMsg("Erro ao criar conta. Tente novamente mais tarde.");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         if (error.response?.data.error) {
    //             setMsg(error.response.data.error);
    //         } else {
    //             setMsg("Erro ao criar conta. Tente novamente mais tarde.");
    //         }
    //     }
    // }

    async function ExecuteAccount() {
        setMsg("");
    
        try {
            const response = await api.post("/users/register", {
                name,
                email,
                password
            });
    
            if (response.data) {
                setMsg("Usuário criado com sucesso!");
                // Aqui você pode adicionar alguma lógica para mostrar uma mensagem de sucesso ao usuário
                navigate("/appointments");
            } else {
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");
            }
        } catch (error) {
            console.error(error);
            if (error.response?.data.error) {
                setMsg(error.response.data.error);
            } else {
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");
            }
        }
    }

    return (
        <div className="row">
            <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
                <form className="form-signin">
                    <img src={logo} alt="Logo" className="logo mb-4" />
                    <h5 className="mb-5">Crie um novo usuário CLIENTE.</h5>
                    <h5 className="mb-4 text-secondary">Preencha os campos abaixo</h5>

                    <div className="mt-4">
                        <input 
                            type="text" 
                            placeholder="Nome"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className="mt-2">
                        <input 
                            type="email" 
                            placeholder="E-mail"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mt-2">
                        <input 
                            type="password" 
                            placeholder="Senha"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    
                    <div className="mt-3 mb-5">
                        <button onClick={ExecuteAccount} className="btn btn-primary w-100" type="button">
                            Cadastrar usuário
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
                    {/* <div>
                        <span className="me-1">Já tenho uma conta.</span>
                        <Link to="/login">Acessar agora!</Link>
                    </div> */}
                </form>
            </div>

            <div className="col-sm-7">
                <img src={fundo} alt="Fundo" className="background-login" />
            </div>
        </div>
    );
}

export default Account;
