import serviceEstoque from "../services/service.estoque.js";
import serviceUser from "../services/service.estoque.js";

async function InserirEstoque(req, res) {

    const { name_produto, descricao, quantidade } = req.body;

    const estoque = await serviceEstoque.InserirEstoque(name_produto, descricao, quantidade);

    res.status(201).json(estoque);
}

async function Login(req, res) {

    const { email, password } = req.body;

    const user = await serviceUser.Login(email, password);

    if (user.length == 0)
        res.status(401).json({ error: "E-mail ou senha inválida" });
    else
        res.status(200).json(user);
}

async function Profile(req, res) {

    const id_user = req.id_user;
    const user = await serviceUser.Profile(id_user);

    res.status(200).json(user);
}

async function InserirAdmin(req, res) {

    const { name, email, password } = req.body;

    const user = await serviceUser.InserirAdmin(name, email, password);

    res.status(201).json(user);
}

async function LoginAdmin(req, res) {

    const { email, password } = req.body;

    const user = await serviceUser.LoginAdmin(email, password);

    if (user.length == 0)
        res.status(401).json({ error: "E-mail ou senha inválida" });
    else
        res.status(200).json(user);
}

async function Listar(req, res) {

    const users = await serviceUser.Listar();

    res.status(200).json(users);
}

async function Excluir(req, res) {
    const { id_user } = req.params;

    try {
        await serviceUser.Excluir(id_user);
        res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({ error: "Erro ao excluir usuário" });
    }
}

async function ListarPorId(req, res) {
    const { id_user } = req.params;
    try {
        const user = await serviceUser.ListarPorId(id_user);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro ao buscar usuário" });
    }
}

async function Editar(req, res) {
    const { id_user } = req.params;
    const { name, email, password } = req.body;

    try {
        const updatedUser = await serviceUser.Editar(id_user, name, email, password);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
}

export default { InserirEstoque, Login, Profile, InserirAdmin, LoginAdmin, Listar, Editar, Excluir, ListarPorId }