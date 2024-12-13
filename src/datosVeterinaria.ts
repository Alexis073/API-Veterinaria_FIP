import fs from "fs";
import path from "path";

export class DatosVeterinaria {
  cargarDatosVeterinaria = (veterinariaNombre: string, basePath: string) => {
    const filePath = path.join(
      basePath,
      `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`
    );
    if (!fs.existsSync(filePath)) {
      throw new Error(`La veterinaria "${veterinariaNombre}" no existe.`);
    }
    const data = fs.readFileSync(filePath, "utf-8");

    try {
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.error("Error al analizar JSON:", error);
      throw error;
    }
  };

  guardarDatosVeterinaria = (
    veterinariaNombre: string,
    datos: any,
    basePath: string
  ) => {
    const filePath = path.join(
      basePath,
      `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`
    );
    fs.writeFileSync(filePath, JSON.stringify(datos, null, 2), "utf8");
  };
}
