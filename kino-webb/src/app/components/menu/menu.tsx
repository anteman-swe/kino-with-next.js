"use client";

import { useState } from "react";
import styles from "./menu.module.scss";
import Link from "next/link";

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

          <ul className={styles.navList} onClick={() => setIsOpen(false)}>
            <li>
              <Link href="/">På bio just nu</Link>
            </li>
            <li>
              <Link href="/">Kommande filmer</Link>
            </li>
            <li>
              <Link href="/">Barnbio</Link>
            </li>
            <li>
              <Link href="/">Presentkort</Link>
            </li>
            <li>
              <Link href="/">Café&Bistro</Link>
            </li>
            <li>
              <Link href="/">Event</Link>
            </li>
            <li>
              <Link href="/">Kundservice</Link>
            </li>
            <li>
              <Link href="/member-page">Mina sidor</Link>
            </li>
            <li>
              <Link href="/">Företag</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
