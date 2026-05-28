// lib/db.ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

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