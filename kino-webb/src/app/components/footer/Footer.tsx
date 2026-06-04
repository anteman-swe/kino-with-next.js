import styles from "./Footer.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <section className={styles.footerSection}>
          <h3>Om oss</h3>
          <ul className={styles.footerLinks}>
            <li>
              <a href="#">Jobba hos oss</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Om Kino</a>
            </li>
            <li>
              <a href="#">Filmfestivalen</a>
            </li>
            <li>
              <a href="#">Hitta hit</a>
            </li>
          </ul>
        </section>

        <section className={styles.footerSection}>
          <h3>Övrigt</h3>
          <ul className={styles.footerTerms}>
            <li>
              <a href="#">Köpvillkor</a>
            </li>
            <li>
              <Link href="/cookiepolicy">Cookiepolicy</Link>
            </li>
            <li>
              <Link href="/policy" className={styles.footerLink}>
                Integritetspolicy
              </Link>
            </li>
            <li>
              <a href="#">Åldersgränser</a>
            </li>
            <li>
              <a href="#">Tillgänglighet</a>
            </li>
          </ul>
        </section>

        <section className={styles.footerSection}>
          <h3>Hjälp & Kontakt</h3>
          <ul className={styles.footerInfo}>
            <li>
              <a href="#">Storgatan 12, 123 45 Lycksele</a>
            </li>
            <li>
              <a href="#">+46 950-xxxxxxx</a>
            </li>
            <li>
              <a href="#">info@kino.com</a>
            </li>
          </ul>
        </section>

        <section className={styles.footerSection}>
          <h3>Sociala medier</h3>
          <div className={styles.footerIcons}>
            <a href="#">𝕏</a>
            <a href="#">f</a>
            <a href="#">◎</a>
          </div>
        </section>
      </div>

      <section className={styles.footerExtra}>
        <h3>Nyhetsbrev</h3>
        <form className={styles.newsletter}>
          <input
            className={styles.newsletterInput}
            placeholder="you@example.com"
          />
          <button className={styles.newsletterSubmit}>Anmäl dig</button>
        </form>
      </section>
    </footer>
  );
}
