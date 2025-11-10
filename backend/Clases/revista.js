import { Material } from "./material.js";

export class Revista extends Material {
    constructor (titulo, numeroDisponibles, fecha) {
        super(titulo, numeroDisponibles);
        this.fecha = fecha;
    }
}