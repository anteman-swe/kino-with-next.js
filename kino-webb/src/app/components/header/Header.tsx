"use client";
import styles from "./Header.module.scss";
import Logo from "./Logo";
import Menu from "../menu/menu";
import { signOut, useSession } from "next-auth/react";

type HeaderProps = {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
};

const logOut = () => {signOut()};

export default function Header({ onOpenLogin }: HeaderProps) {
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
        <button className={styles.loginButton}
          onClick={buttonMode ? logOut : onOpenLogin}
        >
          { status === "loading" ? "Laddar..." : buttonMode ? "BLI MEDLEM / LOGGA IN" : "LOGGA UT"}
        </button>
      </div>
    </header>
  );
}