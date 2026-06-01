import Event, { type Event as EventType } from "./event";
import styles from "./event.module.scss";

type EventListProps = {
  events: EventType[];
  title?: string;
};

export default function EventList({
  events,
  title = "Aktuella och kommande event",
}: EventListProps) {
  if (!events?.length) {
    return <p className={styles.empty}>Inga event att visa.</p>;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.track}>
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
