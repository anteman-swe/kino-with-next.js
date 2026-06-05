"use client";

import { useEffect, useState } from "react";
import style from "./UpcomingScreenings.module.scss";

type Movie = {
  id: number;
  Series_Title: string;
  Poster_Link: string;
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
} catch (error) {
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
            <div className={style.upcomingScreeningsCard} key={screening.id}>
              <img
                className={style.upcomingScreeningsImg}
                src={screening.movie.Poster_Link}
                alt={screening.movie.Series_Title}
              />

              <h3 className={style.upcomingScreeningsTitle}>
                {screening.movie.Series_Title}
              </h3>

              <p className={style.upcomingScreeningsTime}>
                {new Date(screening.startsAt).toLocaleTimeString("sv-SE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <p className={style.upcomingScreeningsRoom}>
                {screening.auditorium}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}



