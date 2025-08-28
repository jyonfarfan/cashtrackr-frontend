"use server";

import {
  ErrorResponseSchema,
  registerSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionState = {
  errors: string[];
  success: string;
};

export async function register(prevState: ActionState, formData: FormData) {
  const registerData = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  //VALIDAR
  const register = registerSchema.safeParse(registerData);

  if (!register.success) {
    const errors = register.error.issues.map((error) => error.message);
    return {
      errors,
      success: prevState.success,
    };
  }

  //REGISTRAR EL USUARIO EN NEXT.JS

  const url = `${process.env.API_URL}/auth/create-account`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    }),
  });

  const json = await req.json();

  if (req.status === 409) {
    const { error } = ErrorResponseSchema.parse(json);

    return {
      errors: [error],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json);

  return {
    errors: [],
    success: success,
  };
}
