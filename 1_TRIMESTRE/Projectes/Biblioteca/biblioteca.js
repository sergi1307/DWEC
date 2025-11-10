import { preguntar } from "./utiles.js";
import { administrador } from "./Clases/administrador.js";
import { libro } from "./Clases/libro.js";
import { material } from "./Clases/material.js";
import { pelicula } from "./Clases/pelicula.js";
import { persona } from "./Clases/persona.js";
import { revista } from "./Clases/revista.js";
import { socio } from "./Clases/socio.js";

export class biblioteca {
    materiales = [];
    personas = [];

    async afegirLlibre() {
        let lib = new libro (
            await preguntar("¿Cual es el título del libro?"),
            await preguntar("¿Nombre d'exemplars disponibles?"),
            await preguntar("¿Qui es l'autor?")
        );
        this.materiales.push(lib);
        console.log("Libro añadido correctamente.");
    }

    async afegirPelicula() {
        let peli = new pelicula (
            await preguntar("¿Cual es el título de la película?"),
            await preguntar("¿Número de ejemplares disponibles?"),
            await preguntar("¿Quién es el director?"),
            await preguntar("¿Cuál es el género?")
        );
        this.materiales.push(peli);
        console.log("Pelicula añadido correctamente.");
    }

    async afegirRevista() {
        let revi = new revista (
            await preguntar("¿Cual es el título de la revista?"),
            await preguntar("¿Número de ejemplares disponibles?"),
            await preguntar("¿Cuál es la fecha?")
        );
        this.materiales.push(revi);
        console.log("Revista añadido correctamente.");
    }

    async afegirSoci() {
        let soci = new socio (
            await preguntar("¿Cual es el nombre del socio?"),
            await preguntar("¿Cuál es su dni?")
        );
        this.personas.push(soci);
        console.log("Socio añadido correctamente.");
    }

    async afegirAdministrador() {
        let opcion;
        do{
            console.log("1. Administrador");
            console.log("2. Ayudante");
            opcion = await preguntar ("¿Cuál es su cargo?");
        } while (opcion < 1 || opcion > 2);

        if (opcion == 1) {
            opcion = "Administrador";
        } else {
            opcion = "Ajudant";
        }

        let admin = new administrador (
            await preguntar("¿Cual es el nombre del administrador?"),
            await preguntar("¿Cuál es su dni?"),
            opcion
        );
        this.personas.push(admin);
    }

    async ferPrestec() {
        let dni = await preguntar("Introduce el DNI del socio:");
        let soci = this.personas.find(x => x.dni == dni);

        if (!soci) {
            console.log("No se ha encontrado a ningún socio con este DNI.");
            return;
        } else if (soci.llibres.length > 3) {
            console.log("Se han excedido el número de prestamos de este socio.");
            return;
        }

        let titol = await preguntar ("Introduzca el título del recurso:");
        let recurso = this.materiales.find(x => x.titulo == titol);

        if (!recurso) {
            console.log("No se ha encontrado ningún recurso con ese título.");
            return;
        } else if (recurso.numeroDisponibles <= 0) {
            console.log("No hay ejemplares disponibles.");
            return;
        }

        recurso.numeroDisponibles--;
        soci.llibres.push(recurso);
    }

    async retornarLlibre() {
        let dni = await preguntar("Introduce el DNI del socio:");
        let soci = this.personas.find(x => x.dni == dni);

        if (!soci) {
            console.log("No se ha encontrado a ningún socio con este DNI.");
            return;
        } else if (soci.llibres.length > 3) {
            console.log("Se han excedido el número de prestamos de este socio.");
            return;
        }

        for (let i = 0; i < soci.llibres.length; i++) {
            console.log(`Título ${1}: ${soci.llibres[i].titulo}`);
        }

        let titulo = await preguntar ("Introduzca el título a eliminar:");
        let index = soci.llibres.findIndex(libro => libro.titulo === titulo);

        if (index === -1) {
            console.log("El socio no tiene ningún libro con ese título.");
        } else {
            let libro = soci.llibres[index];
            libro.numeroDisponibles++;
            soci.llibres.splice(index, 1);
            console.log("Recurso eliminado correctamente.");
        }
    }

    async listarRecursos() {
        console.log("Llista de recursos:");
        for (let recurso of this.materiales) {
            console.log(`Recurso: ${recurso.titulo}`);
        }
    }

    async listarSocios() {
        console.log("Llista de socios:");
        for (let persona of this.personas) {
            if (persona instanceof socio) {
                console.log(`Nombre: ${persona.nom}, DNI: ${persona.dni}`);
            }
        }
    }

    async listarAdministradors() {
        console.log("Llista de administradors:");
        for (let persona of this.personas) {
            if (persona instanceof administrador) {
                console.log(`Nombre: ${persona.nom}, DNI: ${persona.dni}`);
            }
        }
    }

    async listarRecursosPrestats() {
        console.log("Lista de recursos prestados por socio:");
        let socis = this.personas.filter(x => x instanceof socio);

        if(socis.length === 0) {
            console.log("No hay socios registrados.");
            return;
        }

        for (let s of socis) {
            console.log(`Nombre: ${s.nom}, DNI: ${s.dni}`);
            if (!s.llibres || s.llibres.length === 0) {
                console.log("El socio no tiene recursos prestados.");
            } else {
                for (let recurso of s.llibres) {
                    console.log(`   -> ${recurso.titulo}`);
                }
            }
        }
    }
}