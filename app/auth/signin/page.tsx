"use client";

import AccountDetected from "@/components/auth/AccountDetected";
import SignInForm from "@/components/auth/SignInForm";
import { useState } from "react";

const SignIn = () => {
  const [showAccountDetected, setShowAccountDetected] =
    useState<boolean>(false);
  return (
    <>
      {showAccountDetected ? (
        <AccountDetected />
      ) : (
        <SignInForm setShowAccountDetected={setShowAccountDetected} />
      )}
    </>
  );
};

export default SignIn;
