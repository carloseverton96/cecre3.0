import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../constants/api.js";
import Navbar from "../../components/navbar/navbar.jsx";

function EstoqueForm() {
    const { id_estoque } = useParams();
    const navigate = useNavigate();
    const [estoque, setEstoque] = useState({
        name_produto: "",
        descricao: "",
        quantidade: ""
    });

    useEffect(() => {
        if (id_estoque) {
            loadEstoque();
        }
    }, [id_estoque]);

    async function loadEstoque() {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(
                `/admin/estoque/${id_estoque}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setEstoque(response.data);
        } catch (error) {
            alert("Erro ao carregar dados do estoque.");
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEstoque((prevState) => ({ ...prevState, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            if (id_estoque) {
                await api.put(
                    `/admin/estoque/${id_estoque}`,
                    estoque,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert("Produto atualizado com sucesso!");
            } else {
                await api.post(
                    "/admin/estoque/",
                    estoque,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert("Produto cadastrado com sucesso!");
            }
            navigate("/estoque");
        } catch (error) {
            alert("Erro ao salvar os dados do produto.");
        }
    }

    return (
        <>
            <Navbar />
            <div className="container mt-page">
                <h2>{id_estoque ? "Editar Produto" : "Cadastrar Produto"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome do Produto</label>
                        <input
                            type="text"
                            name="name_produto"
                            value={estoque.name_produto}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descrição</label>
                        <input
                            type="text"
                            name="descricao"
                            value={estoque.descricao}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantidade</label>
                        <input
                            type="number"
                            name="quantidade"
                            value={estoque.quantidade}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        {id_estoque ? "Atualizar" : "Cadastrar"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default EstoqueForm;
