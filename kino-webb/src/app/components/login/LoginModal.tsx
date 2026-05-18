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

  // För att undvika rödmarkering direkt
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  function validateEmail(value: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  const emailIsInvalid = emailTouched && !validateEmail(email);
  const passwordIsEmpty = passwordTouched && password.trim().length === 0;

  const isFormValid =
    validateEmail(email) && password.trim().length > 0;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isFormValid) return;

    router.push("/member-page");
  }

  return (
    <div className={styles.overlay}>
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
          
          {/* EMAIL */}
          <label>
            E‑postadress
            <Input
              className={`${styles.inputField} ${
                emailIsInvalid ? styles.inputError : ""
              }`}
              placeholder="E‑post"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailTouched(true);
              }}
              onBlur={() => setEmailTouched(true)}
            />
            {emailIsInvalid && (
              <p className={styles.errorText}>
                E‑postadress måste anges i giltigt format
              </p>
            )}
          </label>

          {/* PASSWORD */}
          <label>
            Lösenord
            <Input
              type="password"
              className={`${styles.inputField} ${
                passwordIsEmpty ? styles.inputError : ""
              }`}
              placeholder="Lösenord"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordTouched(true);
              }}
              onBlur={() => setPasswordTouched(true)}
            />
            {passwordIsEmpty && (
              <p className={styles.errorText}>
                Lösenord måste anges
              </p>
            )}
          </label>

          <a className={styles.forgotLink}>Har du glömt ditt lösenord?</a>

          <Button
            className={styles.loginBtn}
            type="submit"
            disabled={!isFormValid}
          >
            Logga in
          </Button>

           <Button
            className={styles.registerBtn}
            type="button"
          >
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
