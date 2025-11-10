import { persona } from "./persona.js";

export class administrador extends persona {
    constructor(nom, dni, carrec) {
        if(carrec != "Administrador" && carrec != "Ajudant") {
            throw new Error ("El carrec te que ser: Administrador o Ajudant");
        } else {
            super(nom, dni);
            this.carrec = carrec;
            console.log("Administrador añadido correctamente.");
        }
    }
}