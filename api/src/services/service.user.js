import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import repositoryUser from "../repositories/repository.user.js";


const SECRET = process.env.JWT_SECRET || "159753";

async function Inserir(name, email, password) {
  const hash = await bcrypt.hash(password, 10);
  return await repositoryUser.createUser(name, email, hash, "user");
}

async function InserirAdmin(name, email, password) {
  const hash = await bcrypt.hash(password, 10);
  return await repositoryUser.createUser(name, email, hash, "admin");
}

async function Login(email, password) {
  const user = await repositoryUser.findByEmail(email);
  if (!user) return [];

  const match = await bcrypt.compare(password, user.password);
  if (!match) return [];

  const token = jwt.sign({ id_user: user.id_user }, SECRET, { expiresIn: "1d" });
  return { user: { id_user: user.id_user, name: user.name, email: user.email }, token };
}

async function LoginAdmin(email, password) {
  const user = await repositoryUser.findByEmailAndType(email, "admin");
  if (!user) return [];

  const match = await bcrypt.compare(password, user.password);
  if (!match) return [];

  const token = jwt.sign({ id_user: user.id_user }, SECRET, { expiresIn: "1d" });
  return { user: { id_user: user.id_user, name: user.name, email: user.email }, token };
}

async function Profile(id_user) {
  return await repositoryUser.findById(id_user);
}

async function Listar() {
  return await repositoryUser.findAll();
}

async function ListarPorId(id_user) {
  return await repositoryUser.findById(id_user);
}

async function Editar(id_user, name, email, password) {
  const hash = await bcrypt.hash(password, 10);
  return await repositoryUser.updateUser(id_user, name, email, hash);
}

async function Excluir(id_user) {
  return await repositoryUser.deleteUser(id_user);
}

export default {
  Inserir,
  InserirAdmin,
  Login,
  LoginAdmin,
  Profile,
  Listar,
  ListarPorId,
  Editar,
  Excluir
};
