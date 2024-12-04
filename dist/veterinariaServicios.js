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
exports.listarVeterinarias = exports.eliminarVeterinaria = exports.modificarVeterinaria = exports.crearVeterinaria = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generarIdUnico_1 = require("./generarIdUnico");
const basePath = path_1.default.join(__dirname, "data");
const verificarCarpetaExistente = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        fs_1.default.mkdirSync(basePath, { recursive: true });
    }
    catch (error) {
        console.error("Error al crear la carpeta data: ", error);
    }
});
const crearVeterinaria = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield verificarCarpetaExistente();
        const fileName = `${nombre.replace(/\s+/g, "-").toLowerCase()}.json`;
        const filePath = path_1.default.join(basePath, fileName);
        const formatoJson = {
            id: generarIdUnico_1.generarIdUnico,
            nombre,
            clientes: [],
            pacientes: [],
            proveedores: [],
        };
        fs_1.default.writeFileSync(filePath, JSON.stringify(formatoJson, null, 2));
        console.log("Archivo creado correctamente: ", filePath);
    }
    catch (error) {
        console.error("Error al crear la veterinaria: ", error);
        throw error;
    }
});
exports.crearVeterinaria = crearVeterinaria;
const modificarVeterinaria = (nombre, nuevosDatos) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileName = `${nombre.replace(/\s+/g, "-").toLowerCase()}.json`;
        const filePath = path_1.default.join(basePath, fileName);
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("El archivo de la veterinaria no existe.");
        }
        const contenidoActual = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        const contenidoActualizado = Object.assign(Object.assign({}, contenidoActual), nuevosDatos);
        fs_1.default.writeFileSync(filePath, JSON.stringify(contenidoActualizado, null, 2));
        console.log("Archivo actualizado correctamente: ", filePath);
    }
    catch (error) {
        console.error("Error al modificar la veterinaria: ", error);
        throw error;
    }
});
exports.modificarVeterinaria = modificarVeterinaria;
const eliminarVeterinaria = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileName = `${nombre.replace(/\s+/g, "-").toLowerCase()}.json`;
        const filePath = path_1.default.join(basePath, fileName);
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("El archivo de la veterinaria no existe.");
        }
        fs_1.default.unlinkSync(filePath);
        console.log("Archivo eliminado correctamente: ", filePath);
    }
    catch (error) {
        console.error("Error al eliminar la veterinaria: ", error);
        throw error;
    }
});
exports.eliminarVeterinaria = eliminarVeterinaria;
const listarVeterinarias = () => {
    fs_1.default.readdir(basePath, (err, files) => {
        if (err) {
            console.log("Error al leer el directorio:", err);
            return;
        }
        if (files.length === 0) {
            console.log("No hay archivos en el directorio.");
        }
        else {
            console.log("Lista de veterinarias:");
            files.forEach((file, index) => {
                const filePath = path_1.default.join(basePath, file);
                fs_1.default.readFile(filePath, "utf8", (err, data) => {
                    if (err) {
                        console.log(`Error al leer el archivo ${file}:`, err);
                        return;
                    }
                    try {
                        const jsonContent = JSON.parse(data);
                        console.log(`${index + 1}. ${jsonContent.nombre || "Nombre no disponible"}`);
                    }
                    catch (parseErr) {
                        console.log(`Error al parsear el archivo ${file}:`, parseErr);
                    }
                });
            });
        }
    });
};
exports.listarVeterinarias = listarVeterinarias;
