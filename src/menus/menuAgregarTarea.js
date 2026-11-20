import readlineSync from "readline-sync";
//nuevos imports
import { agregarTarea } from "../tareas/tareaStores.js";
import { tituloValido, descripcionValida } from "../tareas/validaciones.js";
import { Tarea, EstadoTarea, DificultadTarea } from "../tareas/tarea.js";

// Recibe el array actual de tareas por parámetro (aislamiento de datos)
export const ejecutarMenuAgregar = (tareas: readonly Tarea[]): readonly Tarea[] => {
    console.log("AGREGAR UNA TAREA");

    //entrada impura (I/O por consola)
    const titulo: string = readlineSync.question("Titulo:");
    //usamos la funcion pura de validacion
    if (!tituloValido(titulo)) {
        console.log("El título no puede estar vacío ni superar los 100 caracteres.");
        return tareas;
    }

    const descripcion: string = readlineSync.question("Descripción (dejar vacío si no aplica): ");
    if (!descripcionValida(descripcion)) {
        console.log("Error: La descripción no puede superar los 500 caracteres.");
        return tareas;
    }

    console.log("Estado:\n1. Pendiente\n2. En curso\n3. Terminada\n4. Cancelada");
    const opEstado: number = readlineSync.questionInt("Elegí una opción (o 0 para dejar el valor por defecto): ");
    //reemplazo los if else
    const estadosMap: Record<number, EstadoTarea> = { 1: "Pendiente", 2: "En curso", 3: "Terminada", 4: "Cancelada" };//doy estas opciones
    const estado: EstadoTarea = estadosMap[opEstado/*1,2,3,4*/ ]|| "Pendiente";

    console.log("Dificultad:\n1. Fácil\n2. Media\n3. Difícil");
    const opDificultad: number = readlineSync.questionInt("Elegí una opción (o 0 para dejar el valor por defecto): ");
    const dificultadesMap: Record<number, DificultadTarea> = { 1: "Fácil", 2: "Media", 3: "Difícil" };
    const dificultad: DificultadTarea = dificultadesMap[opDificultad] || "Fácil";

    const vencimiento: string = readlineSync.question("Vencimiento YYYY-MM-DD o vacio): ");// 5. Llamamos a nuestra función del store para agregar la tarea de forma inmutable
    const resultado = agregarTarea(tareas, {
        titulo,
        descripcion,
        estado,
        vencimiento,
        dificultad
    });

    console.log(`¡Tarea agregada con éxito! ID: ${resultado.nuevaTarea.id}`);
    
    // 6. Retornamos el NUEVO array actualizado para que el sistema global lo reemplace
    return resultado.tareasActualizadas;
};