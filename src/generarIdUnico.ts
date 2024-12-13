export const generarIdUnico = (lista: any[]) => {
  let nuevoId: string;
  do {
    nuevoId = Math.random().toString(36).substr(2, 9);
  } while (lista.some((item) => item.id === nuevoId));
  return nuevoId;
};
