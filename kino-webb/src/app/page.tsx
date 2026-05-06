
import styles from "./page.module.scss";
import Start from "./components/start";

export default function Home() {
  return (
    <div>
      <main>
        <div>
          <h1 className={styles.headline}>Kino - superprojektet  med Next.js (Page.tsx)</h1>
          <Start />
        </div>
      </main>
    </div>
  );
}
