"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const path_1 = __importDefault(require("path"));
const basePath = path_1.default.join(__dirname, "data");
const veterinariaServicios_1 = require("./veterinariaServicios");
const clientesServicios_1 = require("./clientesServicios");
const proveedoresServicios_ts_1 = require("./proveedoresServicios.ts");
const Pacientes_1 = require("./Pacientes");
const datosVeterinaria_1 = require("./datosVeterinaria");
const datosVeterinaria = new datosVeterinaria_1.DatosVeterinaria();
const vetServicios = new veterinariaServicios_1.VeterinariaServicios();
const clienteServicios = new clientesServicios_1.ClienteServicios(datosVeterinaria, basePath);
const proveedorServicios = new proveedoresServicios_ts_1.ProveedoresServicios(datosVeterinaria, basePath);
const pacienteServicios = new Pacientes_1.Paciente(datosVeterinaria, basePath);
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const mostrarMenu = () => {
    console.log("\n--- Menú Veterinaria ---");
    console.log("1. Crear nueva veterinaria");
    console.log("2. Modificar veterinaria");
    console.log("3. Eliminar veterinaria");
    console.log("4. Listar veterinarias");
    console.log("5. Administrar clientes");
    console.log("6. Administrar proveedores");
    console.log("7. Administrar pacientes");
    console.log("8. Salir");
    rl.question("Seleccione una opción: ", (op) => {
        switch (op) {
            case "1":
                vetServicios.crearNuevaVeterinaria(rl, mostrarMenu, manejarError);
                break;
            case "2":
                rl.question("Ingrese el nombre de la veterinaria a modificar: ", (nombre) => {
                    try {
                        rl.question("Nuevo nombre (dejar vacío para no cambiar): ", (nuevoNombre) => {
                            vetServicios.modificarVeterinaria(nombre, {
                                nombre: nuevoNombre || undefined,
                            });
                            console.log("Veterinaria modificada correctamente.");
                            mostrarMenu();
                        });
                    }
                    catch (err) {
                        manejarError(err);
                        mostrarMenu();
                    }
                });
                break;
            case "3":
                rl.question("Ingrese el nombre de la veterinaria a eliminar: ", (nombre) => {
                    try {
                        vetServicios.eliminarVeterinaria(nombre);
                        console.log("Veterinaria eliminada correctamente.");
                        mostrarMenu();
                    }
                    catch (err) {
                        manejarError(err);
                        mostrarMenu();
                    }
                });
                break;
            case "4":
                try {
                    vetServicios.listarVeterinarias();
                }
                catch (error) {
                    manejarError(error);
                }
                rl.question("\nPresione enter para regresar al menu\n", () => __awaiter(void 0, void 0, void 0, function* () {
                    mostrarMenu();
                }));
                break;
            case "5":
                rl.question("Ingrese el nombre de la veterinaria: ", (veterinariaNombre) => {
                    try {
                        mostrarMenuClientes(veterinariaNombre);
                    }
                    catch (err) {
                        manejarError(err);
                        mostrarMenu();
                    }
                });
                break;
            case "6":
                rl.question("Ingrese el nombre de la veterinaria: ", (veterinariaNombre) => {
                    try {
                        mostrarMenuProveedores(veterinariaNombre);
                    }
                    catch (err) {
                        manejarError(err);
                        mostrarMenu();
                    }
                });
                break;
            case "7":
                rl.question("Ingrese el nombre de la veterinaria: ", (veterinariaNombre) => {
                    try {
                        mostrarMenuPacientes(veterinariaNombre);
                    }
                    catch (err) {
                        manejarError(err);
                        mostrarMenu();
                    }
                });
                break;
            case "8":
                console.log("Programa cerrado.");
                rl.close();
                break;
            default:
                console.log("Opción no válida.");
                mostrarMenu();
        }
    });
};
const mostrarMenuClientes = (veterinariaNombre) => {
    console.log("\n--- Menú Clientes ---");
    console.log("1. Crear cliente");
    console.log("2. Modificar cliente");
    console.log("3. Eliminar cliente");
    console.log("4. Listar clientes");
    console.log("5. Volver al menú principal");
    rl.question("Seleccione una opción: ", (op) => {
        switch (op) {
            case "1":
                rl.question("Nombre del cliente: ", (nombre) => {
                    rl.question("Teléfono del cliente: ", (telefono) => {
                        try {
                            clienteServicios.crearCliente(veterinariaNombre, nombre, telefono);
                            console.log("Cliente creado correctamente.");
                        }
                        catch (error) {
                            manejarError(error);
                        }
                        mostrarMenuClientes(veterinariaNombre);
                    });
                });
                break;
            case "2":
                rl.question("ID del cliente: ", (id) => {
                    rl.question("Nuevo nombre (dejar vacío para no cambiar): ", (nombre) => {
                        rl.question("Nuevo teléfono (dejar vacío para no cambiar): ", (telefono) => {
                            try {
                                clienteServicios.modificarCliente(veterinariaNombre, id, {
                                    nombre: nombre || undefined,
                                    telefono: telefono || undefined,
                                });
                                console.log("Cliente modificado correctamente.");
                            }
                            catch (error) {
                                manejarError(error);
                            }
                            mostrarMenuClientes(veterinariaNombre);
                        });
                    });
                });
                break;
            case "3":
                rl.question("ID del cliente: ", (id) => {
                    try {
                        clienteServicios.eliminarCliente(veterinariaNombre, id);
                        console.log("Cliente eliminado correctamente.");
                    }
                    catch (error) {
                        manejarError(error);
                    }
                    mostrarMenuClientes(veterinariaNombre);
                });
                break;
            case "4":
                try {
                    clienteServicios.listarClientes(veterinariaNombre);
                }
                catch (error) {
                    manejarError(error);
                }
                mostrarMenuClientes(veterinariaNombre);
                break;
            case "5":
                mostrarMenu();
                break;
            default:
                console.log("Opción no valida.");
                mostrarMenuClientes(veterinariaNombre);
        }
    });
};
const manejarError = (error) => {
    if (error instanceof Error) {
        console.error("Error: ", error.message);
    }
    else {
        console.error("Error desconocido: ", error);
    }
};
const mostrarMenuProveedores = (veterinariaNombre) => {
    console.log("\n--- Menú Proveedores ---");
    console.log("1. Crear Proveedor");
    console.log("2. Modificar Proveedor");
    console.log("3. Eliminar Proveedor");
    console.log("4. Listar Proveedores");
    console.log("5. Volver al menú principal");
    rl.question("Seleccione una opción: ", (op) => {
        switch (op) {
            case "1":
                rl.question("Nombre del Proveedor: ", (nombre) => {
                    rl.question("Teléfono del Proveedor: ", (telefono) => {
                        try {
                            proveedorServicios.crearProveedor(veterinariaNombre, nombre, telefono);
                            console.log("Proveedor creado correctamente.");
                        }
                        catch (error) {
                            manejarError(error);
                        }
                        mostrarMenuProveedores(veterinariaNombre);
                    });
                });
                break;
            case "2":
                rl.question("ID del Proveedor: ", (id) => {
                    rl.question("Nuevo nombre (dejar vacío para no cambiar): ", (nombre) => {
                        rl.question("Nuevo teléfono (dejar vacío para no cambiar): ", (telefono) => {
                            try {
                                proveedorServicios.modificarProveedor(veterinariaNombre, id, {
                                    nombre: nombre || undefined,
                                    telefono: telefono || undefined,
                                });
                                console.log("Proveedor modificado correctamente.");
                            }
                            catch (error) {
                                manejarError(error);
                            }
                            mostrarMenuProveedores(veterinariaNombre);
                        });
                    });
                });
                break;
            case "3":
                rl.question("ID del Proveedor: ", (id) => {
                    try {
                        proveedorServicios.eliminarProveedor(veterinariaNombre, id);
                        console.log("Proveedor eliminado correctamente.");
                    }
                    catch (error) {
                        manejarError(error);
                    }
                    mostrarMenuProveedores(veterinariaNombre);
                });
                break;
            case "4":
                try {
                    proveedorServicios.listarProveedores(veterinariaNombre);
                }
                catch (error) {
                    manejarError(error);
                }
                mostrarMenuProveedores(veterinariaNombre);
                break;
            case "5":
                mostrarMenu();
                break;
            default:
                console.log("Opción no valida.");
                mostrarMenuProveedores(veterinariaNombre);
        }
    });
};
const mostrarMenuPacientes = (veterinariaNombre) => {
    console.log("\n--- Menú Pacientes ---");
    console.log("1. Crear paciente");
    console.log("2. Modificar paciente");
    console.log("3. Eliminar paciente");
    console.log("4. Listar pacientes");
    console.log("5. Volver al menú principal");
    rl.question("Seleccione una opción: ", (op) => {
        switch (op) {
            case "1":
                rl.question("Nombre del paciente: ", (nombre) => {
                    rl.question("Especie del paciente: ", (especie) => {
                        rl.question("ID del dueño: ", (idDueño) => {
                            try {
                                pacienteServicios.crearPaciente(veterinariaNombre, nombre, especie, idDueño);
                                console.log("Paciente creado correctamente.");
                            }
                            catch (error) {
                                manejarError(error);
                            }
                            mostrarMenuPacientes(veterinariaNombre);
                        });
                    });
                });
                break;
            case "2":
                rl.question("ID del paciente: ", (idPaciente) => {
                    rl.question("Nuevo nombre (dejar vacío para no cambiar): ", (nombre) => {
                        rl.question("Nueva especie (dejar vacío para no cambiar): ", (especie) => {
                            rl.question("Nuevo ID del dueño (dejar vacío para no cambiar): ", (IdDuenio) => {
                                try {
                                    pacienteServicios.modificarPaciente(veterinariaNombre, idPaciente, {
                                        nombre: nombre || undefined,
                                        especie: especie || undefined,
                                        IdDuenio: IdDuenio || undefined,
                                    });
                                    console.log("Paciente modificado correctamente.");
                                }
                                catch (error) {
                                    manejarError(error);
                                }
                                mostrarMenuPacientes(veterinariaNombre);
                            });
                        });
                    });
                });
                break;
            case "3":
                rl.question("ID del paciente: ", (idPaciente) => {
                    try {
                        pacienteServicios.bajaPaciente(veterinariaNombre, idPaciente);
                        console.log("Paciente eliminado correctamente.");
                    }
                    catch (error) {
                        manejarError(error);
                    }
                    mostrarMenuPacientes(veterinariaNombre);
                });
                break;
            case "4":
                try {
                    pacienteServicios.listarPacientes(veterinariaNombre);
                }
                catch (error) {
                    manejarError(error);
                }
                mostrarMenuPacientes(veterinariaNombre);
                break;
            case "5":
                mostrarMenu();
                break;
            default:
                console.log("Opción no válida.");
                mostrarMenuPacientes(veterinariaNombre);
        }
    });
};
mostrarMenu();
