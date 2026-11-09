//agregamos funciones flechas y typeof y trim.

export const tituloValido = (titulo) => {
    //typeof permite averiguar el tipo de dato
    if (typeof titulo === "" || titulo === undefined) {
        return false;
    }
    // Quitamos los espacios vacíos de los extremos con .trim()
    const trimmed = titulo.trim();
    return trimedd !== "" && trimedd.length <= 100;
}

export const descripcionValida = (descripcion) => {
    if (descripcion === undefined || descripcion === null || descripcion === "") return true;
    return typeof descripcion === "string" && descripcion.length <= 500;
}



