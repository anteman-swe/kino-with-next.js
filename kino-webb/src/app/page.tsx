import styles from "./page.module.scss";
import Start from "./components/start";
import MovieList from "./components/MovieList/MovieList";
import { movies } from "../Data/movies";

export default function Home() {
  return (
    <div>
      <main>
        <div>
          <h1 className={styles.headline}>
            Kino - superprojektet med Next.js (Page.tsx)
          </h1>
          <MovieList movies={movies} title="Aktuella filmer" />
          <Start />
        </div>
      </main>
    </>
  );  
}