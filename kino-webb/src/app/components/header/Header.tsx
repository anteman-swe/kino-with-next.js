"use client";
import styles from "./Header.module.scss";
import Logo from "./Logo";

type HeaderProps = {
  onOpenLogin: () => void;
};

export default function Header({ onOpenLogin }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
         
        
          <Logo />
        
        <button className={styles.loginButton}
        onClick={onOpenLogin}
        >
          JOIN / LOGIN
        </button>
      </div>
    </header>
  );
}
