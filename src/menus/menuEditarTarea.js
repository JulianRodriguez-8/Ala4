import readlineSync from "readline-sync";
import { actualizarTareaEnCollection } from "../tareas/tareaStores.js";
import { tituloValido, descripcionValida } from "../tareas/validaciones.js";

// Recibe el array global de tareas
export const ejecutarMenuModificar = (tareas) => {
    console.log("\n=== MODIFICAR TAREA ===");

    if (tareas.length === 0) {
        console.log("No hay tareas en el sistema para modificar.");
        return tareas;
    }

    const idBuscado = readlineSync.questionInt("Ingrese el ID de la tarea que desea modificar: ");

    // Buscamos la tarea dentro del array
    const tarea = tareas.find(t => t.id === idBuscado);

    if (!tarea) {
        console.log("No se encontró ninguna tarea con ese ID.");
        return tareas;
    }

    console.log(`Modificando tarea: "${tarea.titulo}"`);
    console.log("Dejá en blanco y presioná Enter para no modificar un campo de texto.");

    const nuevoTitulo = readlineSync.question(`Nuevo título [${tarea.titulo}]: `);
    const nuevaDescripcion = readlineSync.question(`Nueva descripción [${tarea.descripcion || ""}]: `);

    console.log(`Estado actual: ${tarea.estado}`);
    console.log("1. Pendiente  2. En curso  3. Terminada  4. Cancelada  (0 para no modificar)");
    const opEstado = readlineSync.questionInt("Elegí una opción de estado: ");

    console.log(`Dificultad actual: ${tarea.dificultad}`);
    console.log("1. Fácil  2. Media  3. Difícil  (0 para no modificar)");
    const opDificultad = readlineSync.questionInt("Elegí una opción de dificultad: ");

    const nuevoVencimiento = readlineSync.question(`Nuevo vencimiento [${tarea.vencimiento || "Sin vencimiento"}]: `);

    // Objeto vacío para guardar únicamente lo que el usuario decidió cambiar
    const nuevosDatos = {};

  
    if (nuevoTitulo !== "") {
        if (!tituloValido(nuevoTitulo)) {
            console.log("Error: El título no es válido. No se guardaron cambios.");
            return tareas;
        }
        nuevosDatos.titulo = nuevoTitulo;
    }

  
    if (nuevaDescripcion !== "") {
        if (!descripcionValida(nuevaDescripcion)) {
            console.log("Error: La descripción no es válida. No se guardaron cambios.");
            return tareas;
        }
        nuevosDatos.descripcion = nuevaDescripcion;
    }

    // evitando if/else largos
    const estadosMap = { 1: "Pendiente", 2: "En curso", 3: "Terminada", 4: "Cancelada" };
    if (estadosMap[opEstado]) {
        nuevosDatos.estado = estadosMap[opEstado];
    }

    const dificultadesMap = { 1: "Fácil", 2: "Media", 3: "Difícil" };
    if (dificultadesMap[opDificultad]) {
        nuevosDatos.dificultad = dificultadesMap[opDificultad];
    }

  
    if (nuevoVencimiento !== "") {
        nuevosDatos.vencimiento = nuevoVencimiento;
    }

    // Object.keys revisa el objeto y extrae únicamente las etiquetas sin los valores
    if (Object.keys(nuevosDatos).length === 0) {
        console.log("No se ingresaron cambios.");
        return tareas;
    }

    // actualizando de forma inmutable 
    const tareasActualizadas = actualizarTareaEnCollection(tareas, tarea.id, nuevosDatos);
    console.log("¡Tarea actualizada con éxito!");
    return tareasActualizadas;
};