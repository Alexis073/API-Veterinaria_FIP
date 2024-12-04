"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarClientes = exports.eliminarCliente = exports.modificarCliente = exports.crearCliente = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const basePath = path_1.default.join(__dirname, "data");
const cargarDatosVeterinaria = (veterinariaNombre) => {
    const filePath = path_1.default.join(basePath, `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`);
    if (!fs_1.default.existsSync(filePath)) {
        throw new Error(`La veterinaria "${veterinariaNombre}" no existe.`);
    }
    const data = fs_1.default.readFileSync(filePath, "utf-8");
    try {
        const parsedData = JSON.parse(data); // Intentar parsear el JSON
        return parsedData;
    }
    catch (error) {
        console.error("Error al analizar JSON:", error);
        throw error;
    }
};
const guardarDatosVeterinaria = (veterinariaNombre, datos) => {
    const filePath = path_1.default.join(basePath, `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`);
    fs_1.default.writeFileSync(filePath, JSON.stringify(datos, null, 2), "utf8");
};
const generarIdUnico = (lista) => {
    let nuevoId;
    do {
        nuevoId = `c_${Math.floor(Math.random() * 10000)}`;
    } while (lista.some((item) => item.id === nuevoId));
    return nuevoId;
};
const crearCliente = (veterinariaNombre, nombre, telefono) => {
    const datos = cargarDatosVeterinaria(veterinariaNombre);
    const nuevoCliente = {
        id: generarIdUnico(datos.clientes),
        nombre,
        telefono,
        esVIP: false,
        visitas: 0,
    };
    if (nuevoCliente.visitas >= 5) {
        nuevoCliente.esVIP = true;
    }
    datos.clientes.push(nuevoCliente);
    guardarDatosVeterinaria(veterinariaNombre, datos);
    console.log("Cliente creado correctamente:", nuevoCliente);
};
exports.crearCliente = crearCliente;
const modificarCliente = (veterinariaNombre, clienteId, nuevosDatos) => {
    const datos = cargarDatosVeterinaria(veterinariaNombre);
    const cliente = datos.clientes.find((c) => c.id === clienteId);
    if (!cliente) {
        throw new Error("Cliente no encontrado.");
    }
    // Modificar nombre y teléfono si se pasan nuevos datos
    if (nuevosDatos.nombre)
        cliente.nombre = nuevosDatos.nombre;
    if (nuevosDatos.telefono)
        cliente.telefono = nuevosDatos.telefono;
    // Solicitar el nuevo número de visitas
    const nuevoNumeroVisitas = readline_sync_1.default.questionInt('Nuevo número de visitas (dejar vacío para no cambiar): ', {
        defaultInput: cliente.visitas.toString(), // Si no se ingresa, se mantiene el valor actual
    });
    // Actualizar visitas
    cliente.visitas = nuevoNumeroVisitas;
    // Revisar si el cliente se vuelve VIP (más de 5 visitas)
    cliente.esVIP = cliente.visitas >= 5;
    guardarDatosVeterinaria(veterinariaNombre, datos);
    console.log("Cliente modificado correctamente:", cliente);
};
exports.modificarCliente = modificarCliente;
const eliminarCliente = (veterinariaNombre, clienteId) => {
    const datos = cargarDatosVeterinaria(veterinariaNombre);
    const indice = datos.clientes.findIndex((c) => c.id === clienteId);
    if (indice === -1) {
        throw new Error("Cliente no encontrado.");
    }
    datos.clientes.splice(indice, 1);
    guardarDatosVeterinaria(veterinariaNombre, datos);
    console.log("Cliente eliminado correctamente.");
};
exports.eliminarCliente = eliminarCliente;
const listarClientes = (veterinariaNombre) => {
    const datos = cargarDatosVeterinaria(veterinariaNombre);
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
