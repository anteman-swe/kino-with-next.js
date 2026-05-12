// lib/db.ts
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function getUserFromDb(email: string, passwordHash: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  if (user.passwordHash === passwordHash) {
    return user;
  }
  return null;
}