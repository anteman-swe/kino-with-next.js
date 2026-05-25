"use client";
import styles from "./Header.module.scss";
import Logo from "./Logo";
import Menu from "../menu/menu";
import { signOut, useSession } from "next-auth/react";

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
const logOut = () => {signOut()};

export default function Header({ onOpenLogin }: HeaderProps) {
  const { data: session, status } = useSession();

  if (session?.user) {
      return (
      <header className={styles.header}>
        <div className={styles.header__inner}>
          
          
            <Logo />
          
          <button className={styles.loginButton}
          onClick={logOut}
          >
            LOGGA UT
          </button>
        </div>
      </header>
    );
  } else {
      return (
      <header className={styles.header}>
        <div className={styles.header__inner}>
          
          
            <Logo />
          
          <button className={styles.loginButton}
          onClick={onOpenLogin}
          >
            { status === "loading" ? "Laddar..." : "BLI MEDLEM / LOGGA IN" }
          </button>
        </div>
      </header>
    );
  }





  
}
