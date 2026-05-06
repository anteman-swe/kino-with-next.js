
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Kino - superprojektet  med Next.js</h1>
        </div>
      </main>
    </div>
  );
}
