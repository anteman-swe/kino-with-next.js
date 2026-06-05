import styles from "./booking.module.scss";

type Props = {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export function DateSelector({ dates, selectedDate, onSelectDate }: Props) {
  if (dates.length === 0) {
    return (
      <section className={styles.section}>
        <h2>Välj datum</h2>
        <p>Det finns inga visningar för den här filmen.</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2>Välj datum</h2>
      <div className={styles.options}>
        {dates.map((date) => (
          <button
            key={date}
            type="button"
            onClick={() => onSelectDate(date)}
            className={`${styles.option} ${
              date === selectedDate ? styles.active : ""
            }`}
          >
            {new Date(date).toLocaleDateString("sv-SE", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </button>
        ))}
      </div>
    </section>
  );
}
