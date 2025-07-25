import bcrypt from "bcrypt";

import jwt from "../token.js";
import repositoryEstoque from "../repositories/repository.estoque.js";

async function InserirEstoque(name_produto, descricao, quantidade) {

    
    const estoque = await repositoryEstoque.InserirEstoque(name_produto, descricao, quantidade);

    estoque.token = jwt.CreateToken(estoque.id_estoque);

    return estoque;
}

async function Login(email, password) {

    const user = await repoUser.ListarByEmail(email);

    if (user.length == 0)
        return [];
    else {
        if (await bcrypt.compare(password, user.password)) {
            delete user.password;

            user.token = jwt.CreateToken(user.id_user);

            return user;
        } else
            return [];
    }

    return user;
}

async function Profile(id_user) {

    const user = await repoUser.Profile(id_user);

    return user;
}

async function InserirAdmin(name, email, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await repoUser.InserirAdmin(name, email, hashPassword);

    user.token = jwt.CreateToken(user.id_user);

    return user;
}

async function LoginAdmin(email, password) {

    const user = await repoUser.ListarByEmailAdmin(email);

    if (user.length == 0)
        return [];
    else {
        if (await bcrypt.compare(password, user.password)) {
            delete user.password;

            user.token = jwt.CreateToken(user.id_user);

            return user;
        } else
            return [];
    }

    return user;
}

async function Listar() {

    const users = await repoUser.Listar();

    return users;
}


async function Excluir(id_user) {
    await repoUser.Excluir(id_user);
}

async function ListarPorId(id_user) {
    const user = await repoUser.ListarPorId(id_user);
    return user;
}

async function Editar(id_user, name, email, password) {
    let hashPassword = null;
    if (password) {
        hashPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await repoUser.Editar(id_user, name, email, hashPassword);
    return updatedUser;
}



export default { InserirEstoque, Login, Profile, InserirAdmin, LoginAdmin, Listar, Editar, Excluir, ListarPorId }