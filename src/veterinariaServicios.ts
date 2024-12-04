import fs from "fs";
import path from "path";

import { generarIdUnico } from "./generarIdUnico";

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
      id: generarIdUnico,
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

export const modificarVeterinaria = async (
  nombre: string,
  nuevosDatos: Partial<{
    nombre: string;
    clientes: any[];
    pacientes: any[];
    proveedores: any[];
  }>
) => {
  try {
    const fileName = `${nombre.replace(/\s+/g, "-").toLowerCase()}.json`;
    const filePath = path.join(basePath, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error("El archivo de la veterinaria no existe.");
    }

    const contenidoActual = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const contenidoActualizado = {
      ...contenidoActual,
      ...nuevosDatos,
    };

    fs.writeFileSync(filePath, JSON.stringify(contenidoActualizado, null, 2));
    console.log("Archivo actualizado correctamente: ", filePath);
  } catch (error) {
    console.error("Error al modificar la veterinaria: ", error);
    throw error;
  }
};

export const eliminarVeterinaria = async (nombre: string) => {
  try {
    const fileName = `${nombre.replace(/\s+/g, "-").toLowerCase()}.json`;
    const filePath = path.join(basePath, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error("El archivo de la veterinaria no existe.");
    }

    fs.unlinkSync(filePath);
    console.log("Archivo eliminado correctamente: ", filePath);
  } catch (error) {
    console.error("Error al eliminar la veterinaria: ", error);
    throw error;
  }
};
