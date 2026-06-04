import Image from "next/image";
import Link from "next/link"; // 1. Import Next.js Link
import style from "./PopularMovies.module.scss";
// import { reviews } from "@/Data/reviews";
// import { movies } from "@/Data/movies";
import { prisma } from "@/lib/prisma";

const THIRTY_DAYS = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
// const now = Date.now();

export default async function PopularMovies() {
  // const recentReviews = reviews.filter((review) => {
  //   const reviewTime = new Date(review.createdAt).getTime();
  //   return now - reviewTime <= THIRTY_DAYS;
  // });

  const moviesFromDb = await prisma.movie.findMany({
    include: {
      reviews: {
        where: {
          createdAt: {
            gte: THIRTY_DAYS,
          },
        },
      },
    },
  });

  const popularMovies = moviesFromDb
    .map((movie) => {
      const movieReviews = movie.reviews; // recentReviews.filter(
      //   (review) => review.movieId === movie.id
      // );

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
              src={movie.posterLink}
              alt={movie.seriesTitle}
              width={200}
              height={300}
              style={{ height: 'auto', width: '100%' }} // Solves aspect ratio warning
              priority={true} // Speeds up loading for above-the-fold content
            />

            <h3 className={style.popularMoviesTitle}>
              {movie.seriesTitle}
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