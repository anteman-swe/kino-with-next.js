import styles from "./booking.module.scss";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const seatsPerRow = 12;

type SeatMapProps = {
  bookedSeats: string[];
  selectedSeats: string[];
  onToggleSeat: (seat: string) => void;
};

export function SeatMap({
  bookedSeats,
  selectedSeats,
  onToggleSeat,
}: SeatMapProps) {
  return (
    <section className={styles.section}>
      <h2>Välj platser</h2>

      <div className={styles.legend}>
        <span>
          <i className={styles.freeSeat} /> Ledig
        </span>
        <span>
          <i className={styles.selectedSeat} /> Vald
        </span>
        <span>
          <i className={styles.bookedSeat} /> Bokad
        </span>
      </div>

      <div className={styles.screen} />

      <p className={styles.auditorium}>Bioduk</p>

      <div className={styles.seatMap}>
        {rows.map((row) => (
          <div key={row} className={styles.seatRow}>
            <span className={styles.rowLabel}>{row}</span>

            {Array.from({ length: seatsPerRow }, (_, index) => {
              const seat = `${row}${index + 1}`;
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);

              return (
                <button
                  key={seat}
                  type="button"
                  disabled={isBooked}
                  onClick={() => onToggleSeat(seat)}
                  className={[
                    styles.seat,
                    isSelected ? styles.selected : "",
                    isBooked ? styles.booked : "",
                    index === 6 ? styles.afterAisle : "",
                  ].join(" ")}
                >
                  {index + 1}
                </button>
              );
            })}

            <span className={styles.rowLabel}>{row}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
