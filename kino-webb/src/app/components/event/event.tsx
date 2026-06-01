import styles from "./event.module.scss";

export type Event = {
  id: string;
  title: string;
  date: string;
  image: string;
};

type EventProps = {
  event: Event;
};

export default function Event({ event }: EventProps) {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={event.image} alt={event.title} />

      <div className={styles.content}>
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.date}>{event.date}</p>
      </div>
    </article>
  );
}
