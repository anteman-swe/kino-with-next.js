"use client";

import { useEffect, useRef } from "react";
import "./MovieCarousel.scss";


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

export default function MovieCarousel({ movies }: MovieCarouselProps) {
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const heroInner = heroInnerRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

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

    if (heroInner && movies.length > 0) {
      const heroMovies = [...movies].sort(() => Math.random() - 0.5).slice(0, 6);

      // Injecting images into the container
      heroInner.innerHTML = heroMovies
        .map((movie, index) => {
          const { category, class: categoryClass } = getAgeCategory(
            movie.Certificate,
          );

          return `
                  <div class="carousel_slide ${index === 0 ? "active" : ""}" style="background-image: url('${movie.Poster_Link}')">
                      <div class="slide_content">
                          <h1 class="film_title">${movie.Series_Title}</h1>
                          <div class="festival_dates">
                              <h2>Released: ${movie.Released_Year}</h2>
                              <h3>${category ? `<span class="certificate-badge ${categoryClass}">${category}</span>` : ""}</h3><br>
                          </div>
                      </div>
                  </div>`;
        })
        .join("");

      const slides = heroInner.querySelectorAll(".carousel_slide");
      let currentSlide = 0;

      const showSlide = (index: number): void => {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove("active");
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
      };

      // Use onclick or ensure listeners aren't added multiple times
      if (prevBtn && nextBtn) {
        prevBtn.onclick = () => showSlide(currentSlide - 1);
        nextBtn.onclick = () => showSlide(currentSlide + 1);
      }

      // Auto-play
      const intervalId = setInterval(() => showSlide(currentSlide + 1), 5000);

      // Cleanup on unmount to prevent memory leaks
      return () => {
        clearInterval(intervalId);
        if (prevBtn) prevBtn.onclick = null;
        if (nextBtn) nextBtn.onclick = null;
      };
    }
  }, [movies]);

  return (
    
    <div className="carousel_container">
      {/* Define heroInner inside the function via ref */}
      <div id="heroInner" ref={heroInnerRef}></div>

      {/* Accessible navigation buttons with inline vector icons */}
      <button 
        className="carousel_control prev" 
        ref={prevBtnRef}
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
        ref={nextBtnRef}
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