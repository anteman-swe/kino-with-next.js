import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BookingClient } from "@/app/components/booking/bookingClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookingPage({ params }: PageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (Number.isNaN(movieId)) {
    notFound();
  }

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
    include: {
      screenings: {
        orderBy: {
          startsAt: "asc",
        },
      },
    },
  });

  if (!movie) {
    notFound();
  }

  return (
    <BookingClient
      movie={{
        id: movie.id,
        title: movie.seriesTitle,
        poster: movie.posterLink,
        runtime: movie.runtime,
        screenings: movie.screenings.map((screening) => ({
          id: screening.id,
          startsAt: screening.startsAt.toISOString(),
          price: screening.price,
        })),
      }}
    />
  );
}
