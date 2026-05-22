import Image from "next/image";
import styles from "./BistroBanner.module.scss";

export default function BistroBanner() {
  return (
    <div className={styles.banner}>
      <Image
        src="/bistro/bistroBanner.png"
        alt="Image symbolizing our Bistro Kino"
        width={180}
        height={80}
        className={styles.logo}
        priority
      />

      <p className={styles.tags}>
        
      </p>
    </div>
  );
}
