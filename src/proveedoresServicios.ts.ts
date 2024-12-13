import { BaseServicios } from "./BaseServicios";

export class ProveedoresServicios extends BaseServicios {
  crearProveedor(veterinariaNombre: string, nombre: string, telefono: string) {
    this.crearEntidad("proveedor", veterinariaNombre, nombre, telefono);
  }

  listarProveedores = (veterinariaNombre: string) => {
    this.listarEntidad("proveedor", veterinariaNombre);
  };

  modificarProveedor = (
    veterinariaNombre: string,
    proveedorId: string,
    nuevosDatos: Partial<{ nombre: string; telefono: string }>
  ) => {
    this.modificarEntidad(
      "proveedor",
      veterinariaNombre,
      proveedorId,
      nuevosDatos
    );
  };

  eliminarProveedor = (veterinariaNombre: string, proveedorId: string) => {
    this.eliminarEntidad("proveedor", veterinariaNombre, proveedorId);
  };
}
