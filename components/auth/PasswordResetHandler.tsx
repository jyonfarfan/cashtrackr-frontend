"use client";
import { useState } from "react";
import ValidateTokenForm from "./ValidateTokenForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function PasswordResetHandler() {
  const [isValidToken, setIsValidToken] = useState(false); //SI ESTE PASA A TRUE SE PASA A ResetPasswordForm
  const [token, setToken] = useState("");

  return (
    <>
      {!isValidToken ? (
        <ValidateTokenForm
          setIsValidToken={setIsValidToken}
          token={token}
          setToken={setToken}
        />
      ) : (
        <ResetPasswordForm token={token} />
      )}
    </>
  );
}
