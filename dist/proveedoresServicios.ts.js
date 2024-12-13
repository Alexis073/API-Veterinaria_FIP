"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedoresServicios = void 0;
const BaseServicios_1 = require("./BaseServicios");
class ProveedoresServicios extends BaseServicios_1.BaseServicios {
    constructor() {
        super(...arguments);
        this.listarProveedores = (veterinariaNombre) => {
            this.listarEntidad("proveedor", veterinariaNombre);
        };
        this.modificarProveedor = (veterinariaNombre, proveedorId, nuevosDatos) => {
            this.modificarEntidad("proveedor", veterinariaNombre, proveedorId, nuevosDatos);
        };
        this.eliminarProveedor = (veterinariaNombre, proveedorId) => {
            this.eliminarEntidad("proveedor", veterinariaNombre, proveedorId);
        };
    }
    crearProveedor(veterinariaNombre, nombre, telefono) {
        this.crearEntidad("proveedor", veterinariaNombre, nombre, telefono);
    }
}
exports.ProveedoresServicios = ProveedoresServicios;
