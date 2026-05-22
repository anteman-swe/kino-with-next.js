import styles from "./page.module.scss";
import MovieList from "./components/MovieList/MovieList";
import { movies } from "../Data/movies";
import { events } from "../Data/event";
import UpcomingScreenings from "./components/upcoming-screenings/UpcomingScreenings";
import MovieCarousel from "./components/movieCarousel/MovieCarousel";
import BistroSection from "./components/bistro/bistroSection/BistroSection";
import PopularMovies from "./components/popular-movies/PopularMovies";
import EventList from "./components/event/eventList";

export default function Home() {
  return (
    <>
      <main className={styles.page}>
       
        <h1 className={styles.headline}>
          Kino - superprojekt
        </h1>
        <MovieList movies={movies} title="Aktuella filmer" />

        <section className={styles.carouselSection}>
          <MovieCarousel movies={movies} />
        </section>

        <PopularMovies />

        <UpcomingScreenings />
       
        <MovieList movies={movies} title="Aktuella filmer" />
        
        <BistroSection />

        <EventList events={events} />
      </main>
    </>
  );
}
