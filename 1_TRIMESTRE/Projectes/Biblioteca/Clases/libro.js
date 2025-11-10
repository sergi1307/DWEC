import { material } from "./material.js";

export class libro extends material {
    constructor (titulo, numeroDisponible, autor) {
        super(titulo, numeroDisponible);
        this.autor = autor;
    }
}