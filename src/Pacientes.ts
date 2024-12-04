import path from "path";
import {
  cargarDatosVeterinaria,
  guardarDatosVeterinaria,
} from "./datosVeterinaria";
import { generarIdUnico } from "./generarIdUnico";

interface Paciente {
  idPaciente: string;
  nombre: string;
  especie: string;
  idDueño: string;
}

const basePath = path.join(__dirname, "data");
const pacientes: { [key: string]: Paciente[] } = {};

export const altaPaciente = async (
  veterinariaNombre: string,
  nombre: string,
  especie: string,
  idDueño: string
) => {
  const datos = await cargarDatosVeterinaria(veterinariaNombre, basePath);
  if (!datos) {
    console.error("Veterinaria no encontrada.");
    return;
  }

  const idPaciente = generarIdUnico(datos.pacientes);

  const paciente: Paciente = {
    idPaciente,
    nombre,
    especie: ["perro", "gato"].includes(especie) ? especie : "exótica",
    idDueño,
  };

  datos.pacientes.push(paciente);
  guardarDatosVeterinaria(veterinariaNombre, datos, basePath);
};

export const bajaPaciente = async (
  veterinariaNombre: string,
  idPaciente: string
): Promise<void> => {
  const veterinaria = await cargarDatosVeterinaria(veterinariaNombre, basePath);
  if (!veterinaria) {
    console.error("Veterinaria no encontrada.");
    return;
  }

  const index = pacientes[veterinariaNombre]?.findIndex(
    (paciente) => paciente.idPaciente === idPaciente
  );

  if (index !== undefined && index !== -1) {
    pacientes[veterinariaNombre].splice(index, 1);
    console.log(`Paciente con ID ${idPaciente} dado de baja.`);
  } else {
    console.error("Paciente no encontrado.");
  }
};

export const modificarPaciente = async (
  veterinariaNombre: string,
  idPaciente: string,
  nuevoNombre?: string,
  nuevaEspecie?: string,
  nuevoIdDueño?: string
): Promise<void> => {
  const veterinaria = await cargarDatosVeterinaria(veterinariaNombre, basePath);
  if (!veterinaria) {
    console.error("Veterinaria no encontrada.");
    return;
  }

  const paciente = pacientes[veterinariaNombre]?.find(
    (paciente) => paciente.idPaciente === idPaciente
  );

  if (paciente) {
    paciente.nombre = nuevoNombre || paciente.nombre;
    paciente.especie =
      nuevaEspecie && ["perro", "gato"].includes(nuevaEspecie)
        ? nuevaEspecie
        : paciente.especie;
    paciente.idDueño = nuevoIdDueño || paciente.idDueño;
    console.log("Paciente modificado correctamente:", paciente);
  } else {
    console.error("Paciente no encontrado.");
  }
};
