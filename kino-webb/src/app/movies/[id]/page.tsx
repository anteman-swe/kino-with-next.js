import { movies } from "@/Data/movies";
import MovieRecension from "../../components/recension/MovieRecension";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: PageProps) {
  // Await the promise to extract the actual id property
  const resolvedParams = await params;
  
  // Convert the string id into a number to match your dataset schema
  const movieId = Number(resolvedParams.id);

  return <MovieRecension movieId={movieId} />;
}

export async function generateStaticParams() {
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}