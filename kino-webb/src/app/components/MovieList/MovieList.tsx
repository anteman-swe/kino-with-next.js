import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "@/generated/prisma/client";
import styles from "./MovieList.module.scss";

type MovieListProps = {
  movies: Movie[];
  title?: string;
};

export default function MovieList({
  movies,
  title = "Filmer",
}: MovieListProps) {
  if (!movies?.length) {
    return <p className={styles.empty}>Inget att visa.</p>;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.track}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
