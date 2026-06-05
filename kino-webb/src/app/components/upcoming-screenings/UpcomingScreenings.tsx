"use client";

import { useEffect, useState } from "react";
import style from "./UpcomingScreenings.module.scss";
import Image from "next/image";
import Link from "next/link";

type Movie = {
  id: number;
  seriesTitle: string;
  posterLink: string;
};

type Screening = {
  id: number;
  movieId: number;
  auditorium: string;
  startsAt: string;
  movie?: Movie;
};

export default function UpcomingScreenings() {
  const [upcomingScreenings, setUpcomingScreenings] = useState<Screening[]>([]);

  useEffect(() => {
    async function fetchScreenings() {
      try {
        const response = await fetch("/api/screenings");

        if (!response.ok) {
          setUpcomingScreenings([]);
          return;
        }

        const data = await response.json();
        setUpcomingScreenings(data);
      } catch {
        setUpcomingScreenings([]);
      }
    }

    fetchScreenings();
  }, []);

  return (
    <div className={style.upcomingScreenings}>
      <h2 className={style.upcomingScreeningsHeading}>Kommande visningar</h2>

      <div className={style.upcomingScreeningsTrack}>
        {upcomingScreenings.map((screening) => {
          if (!screening.movie) return null;

          return (
            <Link
              href={`/movies/${screening.movie.id}`}
              className={style.upcomingScreeningsCard}
              key={screening.id}
            >
              <Image
                className={style.upcomingScreeningsImg}
                src={screening.movie.posterLink}
                alt={screening.movie.seriesTitle}
                width={200}
                height={300}
              />

              <h3 className={style.upcomingScreeningsTitle}>
                {screening.movie.seriesTitle}
              </h3>

              <div className={style.infoContainer}>
                <span className={style.upcomingScreeningsDay}>
                  {new Date(screening.startsAt)
                    .toLocaleString("sv-SE", {
                      weekday: "long",
                    })
                    .toLocaleUpperCase()}
                </span>
                <span className={style.upcomingScreeningsDate}>
                  {new Date(screening.startsAt)
                    .toLocaleString("sv-SE", {
                      day: "numeric",
                      month: "short",
                    })
                    .toLocaleUpperCase()}
                </span>
                <span className={style.upcomingScreeningsTime}>
                  {new Date(screening.startsAt).toLocaleTimeString("sv-SE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <p className={style.upcomingScreeningsRoom}>
                  {screening.auditorium.toLocaleUpperCase()}
                </p>
              </div>
              <Link
                href={`/movies/${screening.movieId}/booking?screeningId=${screening.id}`}
                className={style.bookingLink}
              >
                Boka
              </Link>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
