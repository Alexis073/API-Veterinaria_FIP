import path from "path";

import { DatosVeterinaria } from "./datosVeterinaria";
import { BaseServicios } from "./BaseServicios";

interface PacienteData {
  id: string;
  nombre: string;
  especie: string;
  idDueño: string;
}

export class Paciente extends BaseServicios {
  datosVeterinaria = new DatosVeterinaria();
  basePath = path.join(__dirname, "data");
  pacientes: { [key: string]: PacienteData[] } = {};

  crearPaciente(
    veterinariaNombre: string,
    nombre: string,
    especie: string,
    idDuenio: string
  ) {
    const especiesPermitidas = ["perro", "gato"];
    if (!especiesPermitidas.includes(especie.toLowerCase())) {
      especie = "exotica";
    }
    const opciones = {
      especie,
      idDuenio,
    };

    this.crearEntidad(
      "paciente",
      veterinariaNombre,
      nombre,
      undefined,
      opciones
    );
  }

  bajaPaciente = (veterinariaNombre: string, idPaciente: string) => {
    this.eliminarEntidad("paciente", veterinariaNombre, idPaciente);
  };

  modificarPaciente = async (
    veterinariaNombre: string,
    idPaciente: string,
    nuevosDatos: Partial<{ nombre: string; especie: string; IdDuenio: string }>
  ) => {
    const { especie } = nuevosDatos;
    if (especie && !["perro", "gato"].includes(especie.toLowerCase())) {
      nuevosDatos.especie = "exotica";
    }

    this.modificarEntidad(
      "paciente",
      veterinariaNombre,
      idPaciente,
      nuevosDatos
    );
  };

  listarPacientes = (veterinariaNombre: string) => {
    this.listarEntidad("paciente", veterinariaNombre);
  };
}
