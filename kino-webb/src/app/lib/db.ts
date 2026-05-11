// lib/db.ts
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}