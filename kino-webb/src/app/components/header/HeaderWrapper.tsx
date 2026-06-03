"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./Header";
import LoginModal from "../login/LoginModal";
import RegisterModal from "../register/RegisterModal";
import DarkLightTheme from "../darkLightTheme/DarkLightTheme";

function HeaderWrapperContent() {
  const paramToOpen = useSearchParams();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    if (paramToOpen.get("openLogin") === "true") {
      const url = new URL(window.location.href);
      url.searchParams.delete("openLogin");
      window.history.replaceState({}, "", url);
      setIsLoginOpen(true);
    }
  }, [paramToOpen]);

  return (
    <>
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      >
        <DarkLightTheme />
      </Header>

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onOpenRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />
      )}

      {isRegisterOpen && (
        <RegisterModal
          onClose={() => setIsRegisterOpen(false)}
          onOpenLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </>
  );
}

export default function HeaderWrapper() {
  return (
    <Suspense fallback={null}>
      <HeaderWrapperContent />
    </Suspense>
  );
}
