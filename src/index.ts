import readline from "readline";
import {
  crearVeterinaria,
  modificarVeterinaria,
  eliminarVeterinaria,
  listarVeterinarias,
} from "./veterinariaServicios";
import {
  crearCliente,
  modificarCliente,
  eliminarCliente,
  listarClientes,
} from "./clientesServicios";
import {
  listarProveedores,
  crearProveedor,
  eliminarProveedor,
  modificarProveedor,
} from "./proveedoresServicios.ts";
import { altaPaciente, modificarPaciente, bajaPaciente } from "./Pacientes";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const mostrarMenu = () => {
  console.log("\n--- Menú Veterinaria ---");
  console.log("1. Crear nueva veterinaria");
  console.log("2. Modificar veterinaria");
  console.log("3. Eliminar veterinaria");
  console.log("4. Listar veterinarias");
  console.log("5. Administrar clientes");
  console.log("6. Administrar proveedores");
  console.log("7. Administrar pacientes");
  console.log("8. Salir");

  rl.question("Seleccione una opción: ", (op) => {
    switch (op) {
      case "1":
        crearNuevaVeterinaria();
        break;
      case "2":
        rl.question(
          "Ingrese el nombre de la veterinaria a modificar: ",
          (nombre) => {
            try {
              rl.question(
                "Nuevo nombre (dejar vacío para no cambiar): ",
                (nuevoNombre) => {
                  modificarVeterinaria(nombre, {
                    nombre: nuevoNombre || undefined,
                  });
                  console.log("Veterinaria modificada correctamente.");
                  mostrarMenu();
                }
              );
            } catch (err) {
              manejarError(err);
              mostrarMenu();
            }
          }
        );
        break;
      case "3":
        rl.question(
          "Ingrese el nombre de la veterinaria a eliminar: ",
          (nombre) => {
            try {
              eliminarVeterinaria(nombre);
              console.log("Veterinaria eliminada correctamente.");
              mostrarMenu();
            } catch (err) {
              manejarError(err);
              mostrarMenu();
            }
          }
        );
        break;
      case "4":
        try {
          listarVeterinarias();
        } catch (error) {
          manejarError(error);
        }
        rl.question("\nPresione enter para regresar al menu\n", async () => {
          mostrarMenu();
        });
        break;
      case "5":
        rl.question(
          "Ingrese el nombre de la veterinaria: ",
          (veterinariaNombre) => {
            try {
              mostrarMenuClientes(veterinariaNombre);
            } catch (err) {
              manejarError(err);
              mostrarMenu();
            }
          }
        );
        break;
      case "6":
        rl.question(
          "Ingrese el nombre de la veterinaria: ",
          (veterinariaNombre) => {
            try {
              mostrarMenuProveedores(veterinariaNombre);
            } catch (err) {
              manejarError(err);
              mostrarMenu();
            }
          }
        );
        break;
      case "7":
        rl.question(
          "Ingrese el nombre de la veterinaria: ",
          (veterinariaNombre) => {
            try {
              mostrarMenuPacientes(veterinariaNombre);
            } catch (err) {
              manejarError(err);
              mostrarMenu();
            }
          }
        );
        break;
      case "8":
        console.log("Programa cerrado.");
        rl.close();
        break;
      default:
        console.log("Opción no válida.");
        mostrarMenu();
    }
  });
};

const mostrarMenuClientes = (veterinariaNombre: string) => {
  console.log("\n--- Menú Clientes ---");
  console.log("1. Crear cliente");
  console.log("2. Modificar cliente");
  console.log("3. Eliminar cliente");
  console.log("4. Listar clientes");
  console.log("5. Volver al menú principal");

  rl.question("Seleccione una opción: ", (op) => {
    switch (op) {
      case "1":
        rl.question("Nombre del cliente: ", (nombre) => {
          rl.question("Teléfono del cliente: ", (telefono) => {
            try {
              crearCliente(veterinariaNombre, nombre, telefono);
              console.log("Cliente creado correctamente.");
            } catch (error) {
              manejarError(error);
            }
            mostrarMenuClientes(veterinariaNombre);
          });
        });
        break;
      case "2":
        rl.question("ID del cliente: ", (id) => {
          rl.question(
            "Nuevo nombre (dejar vacío para no cambiar): ",
            (nombre) => {
              rl.question(
                "Nuevo teléfono (dejar vacío para no cambiar): ",
                (telefono) => {
                  try {
                    modificarCliente(veterinariaNombre, id, {
                      nombre: nombre || undefined,
                      telefono: telefono || undefined,
                    });
                    console.log("Cliente modificado correctamente.");
                  } catch (error) {
                    manejarError(error);
                  }
                  mostrarMenuClientes(veterinariaNombre);
                }
              );
            }
          );
        });
        break;
      case "3":
        rl.question("ID del cliente: ", (id) => {
          try {
            eliminarCliente(veterinariaNombre, id);
            console.log("Cliente eliminado correctamente.");
          } catch (error) {
            manejarError(error);
          }
          mostrarMenuClientes(veterinariaNombre);
        });
        break;
      case "4":
        try {
          listarClientes(veterinariaNombre);
        } catch (error) {
          manejarError(error);
        }
        mostrarMenuClientes(veterinariaNombre);
        break;
      case "5":
        mostrarMenu();
        break;
      default:
        console.log("Opción no valida.");
        mostrarMenuClientes(veterinariaNombre);
    }
  });
};

const crearNuevaVeterinaria = () => {
  rl.question("Ingresar el nombre de la veterinaria: ", (nombre) => {
    crearVeterinaria(nombre);
    try {
      console.log("Veterinaria creada correctamente.");
      mostrarMenu();
    } catch (error) {
      manejarError(error);
      mostrarMenu();
    }
  });
};

const manejarError = (error: unknown) => {
  if (error instanceof Error) {
    console.error("Error: ", error.message);
  } else {
    console.error("Error desconocido: ", error);
  }
};

const mostrarMenuProveedores = (veterinariaNombre: string) => {
  console.log("\n--- Menú Proveedores ---");
  console.log("1. Crear Proveedor");
  console.log("2. Modificar Proveedor");
  console.log("3. Eliminar Proveedor");
  console.log("4. Listar Proveedores");
  console.log("5. Volver al menú principal");

  rl.question("Seleccione una opción: ", (op) => {
    switch (op) {
      case "1":
        rl.question("Nombre del Proveedor: ", (nombre) => {
          rl.question("Teléfono del Proveedor: ", (telefono) => {
            try {
              crearProveedor(veterinariaNombre, nombre, telefono);
              console.log("Proveedor creado correctamente.");
            } catch (error) {
              manejarError(error);
            }
            mostrarMenuProveedores(veterinariaNombre);
          });
        });
        break;
      case "2":
        rl.question("ID del Proveedor: ", (id) => {
          rl.question(
            "Nuevo nombre (dejar vacío para no cambiar): ",
            (nombre) => {
              rl.question(
                "Nuevo teléfono (dejar vacío para no cambiar): ",
                (telefono) => {
                  try {
                    modificarProveedor(veterinariaNombre, id, {
                      nombre: nombre || undefined,
                      telefono: telefono || undefined,
                    });
                    console.log("Proveedor modificado correctamente.");
                  } catch (error) {
                    manejarError(error);
                  }
                  mostrarMenuProveedores(veterinariaNombre);
                }
              );
            }
          );
        });
        break;
      case "3":
        rl.question("ID del Proveedor: ", (id) => {
          try {
            eliminarProveedor(veterinariaNombre, id);
            console.log("Proveedor eliminado correctamente.");
          } catch (error) {
            manejarError(error);
          }
          mostrarMenuProveedores(veterinariaNombre);
        });
        break;
      case "4":
        try {
          listarProveedores(veterinariaNombre);
        } catch (error) {
          manejarError(error);
        }
        mostrarMenuProveedores(veterinariaNombre);
        break;
      case "5":
        mostrarMenu();
        break;
      default:
        console.log("Opción no valida.");
        mostrarMenuProveedores(veterinariaNombre);
    }
  });
};

const mostrarMenuPacientes = (veterinariaNombre: string) => {
  console.log("\n--- Menú Pacientes ---");
  console.log("1. Crear paciente");
  console.log("2. Modificar paciente");
  console.log("3. Eliminar paciente");
  console.log("4. Volver al menú principal");

  rl.question("Seleccione una opción: ", (op) => {
    switch (op) {
      case "1":
        rl.question("Nombre del paciente: ", (nombre) => {
          rl.question("Especie del paciente: ", (especie) => {
            rl.question("ID del dueño: ", (idDueño) => {
              try {
                altaPaciente(veterinariaNombre, nombre, especie, idDueño);
                console.log("Paciente creado correctamente.");
              } catch (error) {
                manejarError(error);
              }
              mostrarMenuPacientes(veterinariaNombre);
            });
          });
        });
        break;
      case "2":
        rl.question("ID del paciente: ", (idPaciente) => {
          rl.question(
            "Nuevo nombre (dejar vacío para no cambiar): ",
            (nuevoNombre) => {
              rl.question(
                "Nueva especie (dejar vacío para no cambiar): ",
                (nuevaEspecie) => {
                  rl.question(
                    "Nuevo ID del dueño (dejar vacío para no cambiar): ",
                    (nuevoIdDueño) => {
                      try {
                        modificarPaciente(
                          veterinariaNombre,
                          idPaciente,
                          nuevoNombre || undefined,
                          nuevaEspecie || undefined,
                          nuevoIdDueño || undefined
                        );
                        console.log("Paciente modificado correctamente.");
                      } catch (error) {
                        manejarError(error);
                      }
                      mostrarMenuPacientes(veterinariaNombre);
                    }
                  );
                }
              );
            }
          );
        });
        break;
      case "3":
        rl.question("ID del paciente: ", (idPaciente) => {
          try {
            bajaPaciente(veterinariaNombre, idPaciente);
            console.log("Paciente eliminado correctamente.");
          } catch (error) {
            manejarError(error);
          }
          mostrarMenuPacientes(veterinariaNombre);
        });
        break;
      case "4":
        mostrarMenu();
        break;
      default:
        console.log("Opción no válida.");
        mostrarMenuPacientes(veterinariaNombre);
    }
  });
};

mostrarMenu();
