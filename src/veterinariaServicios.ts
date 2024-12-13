import fs from "fs";
import path from "path";

import { generarIdUnico } from "./generarIdUnico";

export class VeterinariaServicios {
  basePath = path.join(__dirname, "data");

  private verificarCarpetaExistente = async () => {
    try {
      fs.mkdirSync(this.basePath, { recursive: true });
    } catch (error) {
      console.error("Error al crear la carpeta data: ", error);
    }
  };

  crearNuevaVeterinaria = async (
    rl: any,
    mostrarMenu: Function,
    manejarError: Function
  ) => {
    rl.question(
      "Ingresar el nombre de la veterinaria: ",
      async (nombre: string) => {
        try {
          await this.verificarCarpetaExistente();

          const fileName = `${nombre.replace(/\s+/g, "-").toLowerCase()}.json`;
          const filePath = path.join(this.basePath, fileName);

          const formatoJson = {
            id: generarIdUnico,
            nombre: nombre.toLowerCase(),
            clientes: [],
            pacientes: [],
            proveedores: [],
          };

          fs.writeFileSync(filePath, JSON.stringify(formatoJson, null, 2));
          console.log("Veterinaria creada correctamente: ", filePath);

          mostrarMenu();
        } catch (error) {
          console.error("Error al crear la veterinaria: ", error);
          manejarError();
          mostrarMenu();
        }
      }
    );
  };

  modificarVeterinaria = async (
    nombreOriginal: string,
    nuevosDatos: Partial<{ nombre: string }>
  ) => {
    try {
      const fileNameOriginal = `${nombreOriginal
        .replace(/\s+/g, "-")
        .toLowerCase()}.json`;
      const filePathOriginal = path.join(this.basePath, fileNameOriginal);

      if (!fs.existsSync(filePathOriginal)) {
        throw new Error("El archivo de la veterinaria no existe.");
      }

      const contenidoActual = JSON.parse(
        fs.readFileSync(filePathOriginal, "utf-8")
      );

      const contenidoActualizado = {
        ...contenidoActual,
        ...nuevosDatos,
      };

      let nuevoNombreArchivo = fileNameOriginal;
      if (nuevosDatos.nombre) {
        nuevoNombreArchivo = `${nuevosDatos.nombre
          .replace(/\s+/g, "-")
          .toLowerCase()}.json`;
      }

      const filePathNuevo = path.join(this.basePath, nuevoNombreArchivo);

      fs.writeFileSync(
        filePathNuevo,
        JSON.stringify(contenidoActualizado, null, 2)
      );
      console.log(
        "Archivo actualizado correctamente con nuevo nombre: ",
        filePathNuevo
      );

      if (filePathNuevo !== filePathOriginal) {
        fs.unlinkSync(filePathOriginal);
        console.log(
          "Archivo antiguo eliminado correctamente: ",
          filePathOriginal
        );
      }
    } catch (error) {
      console.error("Error al modificar la veterinaria: ", error);
      throw error;
    }
  };

  eliminarVeterinaria = async (nombre: string) => {
    try {
      const fileName = `${nombre.replace(/\s+/g, "-").toLowerCase()}.json`;
      const filePath = path.join(this.basePath, fileName);

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

  listarVeterinarias = () => {
    fs.readdir(this.basePath, (err, files) => {
      if (err) {
        console.log("Error al leer el directorio:", err);
        return;
      }

      if (files.length === 0) {
        console.log("No hay archivos en el directorio.");
      } else {
        console.log("Lista de veterinarias:");
        files.forEach((file, index) => {
          const filePath = path.join(this.basePath, file);

          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              console.log(`Error al leer el archivo ${file}:`, err);
              return;
            }

            try {
              const jsonContent = JSON.parse(data);

              console.log(
                `${index + 1}. ${jsonContent.nombre || "Nombre no disponible"}`
              );
            } catch (parseErr) {
              console.log(`Error al parsear el archivo ${file}:`, parseErr);
            }
          });
        });
      }
    });
  };
}
