//ahora importo lo nuevo
import { crearTareaObjeto, actualizarTareaObjeto, Tarea, EstadoTarea, DificultadTarea, ActualizacionTarea } from "./tarea.js";

export interface DatosNuevaTarea {
    titulo: string;
    descripcion?: string;
    estado?: EstadoTarea;
    vencimiento?: string;
    dificultad?: DificultadTarea;
}

export interface ResultadoAgregarTarea {
    nuevaTarea: Tarea;
    tareasActualizadas: readonly Tarea[];
}


//agrgo tarea de forma inmutable
export const agregarTarea = (tareas: readonly Tarea[], {titulo, descripcion, estado, vencimiento, dificultad}: DatosNuevaTarea): ResultadoAgregarTarea =>  { // Recibe el array actual de tareas y un objeto con los datos de la nueva tarea.
    const siguienteId = tareas.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1;

 //creamos la nueva tarea usando la función crearTareaObjeto
    const nuevaTarea = crearTareaObjeto(titulo, descripcion, estado, vencimiento, dificultad, siguienteId);

    return {
        nuevaTarea, 

        //usamos spread operator para crear un nuevo array de tareas que incluya la nueva tarea, sin modificar el array original.
        tareasActualizadas:Object.freeze([...tareas, nuevaTarea])
    }
}

// ahora reemplazamos los bucles por funciones de orden superior como map,filtrer
export const buscarTareaPorTitulo = (tareas: readonly Tarea[], palabraBuscada: string): readonly Tarea[] => {
// filter() recorre el array y devuelve un array NUEVO filtrando solo las tareas 
    // cuyo título contenga la palabra buscada
    return Object.freeze(tareas.filter(tarea => tarea.titulo.toLowerCase().includes(palabraBuscada.toLowerCase())));
}

export const filtrarTareasPorEstado = (tareas: readonly Tarea[], estadoBuscado?: EstadoTarea | string): readonly Tarea[] => {
    
  if (!estadoBuscado) return tareas; 

  return Object.freeze(tareas.filter(tarea => tarea.estado.toLowerCase() === estadoBuscado.toLowerCase() ));
}

export const ordenarTareasAlfabeticamente = (tareas: readonly Tarea[]): readonly Tarea[] => {
    //sort() ordena el array de tareas alfabéticamente según el título de cada tarea, usando localeCompare para una comparación de cadenas más precisa. pero muta el array original, por eso usamos spread operator para crear un nuevo array antes de ordenar.
    return Object.freeze([...tareas].sort((a, b) => a.titulo.localeCompare(b.titulo)));
}
//actualizamos usando .map()
export const actualizarTareaEnCollection=(tareas: readonly Tarea[], Idtarea: number,nuevosDatos: ActualizacionTarea): readonly Tarea[]=>{
    // .map() recorre todo el array y devuelve un array NUEVO de la misma longitud, transformando los elementos según la condición.
    return Object.freeze(tareas.map(tarea=>{
        if (tarea.id===Idtarea){
            return actualizarTareaObjeto(tarea,nuevosDatos);

        }
        return tarea;

    }));

}