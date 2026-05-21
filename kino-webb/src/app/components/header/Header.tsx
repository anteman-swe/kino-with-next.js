"use client";

import styles from "./Header.module.scss";
import Logo from "./Logo";

type HeaderProps = {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  children?: React.ReactNode; 
};

export default function Header({ onOpenLogin, onOpenRegister, children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Logo />
        
      
        <div className={styles.header__controls}>
          {children} 
          
          <button 
            className={styles.loginButton}
            onClick={onOpenLogin}
          >
            JOIN / LOGIN
          </button>
        </div>
      </div>
    </header>
  );
}