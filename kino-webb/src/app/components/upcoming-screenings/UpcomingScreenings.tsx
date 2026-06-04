import style from "./UpcomingScreenings.module.scss";
import { screenings } from "../../../Data/screenings";
import { movies } from "../../../Data/movies";
import Image from 'next/image';

export default function UpcomingScreenings() {
  const upcomingScreenings = screenings.map((screening) => {
    const movie = movies.find((movie) => movie.id === screening.movieId);

    return {
      ...screening,
      movie,
    };
  });

  return (
    <div className={style.upcomingScreenings}>
      <h2 className={style.upcomingScreeningsHeading}>Aktuella visningar</h2>

      <div className={style.upcomingScreeningsTrack}>
        {upcomingScreenings.map((screening) => {
          if (!screening.movie) return null;

  return (
    <div className={style.upcomingScreeningsCard} key={screening.id}>
      <Image
        className={style.upcomingScreeningsImg}
        src={screening.movie.Poster_Link}
        alt={screening.movie.Series_Title}
        width={200}
        height={300}
      />

              <h3 className={style.upcomingScreeningsTitle}>
                {screening.movie.Series_Title}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
