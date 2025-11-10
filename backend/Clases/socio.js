import { Persona } from "./persona.js";

export class Socio extends Persona {
    constructor (nom, dni) {
        super(nom, dni);
        this.llibres = [];
    }
}