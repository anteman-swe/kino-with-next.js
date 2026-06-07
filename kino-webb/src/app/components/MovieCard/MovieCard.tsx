"use client";

import { useState } from "react";
import styles from "./MovieCard.module.scss";
import { Movie } from "@/generated/prisma/client";
import Image from "next/image";


type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className={styles.card}>
      <Image
        className={styles.poster}
        src={movie.posterLink}
        alt={`${movie.seriesTitle} poster`}
        width={200}
        height={300}
      />

      <h3 className={styles.title}>{movie.seriesTitle}</h3>

      <p className={styles.meta}>
        {movie.releasedYear} | {movie.runtime} | IMDb {movie.imdbRating}
      </p>

      <div className={styles.actions}>
        {movie.trailer && (
          <a
            className={styles.button}
            href={movie.trailer}
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
          <p>{movie.overview || "Ingen beskrivning tillgänglig."}</p>

          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>

          <p>
            <strong>Regissör:</strong> {movie.director}
          </p>

          <p>
            <strong>Skådespelare:</strong> {movie.stars.join(", ")}
          </p>
        </div>
      )}
    </article>
  );
}
