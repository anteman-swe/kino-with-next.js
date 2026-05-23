"use client";

import { useState } from "react";
import styles from "./menu.module.scss";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={() => setIsOpen(true)}>
        ☰ Meny
      </button>

      <nav
        className={`${styles.overlay} ${isOpen ? styles.overlayActive : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <div className={styles.menuModal} onClick={(e) => e.stopPropagation()}>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Stäng meny"
          >
            ×
          </button>

          <ul className={styles.navList}>
            <li>
              <a href="/">På bio just nu</a>
            </li>
            <li>
              <a href="/">Kommande filmer</a>
            </li>
            <li>
              <a href="/">Barnbio</a>
            </li>
            <li>
              <a href="/">Presentkort</a>
            </li>
            <li>
              <a href="/">Café&Bistro</a>
            </li>
            <li>
              <a href="/">Event</a>
            </li>
            <li>
              <a href="/">Kundservice</a>
            </li>
            <li>
              <a href="/">Mina sidor</a>
            </li>
            <li>
              <a href="/">Företag</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
