"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import style from "./PopularMovies.module.scss";
import Image from "next/image";

interface MovieData {
  movie: {
    id: number;
    seriesTitle: string;
    posterLink: string;
  };
  averageRating: number;
  reviewCount: number;
}

export default function PopularMovies() {
  const [popularMovies, setPopularMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/popular")
      .then((res) => {
        if (!res.ok) {
          console.error(`Server responded with status: ${res.status}`);
          setPopularMovies([]);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPopularMovies(data);
        } else {
          console.error("API did not return an array layout:", data);
          setPopularMovies([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching popular movies from API:", err);
        setPopularMovies([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={style.loader}>Laddar populära filmer...</div>;
  }

  if (popularMovies.length === 0) {
      return (
        <div className={style.popularMovies}>
          <h2 className={style.popularMoviesHeading}>Populära filmer</h2>
          <p>Inga recensioner ännu.</p>
        </div>
      );
    }
    
  return (
    <div className={style.popularMovies}>
      <h2 className={style.popularMoviesHeading}>Populära filmer</h2>
      <section className={style.popularMoviesContent}>
        {popularMovies.map(({ movie, averageRating, reviewCount }) => (
          <Link 
            key={movie.id}
            href={`/movies/${movie.id}`} 
            className={style.popularMoviesCard}
          >
            <Image
                  className={style.popularMoviesImg}
                  src={movie.posterLink}
                  alt={movie.seriesTitle}
                  width={200}              
                  height={300}            
                  
                />
            <h3>{movie.seriesTitle}</h3>
            <p>Betyg: {averageRating} ({reviewCount} röster)</p>
          </Link>
        ))}
      </section>
    </div>
  );
}