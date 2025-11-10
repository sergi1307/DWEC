import { material } from "./material.js";

export class pelicula extends material {
    constructor (titulo, numeroDisponible, director, genere) {
        super (titulo, numeroDisponible);
        this.director = director;
        this.genere = genere;
    }
}