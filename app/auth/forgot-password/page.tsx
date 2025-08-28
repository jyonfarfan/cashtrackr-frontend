import ForgotPasswordForm from "@/components/auth/Forgot-PasswordForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - olvidé mi password  ",
  description: "CashTrackr - olvidé mi password",
};
export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        ¿Olvidaste tu Contraseña?
      </h1>
      <p className="text-3xl font-bold">
        aqui puedes{" "}
        <span className="text-amber-500">Reestablecer tu contraseña</span>
      </p>
      <ForgotPasswordForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href="/auth/login"
          className="text-gray-500 underline text-center"
        >
          ¿Ya tienes una cuenta?, Inicia sesión
        </Link>
        <Link
          href="/auth/register"
          className="text-gray-500 underline text-center"
        >
          ¿No tienes una cuenta?, Crea Una
        </Link>
      </nav>
    </>
  );
}
