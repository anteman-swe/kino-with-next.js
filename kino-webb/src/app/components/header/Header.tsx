"use client";
import styles from "./Header.module.scss";
import Logo from "./Logo";
import Menu from "../menu/menu";

type HeaderProps = {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
};

export default function Header({ onOpenLogin, onOpenRegister }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Menu />
        <Logo />

        <button className={styles.loginButton} onClick={onOpenLogin}>
          JOIN / LOGIN
        </button>
      </div>
    </header>
  );
}
