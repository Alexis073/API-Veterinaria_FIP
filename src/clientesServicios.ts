import path from "path";
import readlineSync from "readline-sync";
const basePath = path.join(__dirname, "data");

import { generarIdUnico } from "./generarIdUnico";
import {
  cargarDatosVeterinaria,
  guardarDatosVeterinaria,
} from "./datosVeterinaria";

export const crearCliente = (
  veterinariaNombre: string,
  nombre: string,
  telefono: string
) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre, basePath);

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
  guardarDatosVeterinaria(veterinariaNombre, datos, basePath);
  console.log("Cliente creado correctamente:", nuevoCliente);
};

export const modificarCliente = (
  veterinariaNombre: string,
  clienteId: string,
  nuevosDatos: Partial<{ nombre: string; telefono: string }>
) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre, basePath);
  const cliente = datos.clientes.find((c: any) => c.id === clienteId);

  if (!cliente) {
    throw new Error("Cliente no encontrado.");
  }

  if (nuevosDatos.nombre) cliente.nombre = nuevosDatos.nombre;
  if (nuevosDatos.telefono) cliente.telefono = nuevosDatos.telefono;

  const nuevoNumeroVisitas = readlineSync.questionInt(
    "Nuevo número de visitas (dejar vacío para no cambiar): ",
    {
      defaultInput: cliente.visitas.toString(),
    }
  );
  cliente.visitas = nuevoNumeroVisitas;
  cliente.esVIP = cliente.visitas >= 5;
  guardarDatosVeterinaria(veterinariaNombre, datos, basePath);
  console.log("Cliente modificado correctamente:", cliente);
};

export const eliminarCliente = (
  veterinariaNombre: string,
  clienteId: string
) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre, basePath);
  const indice = datos.clientes.findIndex((c: any) => c.id === clienteId);

  if (indice === -1) {
    throw new Error("Cliente no encontrado.");
  }

  datos.clientes.splice(indice, 1);
  guardarDatosVeterinaria(veterinariaNombre, datos, basePath);
  console.log("Cliente eliminado correctamente.");
};

export const listarClientes = (veterinariaNombre: string) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre, basePath);

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
