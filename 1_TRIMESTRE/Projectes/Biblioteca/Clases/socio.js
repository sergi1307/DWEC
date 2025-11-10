import { persona } from "./persona.js";

export class socio extends persona {
    constructor (nom, dni) {
        super(nom, dni);
        this.llibres = [];
    }
}