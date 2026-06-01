import { BookingClient } from "@/app/components/booking/bookingClient";

// TODO DATABASE LIVE: (remove comments on imports below)
// import { notFound } from "next/navigation";
// import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookingPage({ params }: PageProps) {
  const { id } = await params;

  // TODO MOCK:
  // Remove the whole mockMovie-block when we go live with database
  const mockMovie = {
    id: Number(id),
    title: "Jurassic Park",
    poster: "https://m.media-amazon.com/images/I/61iF3RSsLsL._AC_SL1000_.jpg",
    runtime: "2h 7min",
    screenings: [
      {
        id: 1,
        startsAt: "2026-06-01T14:30:00.000Z",
        price: 149,
      },
      {
        id: 2,
        startsAt: "2026-06-01T17:00:00.000Z",
        price: 149,
      },
      {
        id: 3,
        startsAt: "2026-06-02T18:30:00.000Z",
        price: 149,
      },
      {
        id: 4,
        startsAt: "2026-06-03T20:30:00.000Z",
        price: 149,
      },
    ],
  };

  return <BookingClient movie={mockMovie} />;

  /*
  TODO DATABASE LIVE:
  Remove mockMovie above
  Below is live code which will be used

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
  */
}
