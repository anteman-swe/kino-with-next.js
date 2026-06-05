import styles from "./booking.module.scss";

type Props = {
  selectedSeats: string[];
  price: number;
  onBook: () => void;
};

export function BookingSummary({ selectedSeats, price, onBook }: Props) {
  const totalPrice = selectedSeats.length * price;

  return (
    <section className={styles.summary}>
      <h2>Betalning</h2>
      <p>Valda platser: {selectedSeats.join(", ") || "Inga"}</p>
      <p>Totalt: {totalPrice} kr</p>

      <button
        type="button"
        disabled={selectedSeats.length === 0}
        onClick={onBook}
        className={styles.bookButton}
      >
        Betala med swish
      </button>
    </section>
  );
}
