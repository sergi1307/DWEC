import { Material } from "./material.js";

export class Pelicula extends Material {
    constructor (titulo, numeroDisponible, director, genere) {
        super (titulo, numeroDisponible);
        this.director = director;
        this.genere = genere;
    }
}