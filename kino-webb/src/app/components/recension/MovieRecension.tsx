"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import style from "./MovieRecension.module.scss";
import { movies } from "@/Data/movies";

interface MovieRecensionProps {
  movieId: number;
}

interface Review {
  id: number;
  movieId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function MovieRecension({ movieId }: MovieRecensionProps) {
  const { data: session } = useSession();
  const currentMovie = movies.find((m) => m.id === movieId);

  const [movieReviews, setMovieReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/reviews/${movieId}`);

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("Server error response details:", errorData);
          throw new Error("Failed to fetch data from the database");
        }

        const data = await res.json();

        setMovieReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading reviews inside catch block:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  if (!currentMovie) {
    return (
      <div className={style.errorContainer}>
        <h2>Movie not found</h2>
        <Link href="/" className={style.backLink}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to home page
        </Link>
      </div>
    );
  }

  const averageRating =
    movieReviews.length > 0
      ? movieReviews.reduce((sum, review) => sum + review.rating, 0) /
        movieReviews.length
      : 0;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      alert("You must be logged in to submit a review.");
      return;
    }

    if (!userName.trim() || !comment.trim()) {
      alert("Please fill in both name and comment.");
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${movieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          userName: userName.trim(),
          rating: rating,
          comment: comment.trim(),
          verified: true,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json().catch(() => ({}));
        console.error("Backend error details:", errorResponse);
        throw new Error("Failed to save review via nested movie route");
      }

      const savedReview: Review = await response.json();
      setMovieReviews([savedReview, ...movieReviews]);

      setUserName("");
      setComment("");
      setRating(5);
    } catch (error) {
      console.error("Error saving review:", error);
      alert("Could not save your review right now. Please try again later.");
    }
  };

  return (
    <div className={style.recensionContainer}>
      <div className={style.heroBanner}>
        <div className={style.gradientOverlay} />
        <Image
          src={currentMovie.Poster_Link}
          alt=""
          fill
          priority
          className={style.bannerImg}
        />
        <div className={style.topNav}>
          <Link href="/" className={style.backLink}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to movies
          </Link>
        </div>

        <div className={style.heroContent}>
          {currentMovie.Genre && (
            <div className={style.genres}>
              {currentMovie.Genre.split(",").map((g: string, i: number) => (
                <span key={i} className={style.genreTag}>
                  {g.trim()}
                </span>
              ))}
            </div>
          )}
          <h1 className={style.movieTitle}>{currentMovie.Series_Title}</h1>
          <div className={style.metaRow}>
            {currentMovie.Released_Year && (
              <span className={style.metaItem}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                {currentMovie.Released_Year}
              </span>
            )}
            {currentMovie.Runtime && (
              <span className={style.metaItem}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {currentMovie.Runtime}
              </span>
            )}
            {currentMovie.Director && (
              <span className={style.metaItem}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 3v18" />
                  <path d="M17 3v18" />
                  <path d="M3 7h4" />
                  <path d="M3 12h4" />
                  <path d="M3 17h4" />
                  <path d="M17 7h4" />
                  <path d="M17 12h4" />
                  <path d="M17 17h4" />
                </svg>
                Director: {currentMovie.Director}
              </span>
            )}
          </div>
          <Link
            href={`/movies/${currentMovie.id}/booking`}
            className={style.bookButton}
          >
            Boka biljetter
          </Link>
        </div>
      </div>

      <main className={style.mainContent}>
        <div className={style.reviewDetails}>
          <section className={style.synopsisSection}>
            <h2 className={style.sectionTitle}>Synopsis</h2>
            <p className={style.synopsisText}>
              {currentMovie.Overview ||
                "No description available for this movie at this moment."}
            </p>
          </section>

          {currentMovie.Stars && currentMovie.Stars.length > 0 && (
            <section className={style.castSection}>
              <h3 className={style.subTitle}>Cast</h3>
              <p className={style.castText}>
                {currentMovie.Stars.filter(Boolean).join(", ")}
              </p>
            </section>
          )}

          {/* User Reviews Card */}
          <div className={style.userReviewsCard}>
            <h3 className={style.cardTitle}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              User Reviews
            </h3>

            {isLoading ? (
              <p className={style.noReviews}>
                Loading reviews from database...
              </p>
            ) : movieReviews.length === 0 ? (
              <p className={style.noReviews}>
                No reviews written yet. Be the first to write one!
              </p>
            ) : (
              <div className={style.reviewsList}>
                {movieReviews.map((review) => (
                  <div key={review.id} className={style.reviewItem}>
                    <div className={style.reviewHeader}>
                      <span className={style.reviewerName}>
                        {review.userName || "A Kino member"}
                      </span>
                      <span className={style.reviewDate}>
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              },
                            )
                          : ""}
                      </span>
                    </div>
                    <div className={style.reviewStars}>
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={
                            index < review.rating
                              ? style.filledStar
                              : style.emptyStar
                          }
                          fill={index < review.rating ? "currentColor" : "none"}
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    {review.comment && (
                      <p className={style.reviewComment}>"{review.comment}"</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <section className={style.addReviewSection}>
            <h3 className={style.formSectionTitle}>Write a review</h3>
            <form onSubmit={handleSubmitReview} className={style.reviewForm}>
              <div className={style.formRow}>
                <div className={style.formGroup}>
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="E.g. Jane Doe"
                  />
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="rating">Rating</label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    {[...Array(5)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} / 5 ★
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={style.formGroup}>
                <label htmlFor="comment">Your comment</label>
                <textarea
                  id="comment"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you thought about the movie..."
                  rows={4}
                />
              </div>
              <button type="submit" className={style.submitButton}>
                Submit review
              </button>
            </form>
          </section>
        </div>

        <div className={style.sidebar}>
          <div className={style.ratingCard}>
            <h3 className={style.cardTitle}>Kino Rating</h3>
            <div className={style.scoreBox}>
              <svg
                className={style.starIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className={style.ratingNum}>
                {isLoading
                  ? "..."
                  : averageRating > 0
                    ? averageRating.toFixed(1)
                    : "-"}
              </span>
              <span className={style.ratingMax}>/ 5</span>
            </div>
            <p className={style.reviewCountText}>
              Based on {movieReviews.length}{" "}
              {movieReviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div className={style.posterCard}>
            <div className={style.posterWrapper}>
              <Image
                src={currentMovie.Poster_Link}
                alt={`${currentMovie.Series_Title} Poster`}
                fill
                sizes="(max-width: 1024px) 100vw, 350px"
                priority
                className={style.featuredPosterImg}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
