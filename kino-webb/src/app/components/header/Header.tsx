"use client";
import styles from "./Header.module.scss";
import Logo from "./Logo";
import Menu from "../menu/menu";
import { signOut, useSession } from "next-auth/react";

type HeaderProps = {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  children?: React.ReactNode;
};

const logOut = () => {signOut()};

export default function Header({ onOpenLogin, children }: HeaderProps) {
  const { data: session, status } = useSession();
  let buttonMode:  boolean = false;
  if (session?.user) {
      buttonMode = true;
  }
  return (
      <header className={styles.header}>
        <div className={styles.header__inner}>
        <Menu />
        <Logo />
        <div className={styles.header__controls}>
          {children}
        </div>
        <button className={styles.loginButton}
          onClick={buttonMode ? logOut : onOpenLogin}
        >
          { status === "loading" ? "Laddar..." : buttonMode ? "LOGGA UT" : "BLI MEDLEM / LOGGA IN"}
        </button>
      </div>
    </header>
  );
}
