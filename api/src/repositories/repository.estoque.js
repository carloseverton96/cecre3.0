import { query } from "../database/sqlite.js";

async function InserirEstoque(name_produto, descricao, quantidade) {

    let sql = `insert into estoque(name_produto, descricao, quantidade) values(?, ?, ?)
    returning id_estoque`;

    const estoque = await query(sql, [name_produto, descricao, quantidade]);

    return estoque[0];
}

async function ListarByEmail(email) {

    let sql = `select * from users where email = ?`;

    const user = await query(sql, [email]);

    if (user.length == 0)
        return [];
    else
        return user[0];
}

async function Profile(id_user) {

    let sql = `select id_user, name, email from users where id_user = ?`;

    const user = await query(sql, [id_user]);

    return user[0];
}

async function InserirAdmin(name, email, password) {

    let sql = `insert into admins(name, email, password) values(?, ?, ?)
    returning id_admin`;

    const user = await query(sql, [name, email, password]);

    return user[0];
}

async function ListarByEmailAdmin(email) {

    let sql = `select * from admins where email = ?`;

    const user = await query(sql, [email]);

    if (user.length == 0)
        return [];
    else
        return user[0];
}

async function Listar() {

    let sql = `select id_user, name, email from users order by name`;

    const users = await query(sql, []);
    return users;
}

async function ListarPorId(id_user) {
    const sql = `SELECT id_user, name, email FROM users WHERE id_user = ?`;
    const user = await query(sql, [id_user]);
    return user[0]; // Retorna o primeiro item encontrado
}

async function Editar(id_user, name, email, password) {
    let sql = `UPDATE users SET name = ?, email = ?`;
    const params = [name, email];

    if (password) {
        sql += `, password = ?`;
        params.push(password);
    }

    sql += ` WHERE id_user = ?`;
    params.push(id_user);

    await query(sql, params);
    return { id_user, name, email }; // Retorna os dados atualizados
}


async function Excluir(id_user) {
    const sql = `delete from users where id_user = ?`;
    await query(sql, [id_user]);
}



export default { InserirEstoque, ListarByEmail, Profile, InserirAdmin, ListarByEmailAdmin, Listar, Editar, Excluir, ListarPorId }