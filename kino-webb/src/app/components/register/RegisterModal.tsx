"use client";

import { Button, Input } from "@base-ui/react";
import Image from "next/image";
import styles from "./RegisterModal.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

type RegisterModalProps = {
  onClose: () => void;
  onOpenLogin?: () => void;
};

export default function RegisterModal({ onClose, onOpenLogin }: RegisterModalProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  function validateEmail(value: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  const nameIsInvalid = nameTouched && name.trim().length === 0;
  const emailIsInvalid = emailTouched && !validateEmail(email);
  const passwordIsInvalid = passwordTouched && password.trim().length ===0;

  const isFormValid =
    name.trim().length > 0 &&
    validateEmail(email) &&
    password.trim().length >0;

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
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

        <h2 className={styles.title}>Bli medlem</h2>

        <form onSubmit={handleSubmit} className={styles.form}>

          {/* NAME */}
          <label>
            Namn
            <Input
              className={`${styles.inputField} ${nameIsInvalid ? styles.inputError : ""}`}
              placeholder="Ditt namn"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameTouched(true);
              }}
              onBlur={() => setNameTouched(true)}
            />
            {nameIsInvalid && (
              <p className={styles.errorText}>Namn måste anges</p>
            )}
          </label>

          {/* EMAIL */}
          <label>
            E‑postadress
            <Input
              className={`${styles.inputField} ${emailIsInvalid ? styles.inputError : ""}`}
              placeholder="E‑post"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailTouched(true);
              }}
              onBlur={() => setEmailTouched(true)}
            />
            {emailIsInvalid && (
              <p className={styles.errorText}>E‑postadress måste anges i giltigt format</p>
            )}
          </label>

          {/* PASSWORD */}
          <label>
            Lösenord
            <Input
              type="password"
              className={`${styles.inputField} ${passwordIsInvalid ? styles.inputError : ""}`}
              placeholder="Lösenord"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordTouched(true);
              }}
              onBlur={() => setPasswordTouched(true)}
            />
            {passwordIsInvalid && (
              <p className={styles.errorText}>Lösenord måste anges</p>
            )}
          </label>

          {/* CREATE ACCOUNT */}
          <Button
            className={styles.registerBtnPrimary}
            type="submit"
            disabled={!isFormValid}
          >
            Skapa konto
          </Button>

          {/* SWITCH TO LOGIN */}
          {onOpenLogin && (
            <Button className={styles.loginBtn} type="button" onClick={onOpenLogin}>
              Har du redan ett konto? Logga in
            </Button>
          )}

          {/* CANCEL */}
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Avbryt
          </button>
        </form>
      </div>
    </div>
  );
}
