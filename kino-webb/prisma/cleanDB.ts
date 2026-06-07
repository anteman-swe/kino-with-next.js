import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Tömmer databasen...");
    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Review" RESTART IDENTITY CASCADE;`, // Depends on movies and users
    );
    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Booking" RESTART IDENTITY CASCADE;`, // Depends on screenings and users
    );
    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "BookingSeat" RESTART IDENTITY CASCADE;`,
    );
    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Screening" RESTART IDENTITY CASCADE;`, // Depends on movies
    );
    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Movie" RESTART IDENTITY CASCADE;`,
    );
    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`,
    );
    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Offer" RESTART IDENTITY CASCADE;`,
    );
    console.log("Databasen är rensad och nollställd!");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });