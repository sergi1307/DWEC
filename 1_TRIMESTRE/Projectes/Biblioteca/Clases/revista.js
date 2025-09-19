import { material } from "./material.js";

export class revista extends material {
    constructor (titulo, numeroDisponibles, fecha) {
        super(titulo, numeroDisponibles);
        this.fecha = fecha;
    }
}