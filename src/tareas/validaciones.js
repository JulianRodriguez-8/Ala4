//agregamos funciones flechas y typeof y trim.

export const tituloValido = (titulo: string | undefined): boolean => {
    //typeof permite averiguar el tipo de dato
    if (typeof titulo !== "string" || titulo === undefined) {
        return false;
    }
    // Quitamos los espacios vacíos de los extremos con .trim()
    const trimmed = titulo.trim();
    return trimmed !== "" && trimmed.length <= 100;
}

export const descripcionValida = (descripcion: string | undefined | null): boolean => {
    if (descripcion === undefined || descripcion === null || descripcion === "") return true;
    return typeof descripcion === "string" && descripcion.length <= 500;
}