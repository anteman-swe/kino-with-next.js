"use client";
const dynamic = 'force-dynamic';

import styles from "./page.module.scss";
import MovieList from "./components/MovieList/MovieList";
import { events } from "../Data/event";
import UpcomingScreenings from "./components/upcoming-screenings/UpcomingScreenings";
import MovieCarousel from "./components/movieCarousel/MovieCarousel";
import BistroSection from "./components/bistro/bistroSection/BistroSection";
import PopularMovies from "./components/popular-movies/PopularMovies";
import EventList from "./components/event/eventList";
import { Movie } from "@/generated/prisma/client";
import { useState, useEffect } from "react";

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
    const moviesToSort: Movie[] = await retrievedMovies.json();
    const moviesSorted: Movie[] = [...moviesToSort].sort(
      (a, b) => b.releasedYear - a.releasedYear);
      return moviesSorted.slice(0, 10);
  }
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    fetchMovies().then((movieData) => {
      if (mounted) {
        setMovies(movieData);
        setLoading(false);
      }
    }).catch((error) => {
      console.error('Fetching Movies from DB, something went wrong...', error);
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    }
  }, []);
  
  if (loading) {
    return <p>Hämtar filmer från databasen... Vänta lite...</p>
  }
  
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
