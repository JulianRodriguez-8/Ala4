
//agrego
import readlineSync from "readline-sync";
import { ejecutarMenuAgregar } from "./menus/menuAgregarTarea.js";
import { ejecutarMenuVer } from "./menus/menuVerTareas.js";

//array vacion inmutable
let misTareas = Object.freeze([]);
let ejecutando = true;

//impuro
while (ejecutando) {
    console.log("\n==============================");
    console.log("    GESTOR DE TAREAS (ALA 4)");
    console.log("==============================");
    console.log(`Tareas en el sistema: ${misTareas.length}`);
   console.log("1. Agregar tarea");
    console.log("2. Ver tareas");
    console.log("3. Buscar tarea");
    console.log("4. Modificar tarea");
    console.log("0. Salir");

    const opcion = readlineSync.questionInt("Elija una opcion:");

    switch (opcion) {
        case 1:
            // El menú devuelve un array NUEVO
            misTareas = ejecutarMenuAgregar(misTareas);
            break;
        case 2:
            //retorna el array actualizado si hubo cambios
            misTareas = ejecutarMenuVer(misTareas);
            break;
        case 3:
            misTareas = ejecutarMenuVer(misTareas);
            break;
        case 4:
            misTareas = ejecutarMenuVer(misTareas);
            break;


        case 0:
            console.log("¡Gracias por usar el gestor de tareas! Saliendo...");
            ejecutando = false;
            break;

        default:
            console.log("Opción inválida. Intente nuevamente.");
            break;
    }
}








