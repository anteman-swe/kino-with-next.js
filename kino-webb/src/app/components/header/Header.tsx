import styles from "./Header.module.scss";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
         
        
          <Logo />
        
      </div>
    </header>
  );
}
