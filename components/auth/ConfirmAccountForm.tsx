"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { confirmAccount } from "@/actions/confirm-account-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";

export default function ConfirmAccountForm() {
  const router = useRouter(); // hay que utilizar el de next/navigation
  const [isComplete, setIsComplete] = useState(false); //STATE QUE VA A ESPERAR QUE SE COMPLETE EL PIN
  const [token, setToken] = useState("");
  const confirmAccountWithToken = confirmAccount.bind(null, token);
  const [state, dispatch] = useFormState(confirmAccountWithToken, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (isComplete) {
      dispatch(); //DISPATCH PARA LLAMAR A LA ACCION CONFIRM ACCOUNT
    }
  }, [isComplete]);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    // PARA LLEVAR AL USUARIO DE FORMA PROGRAMADA CUANDO SEA SUCCESS LA CONFIRMACION DEL TOKEN HAREMOS.
    // next.js lo hace a traves de un hook. lo utilizaremos mas arriba despues de la ConfirmAccountForm,
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/auth/login"); // Redirigir al usuario a la página de inicio de sesión
        },
      });
    }
  }, [state]);

  const handleChange = (token: string) => {
    setIsComplete(false);
    setToken(token);
  };
  const handleComplete = () => {
    setIsComplete(true); //CAMBIA EL ESTADO A TRUE PARA QUE SE DISPATCH LA ACCION
  };
  // CUANDO SE COMPLETE EL PIN, 1 SETEA EL TOKEN, 2 CAMBIA EL ESTADO A TRUE, 3 DISPATCH LA ACCION
  return (
    <>
      {/* COMO HACER PARA ESPERAR SI UN STATE TIENE ALGO, LO HACEMOS A TRAVES DE UN USEEFFECT */}
      {/* DECLARAMOS EN EL USEEFFECT DE TOAST ARRIBA */}

      <div className="flex justify-center gap-5 my-10">
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField className="chakra-pin-input h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white css-0 focus:border-blue-500 focus:outline-none transition-colors" />
          <PinInputField className="chakra-pin-input h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white css-0 focus:border-blue-500 focus:outline-none transition-colors" />
          <PinInputField className="chakra-pin-input h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white css-0 focus:border-blue-500 focus:outline-none transition-colors" />
          <PinInputField className="chakra-pin-input h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white css-0 focus:border-blue-500 focus:outline-none transition-colors" />
          <PinInputField className="chakra-pin-input h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white css-0 focus:border-blue-500 focus:outline-none transition-colors" />
          <PinInputField className="chakra-pin-input h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white css-0 focus:border-blue-500 focus:outline-none transition-colors" />
        </PinInput>
      </div>
    </>
  );
}
