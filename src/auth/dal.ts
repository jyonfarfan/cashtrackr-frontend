//DATA ACCESS LAYER
import "server-only";
import { cache } from "react"; //Esto me va a hacer que no se haga la consulta a cada rato y guarde.
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserSchema } from "../schemas";
import getToken from "./token";

export const verifySession = cache(async () => {
  // Logic to verify user session
  const token = getToken();
  if (!token) {
    redirect("/auth/login");
  }

  const url = `${process.env.API_URL}/auth/user`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const session = await req.json();
  const result = UserSchema.safeParse(session);

  if (!result.success) {
    redirect("/auth/login");
  }

  return {
    user: result.data,
    isAuth: true,
  };
});
