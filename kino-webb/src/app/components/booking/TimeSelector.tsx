import styles from "./booking.module.scss";

type Screening = {
  id: number;
  startsAt: string;
  price: number;
};

type Props = {
  screenings: Screening[];
  selectedScreeningId: number | null;
  onSelectScreening: (id: number) => void;
};

export function TimeSelector({
  screenings,
  selectedScreeningId,
  onSelectScreening,
}: Props) {
  return (
    <section className={styles.section}>
      <h2>Välj tid</h2>
      <div className={styles.options}>
        {screenings.map((screening) => (
          <button
            key={screening.id}
            type="button"
            onClick={() => onSelectScreening(screening.id)}
            className={`${styles.option} ${
              screening.id === selectedScreeningId ? styles.active : ""
            }`}
          >
            {new Date(screening.startsAt).toLocaleTimeString("sv-SE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </button>
        ))}
      </div>
    </section>
  );
}
