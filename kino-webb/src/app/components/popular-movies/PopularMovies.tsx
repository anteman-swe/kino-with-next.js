import style from "./PopularMovies.module.scss";
import { movies } from "@/Data/movies";
import { reviews } from "@/Data/reviews";

export default function PopularMovies() {
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();

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

      <div className={style.popularMoviesTrack}>
        {popularMovies.map(({ movie, averageRating, reviewCount }) => (
          <div className={style.popularMoviesCard} key={movie.id}>
            <img
              className={style.popularMoviesImg}
              src={movie.Poster_Link}
              alt={movie.Series_Title}
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
          </div>
        ))}
      </div>
    </div>
  );
}