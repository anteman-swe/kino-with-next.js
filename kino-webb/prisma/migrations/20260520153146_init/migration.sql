/*
  Warnings:

  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Movie";

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
