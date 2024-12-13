"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteServicios = void 0;
const BaseServicios_1 = require("./BaseServicios");
class ClienteServicios extends BaseServicios_1.BaseServicios {
    constructor() {
        super(...arguments);
        this.modificarCliente = (veterinariaNombre, clienteId, nuevosDatos) => {
            this.modificarEntidad("cliente", veterinariaNombre, clienteId, nuevosDatos);
        };
        this.eliminarCliente = (veterinariaNombre, clienteId) => {
            this.eliminarEntidad("cliente", veterinariaNombre, clienteId);
        };
        this.listarClientes = (veterinariaNombre) => {
            this.listarEntidad("cliente", veterinariaNombre);
        };
    }
    crearCliente(veterinariaNombre, nombre, telefono) {
        this.crearEntidad("cliente", veterinariaNombre, nombre, telefono);
    }
}
exports.ClienteServicios = ClienteServicios;
