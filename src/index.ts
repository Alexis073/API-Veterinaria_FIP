import readline from "readline";
import { crearVeterinaria } from "./veterinariaServicios";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const mostrarMenu = () => {
  console.log("\n--- Menú Veterinaria ---");
  console.log("1. Crear nueva veterinaria");
  console.log("2. Salir");
  rl.question("Seleccione una opcion: ", (op) => {
    switch (op) {
      case "1":
        crearNuevaVeterinaria();
        break;
      case "2":
        console.log("Programa cerrado.");
        rl.close();
        break;
      default:
        console.log("Opción no valida.");
        mostrarMenu();
    }
  });
};

const crearNuevaVeterinaria = () => {
  rl.question("Ingresar el nombre de la veterinaria: ", (nombre) => {
    crearVeterinaria(nombre)
      .then(() => {
        console.log("Veteriniaria creada correctamente.");
        mostrarMenu();
      })
      .catch((err) => {
        console.error("Error al crear la veterinaria: ", err);
        mostrarMenu();
      });
  });
};

mostrarMenu();
