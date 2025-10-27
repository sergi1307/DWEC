import { Persona } from "./persona.js";

export class Administrador extends Persona {
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