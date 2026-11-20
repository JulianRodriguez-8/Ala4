import readlineSync from "readline-sync";
import { buscarTareaPorTitulo } from "../tareas/tareaStores.js";
import { ejecutarMenuDetalle } from "./menuDetalleTarea.js";
import { Tarea } from "../tareas/tarea.js";

export const ejecutarMenuBuscar = (tareas: readonly Tarea[]): readonly Tarea[] => {
    console.log("=== BUSCAR UNA TAREA ===");

    if (tareas.length == 0) {
        console.log("No hay tareas");
        return tareas;
    }

    const palabraBuscada: string = readlineSync.question(
        "Ingresá la palabra a buscar (0 para volver): "
    );
    if (palabraBuscada === "0" || palabraBuscada.trim() === "") {
        console.log("Volviendo...");
        return tareas;
    }
    //uso función pura del store que opera con .filter()
    const tareasEncontradas = buscarTareaPorTitulo(tareas, palabraBuscada);
    if (tareasEncontradas.length === 0) {
        console.log("No se encontraron tareas con esa palabra");
        return tareas;
    }
    console.log("\n--- TAREAS ENCONTRADAS ---");
    //los resultados obtenidos usando .forEach() en lugar de bucles
    tareasEncontradas.forEach((tarea: Tarea, index: number) => {
        console.log(`${index + 1}. ${tarea.titulo} | Estado: ${tarea.estado}`);
    });
    console.log("0. Volver");

    const seleccion: number = readlineSync.questionInt(
        "Elegí una tarea para ver el detalle: "
    );

    if (seleccion === 0) {
        console.log("Volviendo...");
        return tareas;
    }

    if (seleccion < 1 || seleccion > tareasEncontradas.length) {
        console.log("Número de tarea inválido.");
        return tareas;
    }

    const tareaElegida: Tarea = tareasEncontradas[seleccion - 1];

    const tareasActualizadas = ejecutarMenuDetalle(tareaElegida, tareas);

    return tareasActualizadas;
};