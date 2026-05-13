"use client";

import styles from "./LoginModal.module.scss";
import { useRouter } from "next/navigation";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/member-page"); 
  }

  return (
    <div className={styles.login__modal} onClick={onClose}>
      <div className={styles.login__content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.login__close} onClick={onClose}>✕</button>

        <h2 className={styles.login__title}>Logga in</h2>

        <form className={styles.login__form} onSubmit={handleSubmit}>
          <input
            className={styles.login__input}
            type="email"
            placeholder="E-post"
            required
          />

          <input
            className={styles.login__input}
            type="password"
            placeholder="Lösenord"
            required
          />

          <a className={styles.login__forgot}>Glömt lösenord?</a>

          <button className={styles.login__submit} type="submit">
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}
