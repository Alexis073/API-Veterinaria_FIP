"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarIdUnico = void 0;
const generarIdUnico = (lista) => {
    let nuevoId;
    do {
        nuevoId = Math.random().toString(36).substr(2, 9); // Generar ID único
    } while (lista.some((item) => item.id === nuevoId)); // Verifica sólo IDs de pacientes
    return nuevoId;
};
exports.generarIdUnico = generarIdUnico;
