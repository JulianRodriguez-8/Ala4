//ahora importo lo nuevo
import { crearTareaObjeto, actualizarTareaObjeto } from "./tarea.js";
//Agregado
let contadorId = 0;


//agrgo tarea de forma inmutable
export const agregarTarea = (tareas, {titulo, descripcion, estado, vencimiento, dificultad}) =>  { // Recibe el array actual de tareas y un objeto con los datos de la nueva tarea.
 contadorId++;

 //creamos la nueva tarea usando la función crearTareaObjeto
    const nuevaTarea = crearTareaObjeto(titulo, descripcion, estado, vencimiento, dificultad, contadorId);

    return {
        nuevaTarea, 

        //usamos spread operator para crear un nuevo array de tareas que incluya la nueva tarea, sin modificar el array original.
        tareasActualizadas:Object.freeze([...tareas, nuevaTarea])
    }
}

// ahora reemplazamos los bucles por funciones de orden superior como map,filtrer
export const buscarTareaPorTitulo = (tareas, palabraBuscada) => {
// filter() recorre el array y devuelve un array NUEVO filtrando solo las tareas 
    // cuyo título contenga la palabra buscada
    return tareas.filter(tarea => tarea.titulo.toLowerCase().includes(palabraBuscada.toLowerCase()));
}

export const filtrarTareasPorEstado = (tareas, estadoBuscado) => {
    
  if (!estadoBuscado) return tareas; 

  return tareas.filter(tarea => tarea.estado.toLowerCase() === estadoBuscado.toLowerCase() );
}

export const ordenarTareasAlfabeticamente = (tareas) => {
    //sort() ordena el array de tareas alfabéticamente según el título de cada tarea, usando localeCompare para una comparación de cadenas más precisa. pero muta el array original, por eso usamos spread operator para crear un nuevo array antes de ordenar.
    return [...tareas].sort((a, b) => a.titulo.localeCompare(b.titulo));
}
//actualizamos usando .map()
export const actualizarTareaEnCollection=(tareas, Idtarea,nuevosDatos)=>{
    // .map() recorre todo el array y devuelve un array NUEVO de la misma longitud, transformando los elementos según la condición.
    return tareas.map(tarea=>{
        if (tarea.id===Idtarea){
            return actualizarTareaObjeto(tarea,nuevosDatos);

        }
        return tarea;

    });

}

