import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role, BookStatus } from "@/generated/prisma/client";
import { saltAndHashPassword } from "@/app/utils/password";

// importing dummy data
import { bookings } from "@/Data/bookings";
import { movies } from "@/Data/movies";
import { screenings } from "@/Data/screenings";
import { reviews } from "@/Data/reviews";
import { offers } from "@/Data/offers";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Emptying the database before seeding to prevent duplicate data
  console.log("Tömmer databasen...");
  await prisma.user.deleteMany({});
  await prisma.movie.deleteMany({});
  await prisma.screening.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.offer.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.bookingSeat.deleteMany({});
  console.log("Databasen är tömd!");

  console.log("Genererar haschade lösenord...");
  // Making one password for use by both users
  const hashedPassword = await saltAndHashPassword("secret1234");
  const guestUserPwHash = await saltAndHashPassword(
    "Gästanvändare-guest@kino.se",
  );

  // Creating guest user with normal rights but not available password
  console.log("Skapar vanlig användare...");
  const guestUser = await prisma.user.create({
    data: {
      email: "guest@kino.se",
      name: "Gästanvändare",
      passwordHash: guestUserPwHash,
      role: "USER" as Role,
    },
  });

  // Creating one user with normal rights
  console.log("Skapar vanlig användare...");
  const normalUser = await prisma.user.create({
    data: {
      email: "guy@exempel.se",
      name: "Guy McDudesson",
      passwordHash: hashedPassword,
      role: "USER" as Role,
    },
  });

  // Creating one user with admin rights
  console.log("Skapar admin-användare...");
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@exempel.se",
      name: "Boss Chefsson",
      passwordHash: hashedPassword,
      role: "ADMIN" as Role, // giving user admin rights
    },
  });

  console.log(`3 användare skapade!`);
  console.log(`- Gästanvändare skapad, namn: ${guestUser.name}`);
  console.log(`- Vanlig användare skapad: ${normalUser.email}`);
  console.log(`- Admin-användare skapad: ${adminUser.email}`);

  // Creating the rest of the dummy-data
  // Dummy data för movies konverteras för att passa till DB
  const moviesToSeed = movies.map((movie) => ({
    seriesTitle: movie.Series_Title,
    releasedYear: movie.Released_Year,
    genre: movie.Genre,
    imdbRating: movie.IMDB_Rating,
    director: movie.Director,
    stars: movie.Stars,
    runtime: movie.Runtime,
    certificate: movie.Certificate,
    overview: movie.Overview,
    posterLink: movie.Poster_Link,
    trailer: movie.Trailer,
  }));
  // Dummy movies skrivs till DB
  await prisma.movie.createMany({
    data: moviesToSeed,
  });
  console.log("Dummy data för filmer skrivna till databasen!");

  // Dummy data för visningar skrivs till DB
  const movieList = await prisma.movie.findMany({});
  const sortedMList = movieList.sort((a, b) => a.id - b.id);
  const getRandomId = (): number => {
    const randomIdInList =
      Math.floor(Math.random() * sortedMList.length) + sortedMList[0].id;
    return randomIdInList;
  };

  const adaptedScreenings = screenings.map((screening) => ({
    ...screening,
    movieId: getRandomId(),
  }));
  await prisma.screening.createMany({
    data: adaptedScreenings,
  });
  console.log("Dummy data för visningar är skrivna till databasen!");

  const userList = await prisma.user.findMany({});
  const sortedUserList = userList.sort((a, b) => a.id - b.id);
  const getRandomUserId = (): number => {
    const randomIdInList =
      Math.floor(Math.random() * sortedUserList.length) + sortedUserList[0].id;
    return randomIdInList;
  };

  const adaptedReviews = reviews.map((review) => ({
    ...review,
    movieId: getRandomId(),
    userId: review.userName === null ? getRandomUserId() : userList[0].id,
  }));
  await prisma.review.createMany({
    data: adaptedReviews,
  });

  console.log("Dummy data för recensioner är skrivna till databasen!");

  await prisma.offer.createMany({
    data: offers,
  });
  console.log("Dummy data för erbjudanden är skrivna till databasen!");

  // Dummy data för bookings skrivs till DB
  const bookingsWithEnumStatus = bookings.map((booking) => ({
    ...booking,
    userId: getRandomUserId(),
    status: booking.status as BookStatus,
  }));
  await prisma.booking.createMany({
    data: bookingsWithEnumStatus,
  });
  console.log("Dummy-bokningar skrivna till databasen!");

  // Dummy data för upptagna stolar
  const registeredBookings = await prisma.booking.findMany({});

  const bSeats = registeredBookings.flatMap((booking) => {
    const seats = booking?.seats ?? [];
    return seats.map((seat) => ({
      bookingId: booking.id,
      screeningId: booking.screeningId,
      seat: seat,
    }));
  });

  await prisma.bookingSeat.createMany({
    data: bSeats,
  });
  console.log("Dummy data för bokade stolar är skrivna till databasen");

  console.log("Databasen är seedad för testning, KLART!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
