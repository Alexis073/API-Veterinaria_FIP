"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarIdUnico = void 0;
const generarIdUnico = (lista) => {
    let nuevoId;
    do {
        nuevoId = Math.random().toString(36).substr(2, 9);
    } while (lista.some((item) => item.id === nuevoId));
    return nuevoId;
};
exports.generarIdUnico = generarIdUnico;
