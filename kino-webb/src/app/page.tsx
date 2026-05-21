
import styles from "./page.module.scss";
import BistroSection from "./components/bistro/bistroSection/BistroSection";
export default function Home() {
  return (
    <>
      <main className={styles.page}>
        <h1 className={styles.headline}>
          Kino - superprojekt
        </h1>

        <BistroSection />
      </main>
    </>
  );  
}