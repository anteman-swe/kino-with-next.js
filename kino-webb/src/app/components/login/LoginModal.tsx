"use client";

import { Button, Input } from "@base-ui/react";
import Image from "next/image";
import styles from "./LoginModal.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const disabled = !email || !password;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    router.push("/member-page");
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

   
        <button className={styles.closeBtn} onClick={onClose}>×</button>

      
        <div className={styles.logoWrapper}>
          <Image
            src="/logo2.png"
            alt="Kino Lycksele logga"
            width={140}
            height={60}
            className={styles.logo}
            priority
          />
        </div>

  
        <h2 className={styles.title}>Logga in eller bli medlem</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            E‑postadress
            <Input
              className={styles.inputField}
              placeholder="E‑post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Lösenord
            <Input
              type="password"
              className={styles.inputField}
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <a className={styles.forgotLink}>Har du glömt ditt lösenord?</a>

          <Button className={styles.loginBtn} type="submit">
            Logga in
          </Button>

          <Button className={styles.registerBtn} type="button">
            Bli medlem
          </Button>

          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Avbryt
          </button>
        </form>
      </div>
    </div>
  );
}
