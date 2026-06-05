import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const THIRTY_DAYS = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const moviesFromDb = await prisma.movie.findMany({
      include: {
        reviews: {
          where: {
            createdAt: {
              gte: THIRTY_DAYS,
            },
          },
        },
      },
    });

    const popularMovies = moviesFromDb
      .map((movie) => {
        const movieReviews = movie.reviews;

        const averageRating =
          movieReviews.length > 0
            ? movieReviews.reduce((sum, review) => sum + review.rating, 0) /
              movieReviews.length
            : 0;

        return {
          movie: {
            id: movie.id,
            seriesTitle: movie.seriesTitle,
            posterLink: movie.posterLink,
          },
          averageRating,
          reviewCount: movieReviews.length,
        };
      })
      .filter((item) => item.reviewCount > 0)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);

    return NextResponse.json(popularMovies, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}