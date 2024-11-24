function obtenerFechaActualISO() {
  return new Date().toISOString();
}

export const fechaActual = obtenerFechaActualISO();
