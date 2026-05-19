import { PrismaClient } from '@prisma/client/extension';
import * as bcrypt from 'bcrypt-ts';

// importing dummy data
import { bookings } from '@/Data/bookings';
import { movies } from '@/Data/movies';
import { screenings } from '@/Data/screenings';

const prisma = new PrismaClient();

async function main() {
  // Emptying the database before seeding to prevent duplicate data
  await prisma.user.deleteMany({})
  await prisma.bookings.deleteMany({})
  await prisma.movies.deleteMany({})
  await prisma.screenings.deleteMany({})

  console.log("Genererar haschade lösenord...")
  // Making one password for use by both users
  const hashedPassword = await bcrypt.hash("secret1234", 10)

  // Creating one user with normal rights
  console.log("Skapar vanlig användare...")
  const normalUser = await prisma.user.create({
    data: {
      email: "guy@exempel.se",
      name: "Guy McDudesson",
      password: hashedPassword,
      role: "USER",
    },
  })

  // Creating one user with admin rights
  console.log("Skapar admin-användare...")
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@exempel.se",
      name: "Boss Chefsson",
      password: hashedPassword,
      role: "ADMIN", // giving user admin rights
    },
  })

  console.log(`2 användare skapade!`)
  console.log(`- Vanlig användare skapad: ${normalUser.email}`)
  console.log(`- Admin-användare skapad: ${adminUser.email}`)
  
  // Skapa övrig dummy-data
  await prisma.bookings.createMany({
    data: bookings,
  })
  console.log('Dummy bokningar skrivna till databasen!');
  
  await prisma.movies.createMany({
    data: movies,
  })
  console.log('Dummy data för filmer skrivna till databasen!');

  await prisma.screenings.createMany({
      data: screenings,
  })
  console.log('Dummy data för visningar är skrivna till databasen!');
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