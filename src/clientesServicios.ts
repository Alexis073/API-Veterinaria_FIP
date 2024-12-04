import fs from "fs";
import path from "path";
import readlineSync from 'readline-sync';
const basePath = path.join(__dirname, "data");

const cargarDatosVeterinaria = (veterinariaNombre: string) => {
  const filePath = path.join(basePath, `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`La veterinaria "${veterinariaNombre}" no existe.`);
  }
  const data = fs.readFileSync(filePath, "utf-8");

  try {
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Error al analizar JSON:", error);
    throw error;
  }
};
const guardarDatosVeterinaria = (veterinariaNombre: string, datos: any) => {
  const filePath = path.join(
    basePath,
    `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`
  );
  fs.writeFileSync(filePath, JSON.stringify(datos, null, 2), "utf8");
};

const generarIdUnico = (lista: any[]) => {
  let nuevoId: string;
  do {
    nuevoId = `c_${Math.floor(Math.random() * 10000)}`;
  } while (lista.some((item) => item.id === nuevoId));
  return nuevoId;
};

export const crearCliente = (
  veterinariaNombre: string,
  nombre: string,
  telefono: string
) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre);

  const nuevoCliente = {
    id: generarIdUnico(datos.clientes),
    nombre,
    telefono,
    esVIP: false,
    visitas: 0,
  };

  if (nuevoCliente.visitas >= 5) {
    nuevoCliente.esVIP = true;
  }

  datos.clientes.push(nuevoCliente);
  guardarDatosVeterinaria(veterinariaNombre, datos);
  console.log("Cliente creado correctamente:", nuevoCliente);
};

export const modificarCliente = (
  veterinariaNombre: string,
  clienteId: string,
  nuevosDatos: Partial<{ nombre: string; telefono: string }>
) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre);
  const cliente = datos.clientes.find((c: any) => c.id === clienteId);

  if (!cliente) {
    throw new Error("Cliente no encontrado.");
  }

  if (nuevosDatos.nombre) cliente.nombre = nuevosDatos.nombre;
  if (nuevosDatos.telefono) cliente.telefono = nuevosDatos.telefono;

  const nuevoNumeroVisitas = readlineSync.questionInt('Nuevo número de visitas (dejar vacío para no cambiar): ', {
    defaultInput: cliente.visitas.toString(), 
  });
  cliente.visitas = nuevoNumeroVisitas;
  cliente.esVIP = cliente.visitas >= 5;
  guardarDatosVeterinaria(veterinariaNombre, datos);
  console.log("Cliente modificado correctamente:", cliente);
}

export const eliminarCliente = (
  veterinariaNombre: string,
  clienteId: string
) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre);
  const indice = datos.clientes.findIndex((c: any) => c.id === clienteId);

  if (indice === -1) {
    throw new Error("Cliente no encontrado.");
  }

  datos.clientes.splice(indice, 1);
  guardarDatosVeterinaria(veterinariaNombre, datos);
  console.log("Cliente eliminado correctamente.");
};

export const listarClientes = (veterinariaNombre: string) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre);

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
};
