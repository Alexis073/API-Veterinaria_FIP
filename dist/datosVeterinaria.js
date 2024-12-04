"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardarDatosVeterinaria = exports.cargarDatosVeterinaria = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cargarDatosVeterinaria = (veterinariaNombre, basePath) => {
    const filePath = path_1.default.join(basePath, `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`);
    if (!fs_1.default.existsSync(filePath)) {
        throw new Error(`La veterinaria "${veterinariaNombre}" no existe.`);
    }
    const data = fs_1.default.readFileSync(filePath, "utf-8");
    try {
        const parsedData = JSON.parse(data);
        return parsedData;
    }
    catch (error) {
        console.error("Error al analizar JSON:", error);
        throw error;
    }
};
exports.cargarDatosVeterinaria = cargarDatosVeterinaria;
const guardarDatosVeterinaria = (veterinariaNombre, datos, basePath) => {
    const filePath = path_1.default.join(basePath, `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`);
    fs_1.default.writeFileSync(filePath, JSON.stringify(datos, null, 2), "utf8");
};
exports.guardarDatosVeterinaria = guardarDatosVeterinaria;
