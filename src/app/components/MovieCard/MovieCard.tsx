"use client";

import { useState } from "react";
import styles from "./MovieCard.module.scss";

export type Movie = {
  id: number;
  Series_Title: string;
  Released_Year: number;
  Genre: string;
  IMDB_Rating: number;
  Director: string;
  Stars: string[];
  Runtime: string;
  Certificate: string;
  Overview: string;
  Poster_Link: string;
  Trailer: string;
};

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className={styles.card}>
      <img
        className={styles.poster}
        src={movie.Poster_Link}
        alt={`${movie.Series_Title} poster`}
      />

      <h3 className={styles.title}>{movie.Series_Title}</h3>

      <p className={styles.meta}>
        {movie.Released_Year} | {movie.Runtime} | IMDb {movie.IMDB_Rating}
      </p>

      <div className={styles.actions}>
        {movie.Trailer && (
          <a
            className={styles.button}
            href={movie.Trailer}
            target="_blank"
            rel="noreferrer"
          >
            Trailer
          </a>
        )}

        <button
          className={styles.button}
          type="button"
          onClick={() => setShowDetails((prev) => !prev)}
        >
          {showDetails ? "Dölj" : "Detaljer"}
        </button>
      </div>

      {showDetails && (
        <div className={styles.details}>
          <p>{movie.Overview || "Ingen beskrivning tillgänglig."}</p>

          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>

          <p>
            <strong>Regissör:</strong> {movie.Director}
          </p>

          <p>
            <strong>Skådespelare:</strong> {movie.Stars.join(", ")}
          </p>
        </div>
      )}
    </article>
  );
}
