export function formatFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, "0"); // Día en formato 2 dígitos
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes en formato 2 dígitos
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}
