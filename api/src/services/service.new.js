import repositoryNew from "../repositories/repository.new.js";

async function InserirNew(title, content, image) {
  return await repositoryNew.createNews(title, content, image);
}

async function ListarNews() {
  return await repositoryNew.findAll();
}

async function AtualizarNew(id_news, { title, content, image }) {
  return await repositoryNew.updateNews(id_news, title, content, image);
}

async function ExcluirNew(id_news) {
  return await repositoryNew.deleteNews(id_news);
}

async function BuscarPorId(id_news) {
  return await repositoryNew.findById(id_news);
}


export default {
  InserirNew,
  ListarNews,
  AtualizarNew,
  ExcluirNew,
  BuscarPorId,
};