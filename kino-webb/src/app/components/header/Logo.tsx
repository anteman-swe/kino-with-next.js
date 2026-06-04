"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./Logo.module.scss";
import Image from "next/image";
import Link from "next/link";

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
    <>
      <Link href={"/"} className={styles.logoLink}>
        <Image
          src={logoSrc}
          alt="Kino logo"
          className={styles.logo}
          width={809}
          height={168}
          priority
        />
      </Link>
    </>
  );
}