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

// TODO MOCK:
// Sätt till false när databasen och API:t ska användas live.
const USE_MOCK_BOOKING = true;

const mockBookedSeatsByScreening: Record<number, string[]> = {
  1: ["D4", "D5", "D6", "E8"],
  2: ["A1", "A2", "B7"],
  3: ["H10", "H11", "H12"],
  4: ["C3", "C4", "F6"],
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

      if (USE_MOCK_BOOKING) {
        setBookedSeats(mockBookedSeatsByScreening[selectedScreeningId] ?? []);
        setSelectedSeats([]);
        return;
      }

      /*
      TODO DATABASE LIVE:
      När API:t och databasen fungerar:
      1. Sätt USE_MOCK_BOOKING till false.
      2. Behåll koden nedan.
      3. Mock-koden ovan kan tas bort.

      const response = await fetch(`/api/screenings/${selectedScreeningId}/seats`);

      if (!response.ok) {
        setError("Kunde inte hämta bokade platser.");
        return;
      }

      const data = await response.json();
      setBookedSeats(data.bookedSeats);
      setSelectedSeats([]);
      */
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

  async function bookSeats() {
    if (!selectedScreening || selectedSeats.length === 0) {
      return;
    }

    setError("");
    setSuccessMessage("");

    if (USE_MOCK_BOOKING) {
      setBookedSeats((current) => [...current, ...selectedSeats]);
      setSuccessMessage(`Mockbokning bekräftad: ${selectedSeats.join(", ")}`);
      setSelectedSeats([]);
      return;
    }

    /*
    TODO DATABASE LIVE:
    När API:t och databasen fungerar:
    1. Sätt USE_MOCK_BOOKING till false.
    2. Behåll koden nedan.
    3. Ta bort mock-blocket ovan.

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

      const seatsResponse = await fetch(
        `/api/screenings/${selectedScreening.id}/seats`
      );
      const data = await seatsResponse.json();

      setBookedSeats(data.bookedSeats);
      setSelectedSeats([]);
      return;
    }

    if (!response.ok) {
      setError("Bokningen kunde inte genomföras.");
      return;
    }

    setSuccessMessage("Bokningen är bekräftad.");
    setSelectedSeats([]);

    const seatsResponse = await fetch(
      `/api/screenings/${selectedScreening.id}/seats`
    );
    const data = await seatsResponse.json();
    setBookedSeats(data.bookedSeats);
    */
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
