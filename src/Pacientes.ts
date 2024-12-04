
interface Paciente {
  idPaciente: number;
  nombre: string;
  especie: string;
  idDueño: string;
}

const pacientes: { [key: string]: Paciente[] } = {};

export const altaPaciente = async (veterinariaNombre: string, nombre: string, especie: string, idDueño: string) => {
  const veterinaria = await obtenerVeterinariaPorNombre(veterinariaNombre);
  if (!veterinaria) {
    console.log("Veterinaria no encontrada.");
    return;
  }

  const idPaciente = Math.floor(Math.random() * 1000000);
  const paciente: Paciente = { idPaciente, nombre, especie: especie === "perro" || especie === "gato" ? especie : "exótica", idDueño };
  
  if (!pacientes[veterinariaNombre]) {
    pacientes[veterinariaNombre] = [];
  }
  pacientes[veterinariaNombre].push(paciente);
  console.log("Paciente creado correctamente:", paciente);
};


export const bajaPaciente = async (veterinariaNombre: string, idPaciente: number) => {
  const veterinaria = await obtenerVeterinariaPorNombre(veterinariaNombre);
  if (!veterinaria) {
    console.log("Veterinaria no encontrada.");
    return;
  }

  const index = pacientes[veterinariaNombre]?.findIndex((paciente) => paciente.idPaciente === idPaciente);
  if (index !== undefined && index !== -1) {
    pacientes[veterinariaNombre].splice(index, 1);
    console.log(`Paciente con ID ${idPaciente} dado de baja.`);
  } else {
    console.log("Paciente no encontrado.");
  }
};


export const modificarPaciente = async (veterinariaNombre: string, idPaciente: number, nuevoNombre?: string, nuevaEspecie?: string, nuevoIdDueño?: string) => {
  const veterinaria = await obtenerVeterinariaPorNombre(veterinariaNombre);
  if (!veterinaria) {
    console.log("Veterinaria no encontrada.");
    return;
  }

  const paciente = pacientes[veterinariaNombre]?.find((paciente) => paciente.idPaciente === idPaciente);
  if (paciente) {
    paciente.nombre = nuevoNombre || paciente.nombre;
    paciente.especie = nuevaEspecie || paciente.especie;
    paciente.idDueño = nuevoIdDueño || paciente.idDueño;
    console.log("Paciente modificado correctamente:", paciente);
  } else {
    console.log("Paciente no encontrado.");
  }
};