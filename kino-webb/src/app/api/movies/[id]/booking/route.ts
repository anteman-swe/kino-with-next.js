import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const movieId = Number(id);

    if (Number.isNaN(movieId)) {
      return NextResponse.json(
        { message: "Invalid movie id" },
        { status: 400 },
      );
    }

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
      include: {
        screenings: {
          orderBy: {
            startsAt: "asc",
          },
        },
      },
    });

    if (!movie) {
      return NextResponse.json(
        { message: "Movie not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: movie.id,
      title: movie.seriesTitle,
      poster: movie.posterLink,
      runtime: movie.runtime,
      screenings: movie.screenings.map((screening) => ({
        id: screening.id,
        startsAt: screening.startsAt.toISOString(),
        price: screening.price,
      })),
    });
  } catch (error) {
    console.error("GET /api/movies/[id]/booking failed:", error);

    return NextResponse.json(
      { message: "Could not fetch booking movie" },
      { status: 500 },
    );
  }
}