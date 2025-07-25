import 'react-confirm-alert/src/react-confirm-alert.css';
import "./users.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import api from "../../constants/api.js";
import { confirmAlert } from "react-confirm-alert";

function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const loadUsers = useCallback(async () => {
        try {
            const response = await api.get("/users");
            if (response.data) {
                setUsers(response.data);
            }
        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status === 401) return navigate("/");
                alert(error.response?.data.error);
            } else {
                alert("Erro ao listar usuários.");
            }
        }
    }, [navigate]);

    const clickEdit = (id_user) => {
        navigate("/users/edit/" + id_user);
    };

    const clickDelete = (id_user) => {
        confirmAlert({
            title: "Exclusão",
            message: "Confirma exclusão deste usuário?",
            buttons: [
                {
                    label: "Sim",
                    onClick: () => deleteUser(id_user)
                },
                {
                    label: "Não",
                    onClick: () => {}
                }
            ]
        });
    };

    const deleteUser = async (id) => {
        try {
            const response = await api.delete("/users/" + id);
            if (response.data) {
                loadUsers();
            }
        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status === 401) return navigate("/");
                alert(error.response?.data.error);
            } else {
                alert("Erro ao excluir usuário.");
            }
        }
    };

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    return (
        <div className="container-fluid mt-page">
            <Navbar />
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="d-inline">Usuários</h2>
                    <Link to="/account" className="btn btn-outline-primary ms-5 mb-2">
                        Novo Usuário
                    </Link>
                </div>
            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col" className="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id_user}>
                                <td>{user.id_user}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="text-end">
                                    <button
                                        onClick={() => clickEdit(user.id_user)}
                                        className="btn btn-sm btn-primary me-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => clickDelete(user.id_user)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
