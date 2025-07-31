import serviceEstoque from "../services/service.estoque.js";

async function Inserir(req, res) {
  const { productName, quantity, price } = req.body;

  const estoque = await serviceEstoque.InserirEstoque(
    productName,
    quantity,
    price
  );

  res.status(201).json(estoque);
}

async function Listar(req, res) {
  const estoques = await serviceEstoque.ListarEstoques();

  res.status(200).json(estoques);
}

async function Atualizar(req, res) {
  const { id_estoque } = req.params;
  const { productName, quantity, price } = req.body;

  const estoque = await serviceEstoque.AtualizarEstoque(
    id_estoque,
    productName,
    quantity,
    price
  );

  res.status(200).json(estoque);
}

async function Excluir(req, res) {
  const { id_estoque } = req.params;

  await serviceEstoque.ExcluirEstoque(id_estoque);

  res.status(204).send();
}

export default { Inserir, Listar, Atualizar, Excluir };