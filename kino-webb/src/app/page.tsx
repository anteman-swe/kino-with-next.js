
import styles from "./page.module.scss";
import Start from "./components/start";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <h1 className={styles.headline}>
          Kino - superprojekt
        </h1>
      </main>
      <Start />
      <Footer />
    </div>
  );  
}