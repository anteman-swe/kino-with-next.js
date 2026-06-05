"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { BookingClient } from "./components/BookingClient";

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

function BookingPageContent() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const initialScreeningId = Number(searchParams.get("screeningId"));

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

  return (
    <BookingClient
      movie={movie}
      initialScreeningId={
        Number.isNaN(initialScreeningId) ? null : initialScreeningId
      }
    />
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<p>Laddar bokning...</p>}>
      <BookingPageContent />
    </Suspense>
  );
}
