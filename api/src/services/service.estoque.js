import repositoryEstoque from "../repositories/repository.estoque.js";

async function InserirEstoque(productName, quantity, price) {
  return await repositoryEstoque.createEstoque(productName, quantity, price);
}

async function ListarEstoques() {
  return await repositoryEstoque.findAll();
}

async function AtualizarEstoque(id_estoque, productName, quantity, price) {
  return await repositoryEstoque.updateEstoque(
    id_estoque,
    productName,
    quantity,
    price
  );
}

async function ExcluirEstoque(id_estoque) {
  return await repositoryEstoque.deleteEstoque(id_estoque);
}

export default {
  InserirEstoque,
  ListarEstoques,
  AtualizarEstoque,
  ExcluirEstoque,
};