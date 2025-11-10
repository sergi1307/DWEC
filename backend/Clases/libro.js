import { Material } from "./material.js";

export class Libro extends Material {
    constructor (titulo, numeroDisponible, autor) {
        super(titulo, numeroDisponible);
        this.autor = autor;
    }
}