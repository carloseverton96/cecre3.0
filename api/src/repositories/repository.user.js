import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createUser(name, email, password, user_type) {
  return await prisma.user.create({
    data: { name, email, password, user_type }
  });
}

async function findByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

async function findByEmailAndType(email, type) {
  return await prisma.user.findFirst({
    where: { email, user_type: type }
  });
}

async function findById(id_user) {
  return await prisma.user.findUnique({ where: { id_user } });
}

async function findAll() {
  return await prisma.user.findMany({ orderBy: { created_at: "desc" } });
}

async function updateUser(id_user, name, email, password) {
  return await prisma.user.update({
    where: { id_user },
    data: { name, email, password }
  });
}

async function deleteUser(id_user) {
  return await prisma.user.delete({ where: { id_user } });
}

export default {
  createUser,
  findByEmail,
  findByEmailAndType,
  findById,
  findAll,
  updateUser,
  deleteUser
};
