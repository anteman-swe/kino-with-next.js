
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.headline}>Kino - superprojektet  med Next.js</h1>
        </div>
      </main>
    </div>
  );
}
