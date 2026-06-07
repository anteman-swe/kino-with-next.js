"use client";

import styles from "./page.module.scss";
import MovieList from "./components/MovieList/MovieList";
// import { movies } from "../Data/movies";
import { events } from "../Data/event";
import UpcomingScreenings from "./components/upcoming-screenings/UpcomingScreenings";
import MovieCarousel from "./components/movieCarousel/MovieCarousel";
import BistroSection from "./components/bistro/bistroSection/BistroSection";
import PopularMovies from "./components/popular-movies/PopularMovies";
import EventList from "./components/event/eventList";
import { Movie } from "@/generated/prisma/client";

const fetchMovies = async (): Promise<Movie[]> => {
  const retrievedMovies = await fetch('/api/movies');
  if (!retrievedMovies.ok) {
    if (retrievedMovies.status === 500) {
      return [{
        id: 0,
        seriesTitle: "DB not connecting..",
        releasedYear: 0,
        genre: "",
        imdbRating: 0,
        director: "",
        stars: [""],
        runtime: "",
        certificate: "",
        overview: "",
        posterLink: "",
        trailer: ""
      }]
    }
    return [];
  } else {
    const result = await retrievedMovies.json();
    return result;
  }
}
const moviesToSort: Movie[] = await fetchMovies();
console.log('MTS:', moviesToSort);
const moviesSorted: Movie[] = moviesToSort.sort((a, b) => (b.releasedYear - a.releasedYear));
let movies = moviesSorted;
if (moviesToSort.length > 10) {
  // Sort out 10 latest movies
  movies = moviesSorted.splice(10);
}

// const movies =  await fetchMovies();

export default function Home() {
  
  return (
    <>
      <main className={styles.page}>

          <MovieCarousel movies={movies} />

        <PopularMovies />

        <UpcomingScreenings />
       
        <MovieList movies={movies} title="Aktuella filmer" />
        
        <BistroSection />

        <EventList events={events} />
      </main>
    </>
  );
}
