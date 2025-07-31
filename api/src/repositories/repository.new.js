import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createNews(title, content, image) {
  return await prisma.news.create({
    data: { title, content, image },
  });
}

async function findById(id_news) {
  return await prisma.news.findUnique({
    where: { id_news: parseInt(id_news) },
  });
}

async function findAll() {
  return await prisma.news.findMany({
    orderBy: { created_at: "desc" },
  });
}

async function updateNews(id_news, title, content, image) {
  return await prisma.news.update({
    where: { id_news: parseInt(id_news) },
    data: {
      title,
      content,
      ...(image && { image }), // Atualiza imagem só se fornecida
    },
  });
}

async function deleteNews(id_news) {
  return await prisma.news.delete({
    where: { id_news: parseInt(id_news) },
  });
}

export default {
  createNews,
  findById,
  findAll,
  updateNews,
  deleteNews,
};