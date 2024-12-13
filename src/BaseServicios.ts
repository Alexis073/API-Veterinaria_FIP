import { generarIdUnico } from "./generarIdUnico";

export class BaseServicios {
  protected datosVeterinaria: any;
  protected basePath: string;

  constructor(datosVeterinaria: any, basePath: string) {
    this.datosVeterinaria = datosVeterinaria;
    this.basePath = basePath;
  }

  protected crearEntidad(
    tipo: "proveedor" | "cliente" | "paciente",
    veterinariaNombre: string,
    nombre: string,
    telefono?: string,
    opciones?: { visitas?: number; especie?: string; idDuenio?: string }
  ) {
    const datos = this.datosVeterinaria.cargarDatosVeterinaria(
      veterinariaNombre,
      this.basePath
    );

    let nuevaEntidad: any;

    if (tipo === "proveedor") {
      nuevaEntidad = {
        id: generarIdUnico(datos.proveedores),
        nombre,
        telefono,
      };
      datos.proveedores.push(nuevaEntidad);
    } else if (tipo === "cliente") {
      nuevaEntidad = {
        id: generarIdUnico(datos.clientes),
        nombre,
        telefono,
        esVIP: false,
        visitas: opciones?.visitas || 0,
      };

      if (nuevaEntidad.visitas >= 5) {
        nuevaEntidad.esVIP = true;
      }

      datos.clientes.push(nuevaEntidad);
    } else if (tipo === "paciente") {
      if (!opciones?.idDuenio) {
        throw new Error("IdDuenio son requeridos para crear un paciente.");
      }

      nuevaEntidad = {
        id: generarIdUnico(datos.pacientes),
        nombre,
        especie: opciones.especie,
        idDuenio: opciones.idDuenio,
      };

      datos.pacientes.push(nuevaEntidad);
    }

    this.datosVeterinaria.guardarDatosVeterinaria(
      veterinariaNombre,
      datos,
      this.basePath
    );
  }

  protected modificarEntidad(
    tipo: "proveedor" | "cliente" | "paciente",
    veterinariaNombre: string,
    id: string,
    nuevosDatos: Partial<{
      nombre: string;
      telefono?: string;
      especie?: string;
      idDuenio?: string;
    }>
  ) {
    const datos = this.datosVeterinaria.cargarDatosVeterinaria(
      veterinariaNombre,
      this.basePath
    );

    let nuevaEntidad: any;

    if (tipo === "proveedor") {
      nuevaEntidad = datos.proveedores.find((prov: any) => prov.id === id);
      if (!nuevaEntidad) throw new Error("Proveedor no encontrado.");

      if (nuevosDatos.nombre) nuevaEntidad.nombre = nuevosDatos.nombre;
      if (nuevosDatos.telefono) nuevaEntidad.telefono = nuevosDatos.telefono;

      console.log("Proveedor modificado:", nuevaEntidad);
    } else if (tipo === "cliente") {
      nuevaEntidad = datos.clientes.find((cli: any) => cli.id === id);
      if (!nuevaEntidad) throw new Error("Cliente no encontrado.");

      if (nuevosDatos.nombre) nuevaEntidad.nombre = nuevosDatos.nombre;
      if (nuevosDatos.telefono) nuevaEntidad.telefono = nuevosDatos.telefono;

      console.log("Cliente modificado:", nuevaEntidad);
    } else if (tipo === "paciente") {
      nuevaEntidad = datos.pacientes.find((pac: any) => pac.id === id);
      if (!nuevaEntidad) throw new Error("Paciente no encontrado.");

      if (nuevosDatos.nombre) nuevaEntidad.nombre = nuevosDatos.nombre;
      if (nuevosDatos.especie) nuevaEntidad.especie = nuevosDatos.especie;
      if (nuevosDatos.idDuenio) nuevaEntidad.idDuenio = nuevosDatos.idDuenio;

      console.log("Paciente modificado:", nuevaEntidad);
    }

    this.datosVeterinaria.guardarDatosVeterinaria(
      veterinariaNombre,
      datos,
      this.basePath
    );
  }

  protected eliminarEntidad(
    tipo: "proveedor" | "cliente" | "paciente",
    veterinariaNombre: string,
    id: string
  ) {
    const datos = this.datosVeterinaria.cargarDatosVeterinaria(
      veterinariaNombre,
      this.basePath
    );

    let indice: number;

    if (tipo === "proveedor") {
      indice = datos.proveedores.findIndex((prov: any) => prov.id === id);
      if (indice === -1) throw new Error("Proveedor no encontrado.");

      datos.proveedores.splice(indice, 1);
      console.log("Proveedor eliminado correctamente.");
    } else if (tipo === "cliente") {
      indice = datos.clientes.findIndex((cli: any) => cli.id === id);
      if (indice === -1) throw new Error("Cliente no encontrado.");

      datos.clientes.splice(indice, 1);
      console.log("Cliente eliminado correctamente.");
    } else if (tipo === "paciente") {
      indice = datos.pacientes.findIndex((pac: any) => pac.id === id);
      if (indice === -1) throw new Error("Paciente no encontrado.");

      datos.pacientes.splice(indice, 1);
      console.log("Paciente eliminado correctamente.");
    }

    this.datosVeterinaria.guardarDatosVeterinaria(
      veterinariaNombre,
      datos,
      this.basePath
    );
  }

  protected listarEntidad(
    tipo: "proveedor" | "cliente" | "paciente",
    veterinariaNombre: string
  ) {
    const datos = this.datosVeterinaria.cargarDatosVeterinaria(
      veterinariaNombre,
      this.basePath
    );

    if (tipo === "cliente") {
      if (datos.clientes.length === 0) {
        console.log("No hay clientes registrados en esta veterinaria.");
      } else {
        console.log("Lista de clientes:");
        datos.clientes.forEach((cliente: any, index: number) => {
          console.log(
            `${index + 1}. ${cliente.nombre} - Teléfono: ${
              cliente.telefono
            } - VIP: ${cliente.esVIP}`
          );
        });
      }
    } else {
      if (tipo === "proveedor") {
        console.log("Lista de proveedores:");
        datos.proveedores.forEach((prov: any, index: number) =>
          console.log(
            `${index + 1}. Nombre: ${prov.nombre} - Teléfono: ${prov.telefono}`
          )
        );
      } else {
        console.log("Lista de pacientes:");
        datos.pacientes.forEach((pac: any, index: number) =>
          console.log(`${index + 1}. Nombre: ${pac.nombre} - ${pac.especie}`)
        );
      }
    }
  }
}
