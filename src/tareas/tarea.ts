export type EstadoTarea = "Pendiente" | "En curso" | "Terminada" | "Cancelada";
export type DificultadTarea = "Fácil" | "Media" | "Difícil";

export interface Tarea {
    readonly id: number;
    readonly titulo: string;
    readonly descripcion: string | null;
    readonly estado: EstadoTarea;
    readonly vencimiento: string | null;
    readonly dificultad: DificultadTarea;
    readonly creacion: Date;
    readonly ultimaEdicion: Date;
}

export type ActualizacionTarea = Partial<
    Pick<Tarea, "titulo" | "descripcion" | "estado" | "vencimiento" | "dificultad">
>;

// función que construye/retorna un objeto de datos inmutable.
export const crearTareaObjeto = ( //funcion flecha
    titulo: string,
    descripcion: string | undefined,
    estado: EstadoTarea | undefined,
    vencimiento: string | undefined,
    dificultad: DificultadTarea | undefined,
    id: number
): Readonly<Tarea> => {
    return Object.freeze({ // 2. Object.freeze() congela el objeto resultante. por la regla de inmutabilidad, no se puede modificar el objeto resultante.
        id: id,
        titulo: titulo,
        //ternario
        descripcion: descripcion !== undefined && descripcion !== "" ? descripcion : null,
        estado: estado !== undefined ? estado : "Pendiente",
        vencimiento: vencimiento !== undefined && vencimiento !== "" ? vencimiento : null,
        dificultad: dificultad !== undefined ? dificultad : "Fácil",
        creacion: new Date(),
        ultimaEdicion: new Date()
    });
};

// Función pura para actualizar una tarea existente, sin modificar la original(devuelve un objeto NUEVO, no muta el viejo)
export const actualizarTareaObjeto = ( //funcion flecha
    tareaOriginal: Readonly<Tarea>,
    nuevosDatos: ActualizacionTarea
): Readonly<Tarea> => {
    return Object.freeze({ //objeto nuevo congelado
        ...tareaOriginal, //Operador spread (...) copia todas las propiedades que ya tenía la tarea original..."
        ...nuevosDatos, // agrega las propiedades que se pasaron en el objeto nuevosDatos, sobrescribiendo las que ya existían en la tarea original.
        ultimaEdicion: new Date()
    });
};