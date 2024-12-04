"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProveedor = exports.modificarProveedor = exports.listarProveedores = exports.crearProveedor = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const basePath = path_1.default.join(__dirname, "data");
const cargarDatosVeterinaria = (veterinariaNombre) => {
    const filePath = path_1.default.join(basePath, `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`);
    if (!fs_1.default.existsSync(filePath)) {
        throw new Error(`La veterinaria "${veterinariaNombre}" no existe.`);
    }
    return JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
};
const guardarDatosVeterinaria = (veterinariaNombre, datos) => {
    const filePath = path_1.default.join(basePath, `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`);
    fs_1.default.writeFileSync(filePath, JSON.stringify(datos, null, 2), "utf-8");
};
const generarIdUnico = (lista) => {
    let nuevoId;
    do {
        nuevoId = `prov_${Math.floor(Math.random() * 10000)}`;
    } while (lista.some((item) => item.id === nuevoId));
    return nuevoId;
};
const crearProveedor = (veterinariaNombre, nombre, telefono) => {
    const datos = cargarDatosVeterinaria(veterinariaNombre);
    const nuevoProveedor = { id: generarIdUnico(datos.proveedores), nombre, telefono };
    datos.proveedores.push(nuevoProveedor);
    guardarDatosVeterinaria(veterinariaNombre, datos);
    console.log("Proveedor creado:", nuevoProveedor);
};
exports.crearProveedor = crearProveedor;
const listarProveedores = (veterinariaNombre) => {
    const datos = cargarDatosVeterinaria(veterinariaNombre);
    if (datos.proveedores.length === 0) {
        console.log("No hay proveedores registrados.");
    }
    else {
        console.log("Lista de proveedores:");
        datos.proveedores.forEach((prov) => console.log(`ID: ${prov.id} - Nombre: ${prov.nombre} - Teléfono: ${prov.telefono}`));
    }
};
exports.listarProveedores = listarProveedores;
const modificarProveedor = (veterinariaNombre, proveedorId, nuevosDatos) => {
    const datos = cargarDatosVeterinaria(veterinariaNombre);
    const proveedor = datos.proveedores.find((prov) => prov.id === proveedorId);
    if (!proveedor)
        throw new Error("Proveedor no encontrado.");
    if (nuevosDatos.nombre)
        proveedor.nombre = nuevosDatos.nombre;
    if (nuevosDatos.telefono)
        proveedor.telefono = nuevosDatos.telefono;
    guardarDatosVeterinaria(veterinariaNombre, datos);
    console.log("Proveedor modificado:", proveedor);
};
exports.modificarProveedor = modificarProveedor;
const eliminarProveedor = (veterinariaNombre, proveedorId) => {
    const datos = cargarDatosVeterinaria(veterinariaNombre);
    const indice = datos.proveedores.findIndex((prov) => prov.id === proveedorId);
    if (indice === -1)
        throw new Error("Proveedor no encontrado.");
    datos.proveedores.splice(indice, 1);
    guardarDatosVeterinaria(veterinariaNombre, datos);
    console.log("Proveedor eliminado.");
};
exports.eliminarProveedor = eliminarProveedor;
