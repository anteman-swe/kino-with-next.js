import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Role, BookStatus } from '@/generated/prisma/client';
import { saltAndHashPassword } from '@/app/utils/password';

// importing dummy data
import { bookings } from '@/Data/bookings';
import { movies } from '@/Data/movies';
import { screenings } from '@/Data/screenings';
import { reviews } from '@/Data/reviews';
import { offers } from '@/Data/offers';


const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Emptying the database before seeding to prevent duplicate data
  console.log("Tömmer databasen...");
  await prisma.user.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.movie.deleteMany({});
  await prisma.screening.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.offer.deleteMany({});
  console.log("Databasen är tömd!");

  console.log("Genererar haschade lösenord...")
  // Making one password for use by both users
  const hashedPassword = await saltAndHashPassword("secret1234");

  // Creating one user with normal rights
  console.log("Skapar vanlig användare...")
  const normalUser = await prisma.user.create({
    data: {
      email: "guy@exempel.se",
      name: "Guy McDudesson",
      passwordHash: hashedPassword,
      role: "USER" as Role,
    },
  })

  // Creating one user with admin rights
  console.log("Skapar admin-användare...")
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@exempel.se",
      name: "Boss Chefsson",
      passwordHash: hashedPassword,
      role: "ADMIN" as Role, // giving user admin rights
    },
  })

  console.log(`2 användare skapade!`)
  console.log(`- Vanlig användare skapad: ${normalUser.email}`)
  console.log(`- Admin-användare skapad: ${adminUser.email}`)
  
  // Creating the rest of the dummy-data
  const bookingsWithEnumStatus = bookings.map(booking => ({
    ...booking,
    status: booking.status as BookStatus
  }))
  await prisma.booking.createMany({
    data: bookingsWithEnumStatus,
  })
  console.log('Dummy-bokningar skrivna till databasen!');
  
  await prisma.movie.createMany({
    data: movies,
  })
  console.log('Dummy data för filmer skrivna till databasen!');

  await prisma.screening.createMany({
    data: screenings,
  })

  console.log('Dummy data för visningar är skrivna till databasen!');

  
  await prisma.review.createMany({
    data: reviews,
  })

  console.log('Dummy data för visningar är skrivna till databasen!');

  await prisma.offer.createMany({
    data: offers,
  })
  console.log('Dummy data för erbjudanden är skrivna till databasen!');

  console.log('Databasen är seedad för testning, KLART!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })