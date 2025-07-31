import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createEstoque(productName, quantity, price) {
  return await prisma.estoque.create({
    data: { productName, quantity, price },
  });
}

async function findById(id_estoque) {
  return await prisma.estoque.findUnique({ where: { id_estoque } });
}

async function findAll() {
  return await prisma.estoque.findMany({ orderBy: { created_at: "desc" } });
}

async function updateEstoque(id_estoque, productName, quantity, price) {
  return await prisma.estoque.update({
    where: { id_estoque },
    data: { productName, quantity, price },
  });
}

async function deleteEstoque(id_estoque) {
  return await prisma.estoque.delete({ where: { id_estoque } });
}

export default {
  createEstoque,
  findById,
  findAll,
  updateEstoque,
  deleteEstoque,
};