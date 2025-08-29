"use server";

import getToken from "@/src/auth/token";
import {
  Budget,
  DraftBudgetSchema,
  ErrorResponseSchema,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath, revalidateTag } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function editBudget(
  budgetId: Budget["id"],
  prevState: ActionStateType,
  formData: FormData
) {
  const budgetData = {
    name: formData.get("name"),
    amount: formData.get("amount"),
  };
  const budget = DraftBudgetSchema.safeParse(budgetData);
  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount,
    }),
  });
  const json = await req.json();
  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }
  const success = SuccessSchema.parse(json);

  revalidateTag("/all-budgets"); // Revalida el fetch que se hizo, donde se alojo la peticion. (page.tsx de /adminpage)
  //   revalidatePath("/admin"); // Revalida la URL con todas las peticiones que esta tiene.
  return {
    errors: [],
    success,
  };
}
