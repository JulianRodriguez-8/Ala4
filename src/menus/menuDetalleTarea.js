
import readlineSync from "readline-sync";
//agrego
import { actualizarTareaEnCollection } from "../tareas/tareaStores.js";
import { tituloValido, descripcionValida } from "../tareas/validaciones.js";

// Recibe la tarea individual seleccionada y el array global de tareas

export const ejecutarMenuDetalle = (tarea, tareas) => {

    console.log("=== DETALLE DE TAREA ===");
    console.log(`ID: ${tarea.id}`);
    console.log(`Título: ${tarea.titulo}`);
    console.log(`Descripción: ${tarea.descripcion || "Sin descripción"}`);
    console.log(`Estado: ${tarea.estado}`);
    console.log(`Dificultad: ${tarea.dificultad}`);
    console.log(`Vencimiento: ${tarea.vencimiento || "Sin vencimiento"}`);
    console.log(`Creada el: ${tarea.creacion.toLocaleString()}`);
    console.log(`Última edición: ${tarea.ultimaEdicion.toLocaleString()}`);

    console.log("Presioná 1 para editar, o 0 para volver.");

    const opcion = readlineSync.questionInt("Opción: ");

    if (opcion === 1) {
        console.log ("\n MODIFICAR TAREA");
        const nuevoTitulo = readlineSync.question(`Nuevo título [${tarea.titulo}]: `);

        const nuevaDescripcion = readlineSync.question(`Nueva descripción [${tarea.descripcion || ""}]: `);

        //  objeto vacío para guardar únicamente lo que el usuario decidió cambiar
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

        // keys revisa el objeto y te extrae únicamente las etiquetas (keys), ignorando los valores.
        if (Object.keys(nuevosDatos).length === 0) {
            console.log("No se ingresaron cambios.");
            return tareas;
        }

        //llamamos a la funcion pura, actualizamos sin mutar
        const tareasActualizadas = actualizarTareaEnCollection(tareas, tarea.id, nuevosDatos);
        console.log("¡Tarea actualizada con éxito!");
        return tareasActualizadas;
    }
    console.log("Opción no válida.");
    return tareas;

};
