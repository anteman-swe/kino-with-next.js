"use client";

import { Button, Input } from "@base-ui/react";
import styles from "./LoginModal.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/member-page");
  }

  const isDisabled = !username || !password;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <h2 className={styles.title}>Logga in</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Användarnamn
            <Input
              className={styles.inputField}
              placeholder="Användarnamn"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Lösenord
            <Input
              type="password"
              className={styles.inputField}
              placeholder="Lösenord"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className={styles.links}>
            <a>Har du inget konto? <span className={styles.registerLink}>Registrera dig</span></a>
            <a className={styles.forgotLink}>Glömt lösenord?</a>
          </div>

          <Button
            className={styles.loginBtn}
            type="submit"
            disabled={isDisabled}
          >
            Logga in
          </Button>

          <p className={styles.terms}>
            By registering you agree with our Terms and Conditions.
          </p>
        </form>
      </div>
    </div>
  );
}
