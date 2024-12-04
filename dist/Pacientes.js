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
exports.modificarPaciente = exports.bajaPaciente = exports.altaPaciente = void 0;
const path_1 = __importDefault(require("path"));
const datosVeterinaria_1 = require("./datosVeterinaria");
const generarIdUnico_1 = require("./generarIdUnico");
const basePath = path_1.default.join(__dirname, "data");
const pacientes = {};
const altaPaciente = (veterinariaNombre, nombre, especie, idDueño) => __awaiter(void 0, void 0, void 0, function* () {
    const datos = yield (0, datosVeterinaria_1.cargarDatosVeterinaria)(veterinariaNombre, basePath);
    if (!datos) {
        console.error("Veterinaria no encontrada.");
        return;
    }
    const idPaciente = (0, generarIdUnico_1.generarIdUnico)(datos.pacientes);
    const paciente = {
        idPaciente,
        nombre,
        especie: ["perro", "gato"].includes(especie) ? especie : "exótica",
        idDueño,
    };
    datos.pacientes.push(paciente);
    (0, datosVeterinaria_1.guardarDatosVeterinaria)(veterinariaNombre, datos, basePath);
});
exports.altaPaciente = altaPaciente;
const bajaPaciente = (veterinariaNombre, idPaciente) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const veterinaria = yield (0, datosVeterinaria_1.cargarDatosVeterinaria)(veterinariaNombre, basePath);
    if (!veterinaria) {
        console.error("Veterinaria no encontrada.");
        return;
    }
    const index = (_a = pacientes[veterinariaNombre]) === null || _a === void 0 ? void 0 : _a.findIndex((paciente) => paciente.idPaciente === idPaciente);
    if (index !== undefined && index !== -1) {
        pacientes[veterinariaNombre].splice(index, 1);
        console.log(`Paciente con ID ${idPaciente} dado de baja.`);
    }
    else {
        console.error("Paciente no encontrado.");
    }
});
exports.bajaPaciente = bajaPaciente;
const modificarPaciente = (veterinariaNombre, idPaciente, nuevoNombre, nuevaEspecie, nuevoIdDueño) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const veterinaria = yield (0, datosVeterinaria_1.cargarDatosVeterinaria)(veterinariaNombre, basePath);
    if (!veterinaria) {
        console.error("Veterinaria no encontrada.");
        return;
    }
    const paciente = (_a = pacientes[veterinariaNombre]) === null || _a === void 0 ? void 0 : _a.find((paciente) => paciente.idPaciente === idPaciente);
    if (paciente) {
        paciente.nombre = nuevoNombre || paciente.nombre;
        paciente.especie =
            nuevaEspecie && ["perro", "gato"].includes(nuevaEspecie)
                ? nuevaEspecie
                : paciente.especie;
        paciente.idDueño = nuevoIdDueño || paciente.idDueño;
        console.log("Paciente modificado correctamente:", paciente);
    }
    else {
        console.error("Paciente no encontrado.");
    }
});
exports.modificarPaciente = modificarPaciente;
