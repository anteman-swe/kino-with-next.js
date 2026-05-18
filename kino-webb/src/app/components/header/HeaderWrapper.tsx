"use client";

import { useState } from "react";
import Header from "./Header";
import LoginModal from "../login/LoginModal";

export default function HeaderWrapper() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <Header onOpenLogin={() => setIsLoginOpen(true)} />

      {isLoginOpen && (
        <LoginModal onClose={() => setIsLoginOpen(false)} />
      )}
    </>
  );
}
