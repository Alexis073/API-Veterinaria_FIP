import readline from "readline";
import {
  crearVeterinaria,
  modificarVeterinaria,
  eliminarVeterinaria,
} from "./veterinariaServicios";
import {
  crearCliente,
  modificarCliente,
  eliminarCliente,
  listarClientes,
} from "./clientesServicios";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const mostrarMenu = () => {
  console.log("\n--- Menú Veterinaria ---");
  console.log("1. Crear nueva veterinaria");
  console.log("2. Modificar veterinaria");
  console.log("3. Eliminar veterinaria");
  console.log("4. Administrar clientes");
  console.log("5. Salir");
  rl.question("Seleccione una opción: ", (op) => {
    switch (op) {
      case "1":
        crearNuevaVeterinaria();
        break;
      case "2":
        rl.question(
          "Ingrese el nombre de la veterinaria a modificar: ",
          (nombre) => {
            rl.question(
              "Nuevo nombre (dejar vacío para no cambiar): ",
              (nuevoNombre) => {
                modificarVeterinaria(nombre, {
                  nombre: nuevoNombre || undefined,
                })
                  .then(() =>
                    console.log("Veterinaria modificada correctamente.")
                  )
                  .catch((err) => manejarError(err))
                  .finally(() => mostrarMenu());
              }
            );
          }
        );
        break;
      case "3":
        rl.question(
          "Ingrese el nombre de la veterinaria a eliminar: ",
          (nombre) => {
            eliminarVeterinaria(nombre)
              .then(() => console.log("Veterinaria eliminada correctamente."))
              .catch((err) => manejarError(err))
              .finally(() => mostrarMenu());
          }
        );
        break;
      case "4":
        rl.question(
          "Ingrese el nombre de la veterinaria: ",
          (veterinariaNombre) => {
            mostrarMenuClientes(veterinariaNombre);
          }
        );
        break;
      case "5":
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
    crearVeterinaria(nombre)
      .then(() => {
        console.log("Veterinaria creada correctamente.");
        mostrarMenu();
      })
      .catch((err) => {
        manejarError(err);
        mostrarMenu();
      });
  });
};

const manejarError = (error: unknown) => {
  if (error instanceof Error) {
    console.error("Error: ", error.message);
  } else {
    console.error("Error desconocido: ", error);
  }
};

mostrarMenu();
