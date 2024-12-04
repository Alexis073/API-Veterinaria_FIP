export const generarIdUnico = (lista: any[]) => {
  let nuevoId: string;
  do {
    nuevoId = Math.random().toString(36).substr(2, 9); // Generar ID único
  } while (lista.some((item) => item.id === nuevoId)); // Verifica sólo IDs de pacientes
  return nuevoId;
};
