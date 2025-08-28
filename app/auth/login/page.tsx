import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "CashTrackr - Iniciar Sesion",
  description: "Inicia sesion para Comenzar a controlar tus finanzas",
};
export default function LoginPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Iniciar Sesion</h1>
      <p className="text-3xl font-bold">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>
      <LoginForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href="/auth/register"
          className="text-gray-500 underline text-center"
        >
          ¿No tienes una cuenta?, Crea Una
        </Link>
        <Link
          href="/auth/forgot-password"
          className="text-gray-500 underline text-center"
        >
          Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
