"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarIdUnico = void 0;
const generarIdUnico = (lista) => {
    let nuevoId;
    do {
        nuevoId = `c_${Math.floor(Math.random() * 10000)}`;
    } while (lista.some((item) => item.id === nuevoId));
    return nuevoId;
};
exports.generarIdUnico = generarIdUnico;
