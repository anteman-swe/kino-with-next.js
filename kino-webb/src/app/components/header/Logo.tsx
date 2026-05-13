
import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <img
      src="/logo2.png"  
      alt="Kino logo"
      className={styles.logo}
    />
  );
}
