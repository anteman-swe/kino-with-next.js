-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('I', 'II', 'III', 'IIII', 'IIIII', 'IIIIII', 'IIIIIII', 'IIIIIIII', 'IIIIIIIII', 'IIIIIIIIII');

-- CreateEnum
CREATE TYPE "Otype" AS ENUM ('MOVIE', 'FOOD', 'SNACKS', 'COMBO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "screeningId" INTEGER NOT NULL,
    "seats" TEXT[],
    "totalPrice" INTEGER NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "Series_Title" VARCHAR(50) NOT NULL,
    "Released_Year" INTEGER NOT NULL,
    "Genre" TEXT NOT NULL,
    "IMDB_Rating" DOUBLE PRECISION NOT NULL,
    "Director" TEXT NOT NULL,
    "Stars" TEXT[],
    "Runtime" TEXT NOT NULL,
    "Certificate" TEXT NOT NULL,
    "Overview" VARCHAR(300) NOT NULL,
    "Poster_Link" TEXT NOT NULL,
    "Trailer" TEXT NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screenings" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "auditorium" TEXT NOT NULL,
    "startsAt" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "subtitles" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "totalSeats" INTEGER NOT NULL,

    CONSTRAINT "Screenings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" "Rating" NOT NULL DEFAULT 'I',
    "comment" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offers" (
    "id" SERIAL NOT NULL,
    "type" "Otype" NOT NULL DEFAULT 'MOVIE',
    "title" VARCHAR(50) NOT NULL,
    "text" TEXT NOT NULL,
    "picture" TEXT NOT NULL DEFAULT '/defaultimg.png',
    "price" DECIMAL(6,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validForDays" INTEGER NOT NULL DEFAULT 30,

    CONSTRAINT "Offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
