import fs from "fs";
import path from "path";

import { generarIdUnico } from "./generarIdUnico";

const basePath = path.join(__dirname, "data");

const cargarDatosVeterinaria = (veterinariaNombre: string) => {
  const filePath = path.join(
    basePath,
    `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`
  );
  if (!fs.existsSync(filePath)) {
    throw new Error(`La veterinaria "${veterinariaNombre}" no existe.`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const guardarDatosVeterinaria = (veterinariaNombre: string, datos: any) => {
  const filePath = path.join(
    basePath,
    `${veterinariaNombre.replace(/\s+/g, "-").toLowerCase()}.json`
  );
  fs.writeFileSync(filePath, JSON.stringify(datos, null, 2), "utf-8");
};

export const crearProveedor = (
  veterinariaNombre: string,
  nombre: string,
  telefono: string
) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre);
  const nuevoProveedor = {
    id: generarIdUnico(datos.proveedores),
    nombre,
    telefono,
  };
  datos.proveedores.push(nuevoProveedor);
  guardarDatosVeterinaria(veterinariaNombre, datos);
  console.log("Proveedor creado:", nuevoProveedor);
};

export const listarProveedores = (veterinariaNombre: string) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre);
  if (datos.proveedores.length === 0) {
    console.log("No hay proveedores registrados.");
  } else {
    console.log("Lista de proveedores:");
    datos.proveedores.forEach((prov: any) =>
      console.log(
        `ID: ${prov.id} - Nombre: ${prov.nombre} - Teléfono: ${prov.telefono}`
      )
    );
  }
};

export const modificarProveedor = (
  veterinariaNombre: string,
  proveedorId: string,
  nuevosDatos: Partial<{ nombre: string; telefono: string }>
) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre);
  const proveedor = datos.proveedores.find(
    (prov: any) => prov.id === proveedorId
  );
  if (!proveedor) throw new Error("Proveedor no encontrado.");
  if (nuevosDatos.nombre) proveedor.nombre = nuevosDatos.nombre;
  if (nuevosDatos.telefono) proveedor.telefono = nuevosDatos.telefono;
  guardarDatosVeterinaria(veterinariaNombre, datos);
  console.log("Proveedor modificado:", proveedor);
};

export const eliminarProveedor = (
  veterinariaNombre: string,
  proveedorId: string
) => {
  const datos = cargarDatosVeterinaria(veterinariaNombre);
  const indice = datos.proveedores.findIndex(
    (prov: any) => prov.id === proveedorId
  );
  if (indice === -1) throw new Error("Proveedor no encontrado.");
  datos.proveedores.splice(indice, 1);
  guardarDatosVeterinaria(veterinariaNombre, datos);
  console.log("Proveedor eliminado.");
};
