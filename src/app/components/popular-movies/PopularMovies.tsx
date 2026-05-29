import Image from "next/image";
import Link from "next/link"; // 1. Import Next.js Link
import style from "./PopularMovies.module.scss";
import { reviews } from "@/Data/reviews";
import { movies } from "@/Data/movies";

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const now = Date.now();

export default function PopularMovies() {
  const recentReviews = reviews.filter((review) => {
    const reviewTime = new Date(review.createdAt).getTime();
    return now - reviewTime <= THIRTY_DAYS;
  });

  const popularMovies = movies
    .map((movie) => {
      const movieReviews = recentReviews.filter(
        (review) => review.movieId === movie.id
      );

      const averageRating =
        movieReviews.length > 0
          ? movieReviews.reduce((sum, review) => sum + review.rating, 0) /
            movieReviews.length
          : 0;

      return {
        movie,
        averageRating,
        reviewCount: movieReviews.length,
      };
    })
    .filter((item) => item.reviewCount > 0)
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 5);

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
            href={`/movies/${movie.id}`} 
            className={style.popularMoviesCard} 
            key={movie.id}
          >
            <Image
              className={style.popularMoviesImg}
              src={movie.Poster_Link}
              alt={movie.Series_Title}
              width={200}
              height={300}
            />

            <h3 className={style.popularMoviesTitle}>
              {movie.Series_Title}
            </h3>

            <p className={style.popularMoviesRating}>
              Betyg: {averageRating.toFixed(1)}
            </p>

            <p className={style.popularMoviesReviews}>
              {reviewCount} recensioner senaste 30 dagarna
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}