import readlineSync from "readline-sync";
//agrego
import { filtrarTareasPorEstado, ordenarTareasAlfabeticamente } from "../tareas/tareaStores.ts";
import { ejecutarMenuDetalle } from "./menuDetalleTarea.ts";
import { EstadoTarea, Tarea } from "../tareas/tarea.ts";

//recibe el arreglo actual
export const ejecutarMenuVer = (tareas: readonly Tarea[]): readonly Tarea[] => {
    console.log("¿QUÉ TAREAS DESEAS VER?");
    console.log("1. Ver todas las tareas");
    console.log("2. Ver tareas pendientes");
    console.log("3. Ver tareas en curso");
    console.log("4. Ver tareas terminadas");
    console.log("0. Volver");
    const op: number = readlineSync.questionInt("Ingrese la opción deseada: ");
    if (op === 0) {
        console.log("Volviendo...");
        return tareas;
    }

    const filtrosMap: Record<number, EstadoTarea | null> = {
        1: null,          // Todas (sin filtro)
        2: "Pendiente",
        3: "En curso",
        4: "Terminada"
    };
    const filtroEstado: EstadoTarea | null | undefined = filtrosMap[op];
    if (filtroEstado === undefined) {
        console.log("Opción no válida.");
        return tareas;
    }

    // la funcion pura para filtrar
    const filtradas = filtrarTareasPorEstado(tareas, filtroEstado);

    // función pura de ordenamiento inmutable
    const ordenadas = ordenarTareasAlfabeticamente(filtradas);
    if (ordenadas.length === 0) {
        console.log("No se encontraron tareas.");
        return tareas;
    }

    console.log("TAREAS:");
    // .forEach recorre el array donde 't' es la tarea actual e 'index' es la posición 
    ordenadas.forEach((t: Tarea, index: number) => {
        console.log(`${index + 1}. ${t.titulo} - Estado: ${t.estado}`);
    });

    console.log("0. Volver");
    const seleccion: number = readlineSync.questionInt(
        "Elegí una tarea para ver el detalle: "
    );
    if (seleccion === 0) {
        console.log("Volviendo...");
        return tareas;
    }
    if (seleccion < 1 || seleccion > ordenadas.length) {
        console.log("Número de tarea inválido.");
        return tareas;
    }
    //obtenemos la tarea elegida
    const tareaElegida: Tarea = ordenadas[seleccion - 1];
    //llamamos al menudetalle
    return ejecutarMenuDetalle(tareaElegida, tareas);
};