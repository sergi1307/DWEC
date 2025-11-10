import readline from 'readline';
import mysql from 'mysql2/promise';

// Útiles para entrada por teclado

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function preguntar(pregunta) {
    return new Promise(resolve => rl.question(pregunta + ' ', r => resolve(r.trim())));
}

export function cerrar() {
    rl.close();
}

// Útiles para conectar a base de datos

export async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'alumno',
            password: 'alumno',
            database: 'biblioteca',
        });
        console.log("Conexión a MYSQL establecida correctamente.");
        return connection;
    } catch (error) {
        console.error("Error al conectar a MySQL:", error);
        throw error;
    }
}