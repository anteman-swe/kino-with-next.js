"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./booking.module.scss";
import { BookingHeader } from "./bookingHeader";
import { DateSelector } from "./dateSelector";
import { TimeSelector } from "./timeSelector";
import { SeatMap } from "./seatMap";
import { BookingSummary } from "./bookingSummary";

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

type BookingClientProps = {
  movie: Movie;
};

export function BookingClient({ movie }: BookingClientProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedScreeningId, setSelectedScreeningId] = useState<number | null>(
    null,
  );
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const screeningsByDate = useMemo(() => {
    return movie.screenings.reduce<Record<string, Screening[]>>(
      (acc, screening) => {
        const date = screening.startsAt.slice(0, 10);
        acc[date] = [...(acc[date] ?? []), screening];
        return acc;
      },
      {},
    );
  }, [movie.screenings]);

  const dates = useMemo(
    () => Object.keys(screeningsByDate),
    [screeningsByDate],
  );

  const selectedScreening = movie.screenings.find(
    (screening) => screening.id === selectedScreeningId,
  );

  useEffect(() => {
    if (!selectedDate && dates.length > 0) {
      const firstDate = dates[0];
      setSelectedDate(firstDate);
      setSelectedScreeningId(screeningsByDate[firstDate][0]?.id ?? null);
    }
  }, [dates, selectedDate, screeningsByDate]);

  useEffect(() => {
    async function loadBookedSeats() {
      if (!selectedScreeningId) {
        return;
      }

      setError("");
      setSuccessMessage("");

      const response = await fetch(
        `/api/screenings/${selectedScreeningId}/seats`,
      );

      if (!response.ok) {
        setError("Kunde inte hämta bokade platser.");
        return;
      }

      const data = await response.json();
      setBookedSeats(data.bookedSeats);
      setSelectedSeats([]);
    }

    loadBookedSeats();
  }, [selectedScreeningId]);

  function handleSelectDate(date: string) {
    setSelectedDate(date);
    setSelectedScreeningId(screeningsByDate[date][0]?.id ?? null);
    setSelectedSeats([]);
    setError("");
    setSuccessMessage("");
  }

  function toggleSeat(seat: string) {
    if (bookedSeats.includes(seat)) {
      return;
    }

    setSelectedSeats((current) =>
      current.includes(seat)
        ? current.filter((item) => item !== seat)
        : [...current, seat],
    );

    setError("");
    setSuccessMessage("");
  }

  async function reloadBookedSeats(screeningId: number) {
    const response = await fetch(`/api/screenings/${screeningId}/seats`);

    if (!response.ok) {
      setError("Kunde inte uppdatera bokade platser.");
      return;
    }

    const data = await response.json();
    setBookedSeats(data.bookedSeats);
  }

  async function bookSeats() {
    if (!selectedScreening || selectedSeats.length === 0) {
      return;
    }

    setError("");
    setSuccessMessage("");

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        screeningId: selectedScreening.id,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * selectedScreening.price,
      }),
    });

    if (response.status === 409) {
      setError("En eller flera platser hann bli bokade. Välj igen.");
      await reloadBookedSeats(selectedScreening.id);
      setSelectedSeats([]);
      return;
    }

    if (!response.ok) {
      setError("Bokningen kunde inte genomföras.");
      return;
    }

    setSuccessMessage("Bokningen är bekräftad.");
    setSelectedSeats([]);
    await reloadBookedSeats(selectedScreening.id);
  }

  return (
    <main className={styles.page}>
      <BookingHeader movie={movie} />

      <DateSelector
        dates={dates}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />

      <TimeSelector
        screenings={screeningsByDate[selectedDate] ?? []}
        selectedScreeningId={selectedScreeningId}
        onSelectScreening={setSelectedScreeningId}
      />

      <SeatMap
        bookedSeats={bookedSeats}
        selectedSeats={selectedSeats}
        onToggleSeat={toggleSeat}
      />

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <BookingSummary
        selectedSeats={selectedSeats}
        price={selectedScreening?.price ?? 0}
        onBook={bookSeats}
      />
    </main>
  );
}
