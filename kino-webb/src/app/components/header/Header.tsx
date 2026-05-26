"use client";
import styles from "./Header.module.scss";
import Logo from "./Logo";
import Menu from "../menu/menu";
import { signOut, useSession } from "next-auth/react";
import { useMemo } from "react";

type HeaderProps = {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  children?: React.ReactNode;
};

const logOut = async () => {await signOut({ redirectTo: "/" })};

export default function Header({ onOpenLogin, children }: HeaderProps) {
  const { data: session, status } = useSession();
  const buttonMode = useMemo(() => {
    if (session?.user && status === "authenticated") {
      return true;
    } else return false;
  }, [session?.user, status]);
  
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
