"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./Header";
import LoginModal from "../login/LoginModal";
import RegisterModal from "../register/RegisterModal";

export default function HeaderWrapper() {
  const paramToOpen = useSearchParams();
  const openLogin = (): void => {setIsLoginOpen(true)};

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    if (paramToOpen.get('openLogin') === 'true') {
      console.log('Jag borde öppna loginmodalen...');
      const url = new URL(window.location.href);
      url.searchParams.delete('openLogin');
      window.history.replaceState({}, '', url);
      openLogin();
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
      />

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
