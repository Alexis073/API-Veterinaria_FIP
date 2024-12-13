import { BaseServicios } from "./BaseServicios";

export class ClienteServicios extends BaseServicios {
  crearCliente(veterinariaNombre: string, nombre: string, telefono: string) {
    this.crearEntidad("cliente", veterinariaNombre, nombre, telefono);
  }

  modificarCliente = (
    veterinariaNombre: string,
    clienteId: string,
    nuevosDatos: Partial<{ nombre: string; telefono: string }>
  ) => {
    this.modificarEntidad("cliente", veterinariaNombre, clienteId, nuevosDatos);
  };

  eliminarCliente = (veterinariaNombre: string, clienteId: string) => {
    this.eliminarEntidad("cliente", veterinariaNombre, clienteId);
  };

  listarClientes = (veterinariaNombre: string) => {
    this.listarEntidad("cliente", veterinariaNombre);
  };
}
