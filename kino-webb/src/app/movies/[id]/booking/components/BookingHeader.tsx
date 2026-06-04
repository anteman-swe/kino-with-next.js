import styles from "./booking.module.scss";

type Props = {
  movie: {
    title: string;
    poster: string;
    runtime: string;
  };
};

export function BookingHeader({ movie }: Props) {
  return (
    <header className={styles.header}>
      <img className={styles.poster} src={movie.poster} alt={movie.title} />
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.runtime}</p>
      </div>
    </header>
  );
}
