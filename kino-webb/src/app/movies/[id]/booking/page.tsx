"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BookingClient } from "@/app/components/booking/BookingClient";

type Screening = {
  id: number;
  startsAt: string;
  price: number;
};

type Movie = {
  id: number;
  title: string;
  poster: string;
  runtime: string;
  screenings: Screening[];
};

export default function BookingPage() {
  const params = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      try {
        const response = await fetch(`/api/movies/${params.id}/booking`);

        if (!response.ok) {
          setError("Kunde inte hämta filmen.");
          return;
        }

        const data = await response.json();
        setMovie(data);
      } catch {
        setError("Något gick fel när filmen skulle hämtas.");
      } finally {
        setIsLoading(false);
      }
    }

    loadMovie();
  }, [params.id]);

  if (isLoading) {
    return <p>Laddar bokning...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Filmen kunde inte hittas.</p>;
  }

  return <BookingClient movie={movie} />;
}
