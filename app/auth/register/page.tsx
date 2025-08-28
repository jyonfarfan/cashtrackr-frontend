import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Crear Cuenta",
  description: "Crea una cuenta para Comenzar a controlar tus finanzas",
};
export default function RegisterPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Crea una Cuenta</h1>
      <p className="text-3xl font-bold">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>
      <RegisterForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href="/auth/login"
          className="text-gray-500 underline text-center"
        >
          ¿Ya tienes una cuenta?, Inicia sesión
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
