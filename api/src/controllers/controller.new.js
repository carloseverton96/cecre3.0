import serviceNew from "../services/service.new.js";

async function Inserir(req, res) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: "Título e conteúdo são obrigatórios.",
    });
  }

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const news = await serviceNew.InserirNew(title, content, image);
    return res.status(201).json(news);
  } catch (error) {
    console.error("Erro ao inserir notícia:", error);
    return res.status(500).json({
      error: "Erro interno ao salvar a notícia.",
      details: error.message,
    });
  }
}

// async function Listar(req, res) {
//   const { page = 1, limit = 6 } = req.query;

//   try {
//     // Converte para número
//     const pageNumber = Math.max(1, parseInt(page));
//     const limitNumber = Math.min(100, Math.max(1, parseInt(limit))); // limit entre 1 e 100
//     const offset = (pageNumber - 1) * limitNumber;

//     // Busca todas as notícias (ou use com Prisma skip/take)
//     const allNews = await serviceNew.ListarNews(); // Supondo que retorna todas

//     // Calcula paginação
//     const total = allNews.length;
//     const totalPages = Math.ceil(total / limitNumber);
//     const data = allNews.slice(offset, offset + limitNumber);

//     // ✅ Retorna no formato esperado pelo frontend
//     return res.status(200).json({
//       data,
//       totalPages,
//       currentPage: pageNumber,
//       total,
//     });
//   } catch (error) {
//     console.error("Erro ao listar notícias:", error);
//     return res.status(500).json({
//       error: "Erro ao buscar notícias.",
//       details: error.message,
//     });
//   }
// }
// controllers/controller.new.js

async function Listar(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = Math.max(1, parseInt(page));
  const limitNumber = Math.min(100, Math.max(1, parseInt(limit)));
  const offset = (pageNumber - 1) * limitNumber;

  try {
    const allNews = await serviceNew.ListarNews(); // retorna todas
    const total = allNews.length;
    const totalPages = Math.ceil(total / limitNumber);
    const data = allNews.slice(offset, offset + limitNumber);

    return res.status(200).json({
      data,
      totalPages,
      currentPage: pageNumber,
      total,
    });
  } catch (error) {
    console.error("Erro ao listar notícias:", error);
    return res.status(500).json({
      error: "Erro ao buscar notícias.",
      details: error.message,
    });
  }
}

// controllers/controller.new.js

async function Atualizar(req, res) {
  const { id_news } = req.params;
  const { title, content } = req.body;

  // ✅ Validação dos campos obrigatórios
  if (!title || !content) {
    return res.status(400).json({
      error: "Título e conteúdo são obrigatórios.",
    });
  }

  try {
    // ✅ Verifica se a notícia existe
    const existingNews = await serviceNew.BuscarPorId(id_news);
    if (!existingNews) {
      return res.status(404).json({ error: "Notícia não encontrada." });
    }

    // ✅ Prepara os dados para atualização
    const updateData = {
      title,
      content,
    };

    // ✅ Se houver imagem, adiciona ao updateData
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    // ✅ Atualiza no banco
    const news = await serviceNew.AtualizarNew(id_news, updateData);

    return res.status(200).json(news);
  } catch (error) {
    console.error("Erro ao atualizar notícia:", error);
    return res.status(500).json({
      error: "Erro interno ao atualizar a notícia.",
      details: error.message,
    });
  }
}

async function Excluir(req, res) {
  const { id_news } = req.params;

  try {
    await serviceNew.ExcluirNew(id_news);
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir notícia:", error);
    if (error.message === "Notícia não encontrada") {
      return res.status(404).json({ error: "Notícia não encontrada." });
    }
    return res.status(500).json({
      error: "Erro ao excluir a notícia.",
      details: error.message,
    });
  }
}

async function Detalhar(req, res) {
  const { id_news } = req.params;

  try {
    const news = await serviceNew.BuscarPorId(id_news);
    if (!news) {
      return res.status(404).json({ error: "Notícia não encontrada." });
    }
    return res.status(200).json(news);
  } catch (error) {
    console.error("Erro ao buscar notícia:", error);
    return res.status(500).json({
      error: "Erro ao buscar a notícia.",
      details: error.message,
    });
  }
}




// ✅ Exportação correta como default
export default {
  Inserir,
  Listar,
  Atualizar,
  Excluir,
  Detalhar,
};