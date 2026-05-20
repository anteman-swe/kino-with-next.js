
import styles from "./page.module.scss";
import { movies } from "@/Data/movies";
import MovieCarousel from "./components/movieCarousel/MovieCarousel";

export default function Home() {
  return (
    <>
      <main className={styles.page}>
        <h1 className={styles.headline}>
          Kino - superprojekt
        </h1>
        <section className={styles.carouselSection}>
          <MovieCarousel movies={movies} />
        </section>
      </main>
    </>
  );  
}