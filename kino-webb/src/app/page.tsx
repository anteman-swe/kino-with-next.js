import styles from "./page.module.scss";
import Start from "./components/start";
import MovieList from "./components/MovieList/MovieList";
import { movies } from "../Data/movies";
import UpcomingScreenings from "./components/upcoming-screenings/UpcomingScreenings";
import MovieCarousel from "./components/movieCarousel/MovieCarousel";
import BistroSection from "./components/bistro/bistroSection/BistroSection";

export default function Home() {
  return (
    <>
      <main className={styles.page}>
        <h1 className={styles.headline}>Kino - superprojekt</h1>
        <MovieList movies={movies} title="Aktuella filmer" />

        <UpcomingScreenings />

        <section className={styles.carouselSection}>
          <MovieCarousel movies={movies} />
        </section>

        <BistroSection />
      </main>
    </>
  );
}
