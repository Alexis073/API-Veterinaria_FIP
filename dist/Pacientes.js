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
exports.Paciente = void 0;
const path_1 = __importDefault(require("path"));
const datosVeterinaria_1 = require("./datosVeterinaria");
const BaseServicios_1 = require("./BaseServicios");
class Paciente extends BaseServicios_1.BaseServicios {
    constructor() {
        super(...arguments);
        this.datosVeterinaria = new datosVeterinaria_1.DatosVeterinaria();
        this.basePath = path_1.default.join(__dirname, "data");
        this.pacientes = {};
        this.bajaPaciente = (veterinariaNombre, idPaciente) => {
            this.eliminarEntidad("paciente", veterinariaNombre, idPaciente);
        };
        this.modificarPaciente = (veterinariaNombre, idPaciente, nuevosDatos) => __awaiter(this, void 0, void 0, function* () {
            const { especie } = nuevosDatos;
            if (especie && !["perro", "gato"].includes(especie.toLowerCase())) {
                nuevosDatos.especie = "exotica";
            }
            this.modificarEntidad("paciente", veterinariaNombre, idPaciente, nuevosDatos);
        });
        this.listarPacientes = (veterinariaNombre) => {
            this.listarEntidad("paciente", veterinariaNombre);
        };
    }
    crearPaciente(veterinariaNombre, nombre, especie, idDuenio) {
        const especiesPermitidas = ["perro", "gato"];
        if (!especiesPermitidas.includes(especie.toLowerCase())) {
            especie = "exotica";
        }
        const opciones = {
            especie,
            idDuenio,
        };
        this.crearEntidad("paciente", veterinariaNombre, nombre, undefined, opciones);
    }
}
exports.Paciente = Paciente;
