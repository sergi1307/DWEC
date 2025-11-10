import { biblioteca } from "./biblioteca.js";
import { preguntar, cerrar } from "./utiles.js"


async function menu() {
    let salir = false;

    while(!salir) {
        console.log(`
        MENÚ
        1. Afegir llibre
        2. Afegir pel·lícula
        3. Afegir revista
        4. Afegir soci
        5. Afegir administrador
        6. Fer prèstec de llibre
        7. Retornar un llibre
        8. Mostrar llista de recursos
        9. Mostrar llista dels socis
        10. Mostrar llista de administradors
        11. Mostrar llista de prèstecs
        0. Eixir 
        `);
        let respuesta = await preguntar("¿Qué desea hacer?");

        switch(respuesta) {
            case "0":
                salir = true;
                cerrar();
                break;
            case "1":
                await libreria.afegirLlibre();
                break;
            case "2":
                await libreria.afegirPelicula();
                break;
            case "3":
                await libreria.afegirRevista();
                break;
            case "4":
                await libreria.afegirSoci();
                break;
            case "5":
                await libreria.afegirAdministrador();
                break;
            case "6":
                await libreria.ferPrestec();
                break;
            case "7":
                await libreria.retornarLlibre();
                break;
            case "8":
                await libreria.listarRecursos();
                break;
            case "9":
                await libreria.listarSocios();
                break;
            case "10":
                await libreria.listarAdministradors();
                break
            case "11":
                await libreria.listarRecursosPrestats();
                break;
            default:
                console.log("Introduzca un número correcto");
                break;
        }
    }
}

const libreria = new biblioteca();
menu();