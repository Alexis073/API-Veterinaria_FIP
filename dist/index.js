"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const veterinariaServicios_1 = require("./veterinariaServicios");
const rl = readline_1.default.createInterface({
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
        (0, veterinariaServicios_1.crearVeterinaria)(nombre)
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
