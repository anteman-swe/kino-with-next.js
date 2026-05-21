"use client";

import { useState } from "react";
import Header from "./Header";
import LoginModal from "../login/LoginModal";
import RegisterModal from "../register/RegisterModal";
import DarkLightTheme from "../darkLightTheme/DarkLightTheme"; 

export default function HeaderWrapper() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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