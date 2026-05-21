"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./Logo.module.scss";

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.logoPlaceholder} />;
  }


  const logoSrc = resolvedTheme === "dark" ? "/logo2.png" : "/logo1.png";

  return (
    <img
      src={logoSrc}  
      alt="Kino logo"
      className={styles.logo}
    />
  );
}