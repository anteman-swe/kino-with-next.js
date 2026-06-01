"use client";

import { useEffect, useState } from "react";
import "./MovieCarousel.module.scss";

export interface Movie {
  Certificate: string | number | null | undefined;
  Poster_Link: string;
  Series_Title: string;
  Released_Year: string | number;
}

interface AgeCategory {
  category: string | null;
  class: string | null;
}

interface MovieCarouselProps {
  movies: Movie[];
}

const getAgeCategory = (certificate: Movie["Certificate"]): AgeCategory => {
  if (!certificate) return { category: null, class: null };
  const cert = certificate.toString().toUpperCase();
  if (cert === "A" || cert === "R") {
    return { category: "Adult", class: "adults-only" };
  } else if (cert === "U" || cert === "UA" || cert === "PG-13") {
    return { category: "Children", class: "for-children" };
  } else {
    return { category: certificate.toString(), class: "other-rating" };
  }
};

export default function MovieCarousel({ movies }: MovieCarouselProps) {
  const [carouselMovies, setCarouselMovies] = useState<Movie[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);


  useEffect(() => {
    if (movies && movies.length > 0) {
      const selected = [...movies].sort(() => Math.random() - 0.5).slice(0, 6);
      setCarouselMovies(selected);
      setCurrentSlide(0);
    }
  }, [movies]);


  useEffect(() => {
    if (carouselMovies.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselMovies.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [carouselMovies]);


  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselMovies.length) % carouselMovies.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselMovies.length);
  };

  if (carouselMovies.length === 0) return null;

  return (
    <div className="carousel_container">
      <div id="heroInner">
        {carouselMovies.map((movie, index) => {
          const { category, class: categoryClass } = getAgeCategory(movie.Certificate);
          const isActive = index === currentSlide;

          return (
            <div
              key={`${movie.Series_Title}-${index}`}
              className={`carousel_slide ${isActive ? "active" : ""}`}
              style={{ backgroundImage: `url('${movie.Poster_Link}')` }}
            >
              <div className="slide_content">
                <h1 className="film_title">{movie.Series_Title}</h1>
                <div className="festival_dates">
                  <h2>Released: {movie.Released_Year}</h2>
                  {category && (
                    <h3>
                      <span className={`certificate-badge ${categoryClass}`}>{category}</span>
                    </h3>
                  )}
                  <br />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    
      <button 
        className="carousel_control prev" 
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="icon"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button 
        className="carousel_control next" 
        onClick={handleNext}
        aria-label="Next slide"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="icon"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
