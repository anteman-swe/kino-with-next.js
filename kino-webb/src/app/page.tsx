import styles from "./page.module.scss";
import MovieList from "./components/MovieList/MovieList";
import { movies } from "../Data/movies";
import UpcomingScreenings from "./components/upcoming-screenings/UpcomingScreenings";
import MovieCarousel from "./components/movieCarousel/MovieCarousel";
import BistroSection from "./components/bistro/bistroSection/BistroSection";
import PopularMovies from "./components/popular-movies/PopularMovies";


export default function Home() {
  return (
    <>
      <main className={styles.page}>

        <MovieCarousel movies={movies} />

        <PopularMovies />

        <UpcomingScreenings />
       
        <MovieList movies={movies} title="Aktuella filmer" />
        
        <BistroSection />
        
      </main>
    </>
  );
}
