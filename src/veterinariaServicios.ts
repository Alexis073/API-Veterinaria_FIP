import fs from "fs";
import path from "path";

const basePath = path.join(__dirname, "data");

const verificarCarpetaExistente = async () => {
  try {
    fs.mkdirSync(basePath, { recursive: true });
  } catch (error) {
    console.error("Error al crear la carpeta data: ", error);
  }
};

export const crearVeterinaria = async (nombre: string) => {
  try {
    await verificarCarpetaExistente();

    const fileName = `${nombre.replace(/\s+/g, "-").toLowerCase()}.json`;
    const filePath = path.join(basePath, fileName);

    const formatoJson = {
      id: `v_${Math.floor(Math.random() * 1000)}`,
      nombre,
      clientes: [],
      pacientes: [],
      proveedores: [],
    };

    fs.writeFileSync(filePath, JSON.stringify(formatoJson, null, 2));
    console.log("Archivo creado correctamente: ", filePath);
  } catch (error) {
    console.error("Error al crear la veterinaria: ", error);
    throw error;
  }
};
