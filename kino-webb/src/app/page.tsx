import styles from "./page.module.scss";
import UpcomingScreenings from "./components/upcoming-screenings/UpcomingScreenings";

export default function Home() {
  return (
    <>
      <main className={styles.page}>
        <h1 className={styles.headline}>
          Kino - superprojekt
        </h1>

      <UpcomingScreenings />
    
  
      </main>
    </>
  );   
}