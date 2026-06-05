import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const screenings = await prisma.screening.findMany({
      orderBy: {
        startsAt: "asc",
      },
    });

    const movieIds = screenings.map((screening) => screening.movieId);

    const movies = await prisma.movie.findMany({
      where: {
        id: {
          in: movieIds,
        },
      },
    });

    const screeningsWithMovies = screenings.map((screening) => ({
      ...screening,
      movie: movies.find((movie) => movie.id === screening.movieId),
    }));
 
   

    return NextResponse.json(screeningsWithMovies);
  } catch (error) {
    console.error(error);

return NextResponse.json(
  { message: "Database unavailable" },
  { status: 500 }
);
  }
}