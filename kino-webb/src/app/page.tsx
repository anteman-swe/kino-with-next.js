import styles from "./page.module.scss";
import UpcomingScreenings from "./components/upcoming-screenings/UpcomingScreenings";
import { movies } from "@/Data/movies";
import MovieCarousel from "./components/movieCarousel/MovieCarousel";

import BistroSection from "./components/bistro/bistroSection/BistroSection";
export default function Home() {
  return (
    <>
      <main className={styles.page}>
        <h1 className={styles.headline}>
          Kino - superprojekt
        </h1>

      <UpcomingScreenings />
    
  
        <section className={styles.carouselSection}>
          <MovieCarousel movies={movies} />
        </section>

        <BistroSection />
      </main>
    </>
  );   
}