export const generarIdUnico = (lista: any[]) => {
  let nuevoId: string;
  do {
    nuevoId = `c_${Math.floor(Math.random() * 10000)}`;
  } while (lista.some((item) => item.id === nuevoId));
  return nuevoId;
};
