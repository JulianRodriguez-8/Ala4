import readlineSync from "readline-sync";

// Recibe la tarea individual seleccionada y el array global de tareas
export const ejecutarMenuDetalle = (tarea, tareas) => {
    console.log("\n=== DETALLE DE TAREA ===");
    console.log(`ID: ${tarea.id}`);
    console.log(`Título: ${tarea.titulo}`);
    console.log(`Descripción: ${tarea.descripcion || "Sin descripción"}`);
    console.log(`Estado: ${tarea.estado}`);
    console.log(`Dificultad: ${tarea.dificultad}`);
    console.log(`Vencimiento: ${tarea.vencimiento || "Sin vencimiento"}`);
    console.log(`Creada el: ${tarea.creacion.toLocaleString()}`);
    console.log(`Última edición: ${tarea.ultimaEdicion.toLocaleString()}`);

    console.log("\nOpciones:");
    console.log("0. Volver");

    const opcion = readlineSync.questionInt("Opción: ");

    if (opcion === 0) {
        console.log("Volviendo...");
        return tareas;
    }

    console.log("Opción no válida.");
    return tareas;
};