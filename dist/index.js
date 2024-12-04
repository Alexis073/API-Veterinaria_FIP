"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const veterinariaServicios_1 = require("./veterinariaServicios");
const clientesServicios_1 = require("./clientesServicios");
const proveedoresServicios_ts_1 = require("./proveedoresServicios.ts");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const mostrarMenu = () => {
    console.log("\n--- Menú Veterinaria ---");
    console.log("1. Crear nueva veterinaria");
    console.log("2. Modificar veterinaria");
    console.log("3. Eliminar veterinaria");
    console.log("4. Administrar clientes");
    console.log("5. Administrar proverdores");
    console.log("5. Salir");
    rl.question("Seleccione una opción: ", (op) => {
        switch (op) {
            case "1":
                crearNuevaVeterinaria();
                break;
            case "2":
                rl.question("Ingrese el nombre de la veterinaria a modificar: ", (nombre) => {
                    rl.question("Nuevo nombre (dejar vacío para no cambiar): ", (nuevoNombre) => {
                        (0, veterinariaServicios_1.modificarVeterinaria)(nombre, {
                            nombre: nuevoNombre || undefined,
                        })
                            .then(() => console.log("Veterinaria modificada correctamente."))
                            .catch((err) => manejarError(err))
                            .finally(() => mostrarMenu());
                    });
                });
                break;
            case "3":
                rl.question("Ingrese el nombre de la veterinaria a eliminar: ", (nombre) => {
                    (0, veterinariaServicios_1.eliminarVeterinaria)(nombre)
                        .then(() => console.log("Veterinaria eliminada correctamente."))
                        .catch((err) => manejarError(err))
                        .finally(() => mostrarMenu());
                });
                break;
            case "4":
                rl.question("Ingrese el nombre de la veterinaria: ", (veterinariaNombre) => {
                    mostrarMenuClientes(veterinariaNombre);
                });
                break;
            case "5":
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
                            (0, clientesServicios_1.crearCliente)(veterinariaNombre, nombre, telefono);
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
                                (0, clientesServicios_1.modificarCliente)(veterinariaNombre, id, {
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
                        (0, clientesServicios_1.eliminarCliente)(veterinariaNombre, id);
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
                    (0, clientesServicios_1.listarClientes)(veterinariaNombre);
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
const crearNuevaVeterinaria = () => {
    rl.question("Ingresar el nombre de la veterinaria: ", (nombre) => {
        (0, veterinariaServicios_1.crearVeterinaria)(nombre)
            .then(() => {
            console.log("Veterinaria creada correctamente.");
            mostrarMenu();
        })
            .catch((err) => {
            manejarError(err);
            mostrarMenu();
        });
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
mostrarMenu();
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
                            (0, proveedoresServicios_ts_1.crearProveedor)(veterinariaNombre, nombre, telefono);
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
                                (0, proveedoresServicios_ts_1.modificarProveedor)(veterinariaNombre, id, {
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
                        (0, proveedoresServicios_ts_1.eliminarProveedor)(veterinariaNombre, id);
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
                    (0, proveedoresServicios_ts_1.listarProveedores)(veterinariaNombre);
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
