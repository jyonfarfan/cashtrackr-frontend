//YON FORMATEA CANTIDADES EN PESOS CHILENOS
export function formatCurrency(quantity: number) {
  return new Intl.NumberFormat("es-cl", {
    style: "currency",
    currency: "CLP",
  }).format(quantity);
}

//YON FORMATEA LA FECHA PARA MOSTRARLA EN EL FORMATO DD/MM/AAAA
export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatter.format(date);
}
