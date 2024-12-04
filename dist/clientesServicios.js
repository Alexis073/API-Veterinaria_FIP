"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarClientes = exports.eliminarCliente = exports.modificarCliente = exports.crearCliente = void 0;
const path_1 = __importDefault(require("path"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const basePath = path_1.default.join(__dirname, "data");
const generarIdUnico_1 = require("./generarIdUnico");
const datosVeterinaria_1 = require("./datosVeterinaria");
const crearCliente = (veterinariaNombre, nombre, telefono) => {
    const datos = (0, datosVeterinaria_1.cargarDatosVeterinaria)(veterinariaNombre, basePath);
    const nuevoCliente = {
        id: (0, generarIdUnico_1.generarIdUnico)(datos.clientes),
        nombre,
        telefono,
        esVIP: false,
        visitas: 0,
    };
    if (nuevoCliente.visitas >= 5) {
        nuevoCliente.esVIP = true;
    }
    datos.clientes.push(nuevoCliente);
    (0, datosVeterinaria_1.guardarDatosVeterinaria)(veterinariaNombre, datos, basePath);
    console.log("Cliente creado correctamente:", nuevoCliente);
};
exports.crearCliente = crearCliente;
const modificarCliente = (veterinariaNombre, clienteId, nuevosDatos) => {
    const datos = (0, datosVeterinaria_1.cargarDatosVeterinaria)(veterinariaNombre, basePath);
    const cliente = datos.clientes.find((c) => c.id === clienteId);
    if (!cliente) {
        throw new Error("Cliente no encontrado.");
    }
    if (nuevosDatos.nombre)
        cliente.nombre = nuevosDatos.nombre;
    if (nuevosDatos.telefono)
        cliente.telefono = nuevosDatos.telefono;
    const nuevoNumeroVisitas = readline_sync_1.default.questionInt("Nuevo número de visitas (dejar vacío para no cambiar): ", {
        defaultInput: cliente.visitas.toString(),
    });
    cliente.visitas = nuevoNumeroVisitas;
    cliente.esVIP = cliente.visitas >= 5;
    (0, datosVeterinaria_1.guardarDatosVeterinaria)(veterinariaNombre, datos, basePath);
    console.log("Cliente modificado correctamente:", cliente);
};
exports.modificarCliente = modificarCliente;
const eliminarCliente = (veterinariaNombre, clienteId) => {
    const datos = (0, datosVeterinaria_1.cargarDatosVeterinaria)(veterinariaNombre, basePath);
    const indice = datos.clientes.findIndex((c) => c.id === clienteId);
    if (indice === -1) {
        throw new Error("Cliente no encontrado.");
    }
    datos.clientes.splice(indice, 1);
    (0, datosVeterinaria_1.guardarDatosVeterinaria)(veterinariaNombre, datos, basePath);
    console.log("Cliente eliminado correctamente.");
};
exports.eliminarCliente = eliminarCliente;
const listarClientes = (veterinariaNombre) => {
    const datos = (0, datosVeterinaria_1.cargarDatosVeterinaria)(veterinariaNombre, basePath);
    if (datos.clientes.length === 0) {
        console.log("No hay clientes registrados en esta veterinaria.");
    }
    else {
        console.log("Lista de clientes:");
        datos.clientes.forEach((cliente, index) => {
            console.log(`${index + 1}. ${cliente.nombre} - Teléfono: ${cliente.telefono} - VIP: ${cliente.esVIP}`);
        });
    }
};
exports.listarClientes = listarClientes;
