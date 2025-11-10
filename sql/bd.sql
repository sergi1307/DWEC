-- Active: 1762339856350@@localhost@3306@biblioteca
DROP DATABASE IF EXISTS biblioteca;
CREATE DATABASE biblioteca;
USE biblioteca;

-- Esta clase es per a que el projecte siga mes escalable
-- CREATE TABLE biblioteca (
--     id_biblioteca INT PRIMARY KEY AUTO_INCREMENT,
--     nombre VARCHAR(100),
--     direccion VARCHAR(100),
--     codigo_postal INT,
--     telefono CHAR(9),
--     correo_electronico VARCHAR(100)
-- );

CREATE TABLE TipusRecursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipus VARCHAR(50) UNIQUE
);

CREATE TABLE materiales (
    id_material INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    num_ejemplares INT NOT NULL,
    tipus_id INT,
    FOREIGN KEY (tipus_id) REFERENCES TipusRecursos(id)
);

CREATE TABLE libro (
    id_material INT PRIMARY KEY,
    autor VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_material) REFERENCES materiales(id_material)
);

CREATE TABLE revista (
    id_material INT PRIMARY KEY,
    fecha_publicacion DATE NOT NULL,
    FOREIGN KEY (id_material) REFERENCES materiales(id_material)
);

CREATE TABLE pelicula (
    id_material INT PRIMARY KEY,
    director VARCHAR(100) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_material) REFERENCES materiales(id_material)
);

CREATE TABLE personas (
    id_persona INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    dni VARCHAR(10) UNIQUE NOT NULL
);

-- La dejamos puesta por si es necesario añadir más datos posteriormente
CREATE TABLE socio (
    id_persona INT PRIMARY KEY,
    correo_electronico VARCHAR(100) UNIQUE,
    telefono CHAR(9) UNIQUE,

    FOREIGN KEY (id_persona) REFERENCES personas(id_persona)
);

CREATE TABLE administrador (
    id_persona INT PRIMARY KEY,
    cargo ENUM("Administrador", "Ajudant") DEFAULT "Administrador",
    FOREIGN KEY (id_persona) REFERENCES personas(id_persona) ON DELETE CASCADE
);

CREATE TABLE prestamos (
    id_prestamo INT PRIMARY KEY AUTO_INCREMENT,
    id_socio INT NOT NULL,
    id_material INT NOT NULL,
    data_prestec DATE,
    data_retorn DATE,
    FOREIGN KEY (id_socio) REFERENCES socio(id_persona),
    FOREIGN KEY (id_material) REFERENCES materiales(id_material)
);

INSERT INTO TipusRecursos (tipus) VALUES
('Libro'),
('Revista'),
('Película');

INSERT INTO materiales (titulo, num_ejemplares, tipus_id) VALUES
('El señor de los anillos', 5, 1),
('Harry Potter y la piedra filosofal', 8, 1),
('National Geographic - Marzo 2024', 10, 2),
('Time - Abril 2024', 6, 2),
('Inception', 3, 3),
('Interstellar', 4, 3);

INSERT INTO libro (id_material, autor) VALUES
(1, 'J.R.R. Tolkien'),
(2, 'J.K. Rowling');

INSERT INTO revista (id_material, fecha_publicacion) VALUES
(3, '2024-03-01'),
(4, '2024-04-15');

INSERT INTO pelicula (id_material, director, genero) VALUES
(5, 'Christopher Nolan', 'Ciencia Ficción'),
(6, 'Christopher Nolan', 'Drama / Ciencia Ficción');

INSERT INTO personas (nombre, dni) VALUES
('Carlos Pérez', '12345678A'),
('Laura Gómez', '87654321B'),
('Ana Torres', '11223344C'),
('Javier Ruiz', '44332211D');

INSERT INTO socio (id_persona) VALUES
(1),
(2);

INSERT INTO administrador (id_persona, cargo) VALUES
(3, 'Administrador'),
(4, 'Ajudant');

INSERT INTO prestamos (id_socio, id_material, data_prestec, data_retorn) VALUES
(1, 1, '2025-10-01', '2025-10-15'),
(1, 5, '2025-10-05', NULL),
(2, 2, '2025-09-20', '2025-09-30'),
(2, 3, '2025-10-10', NULL);