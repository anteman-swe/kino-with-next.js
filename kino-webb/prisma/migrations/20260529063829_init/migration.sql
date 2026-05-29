-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

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
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "screeningId" INTEGER NOT NULL,
    "seats" TEXT[],
    "totalPrice" INTEGER NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
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

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screening" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "auditorium" TEXT NOT NULL,
    "startsAt" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "subtitles" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "totalSeats" INTEGER NOT NULL,

    CONSTRAINT "Screening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1,
    "comment" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "type" "Otype" NOT NULL DEFAULT 'MOVIE',
    "title" VARCHAR(50) NOT NULL,
    "text" TEXT NOT NULL,
    "picture" TEXT NOT NULL DEFAULT '',
    "price" DECIMAL(6,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validForDays" INTEGER NOT NULL DEFAULT 30,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
