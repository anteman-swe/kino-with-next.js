import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MovieRecension from "../../components/recension/MovieRecension";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: PageProps) {
  
  const resolvedParams = await params;
  const movieId = Number(resolvedParams.id);

  if (isNaN(movieId)) {
    notFound();
  }

  // Fetch the specific movie record straight from the database
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  // Trigger Next.js 404 handler if a user tries to access a non-existent movie ID
  if (!movie) {
    notFound();
  }

  // Passing the movieId down to your recension block
  return <MovieRecension movieId={movieId} />;
}

// Update static parameters generation to read from the DB
export async function generateStaticParams() {
  const allMovies = await prisma.movie.findMany({
    select: {
      id: true,
    },
  });

  return allMovies.map((movie) => ({
    id: movie.id.toString(),
  }));
}