import express from "express";
import mysql from "mysql2/promise";

const app = express();
const port = 3000;
app.use(express.json());

const connection = await mysql.createConnection({
  host: "localhost",
  user: "alumno",
  password: "alumno",
  database: "biblioteca",
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos.");
    return;
  }
  console.log("Conectado a la base de datos");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ENDPOINT PELICULAS

// GET PELICULAS

app.get("/pelicules", async (req, res) => {
  try {
    const sql = `
            SELECT m.titulo, m.num_ejemplares, p.director, p.genero
            FROM materiales AS m
            JOIN pelicula AS p ON m.id_material = p.id_material
        `;
    const [results] = await connection.execute(sql);
    res.json(results);
  } catch (error) {
    console.error("Error al obtener las películas:", error);
    res.send("Error al obtener las películas");
  }
});

// POST PELICULAS

app.post("/pelicules", async (req, res) => {
  try {
    const { titulo, num_ejemplares, director, genero } = req.body;

    const [materialResult] = await connection.execute(
      "INSERT INTO materiales (titulo, num_ejemplares, tipus_id) VALUES (?, ?, ?)",
      [titulo, num_ejemplares, 3]
    );

    const id_material = materialResult.insertId;

    await connection.execute(
      "INSERT INTO pelicula (id_material, director, genero) VALUES (?, ?, ?)",
      [id_material, director, genero]
    );

    res.send(`Película creada con id_material ${id_material}`);
  } catch (error) {
    console.error(error);
    res.send("Error al crear la película");
  }
});

// PUT PELICULAS

app.put("/pelicules/:id", async (req, res) => {
  const peliculaId = req.params.id;
  const { num_ejemplares } = req.body;

  const [columnas] = await connection.execute(
    "SELECT tipus_id FROM materiales WHERE id_material = ?",
    [peliculaId]
  );

  const tipus_id_num = columnas[0].tipus_id;

  if (!num_ejemplares) {
    return res.send("Campo números de ejemplares no encontrado.");
  } else if (tipus_id_num === 3) {
    try {
      const [result] = await connection.execute(
        "UPDATE materiales SET num_ejemplares = ? WHERE id_material = ?",
        [num_ejemplares, peliculaId]
      );

      res.send("Pelicula actualizada correctamente.");
    } catch (error) {
      console.error("Error al actualizar la película");
      res.send("Error al actualizar la película.");
    }
  } else {
    res.send("No es una película");
  }
});

// ENDPOINT REVISTAS

// GET REVISTAS

app.get("/revistes", async (req, res) => {
  try {
    const sql = `
            SELECT m.titulo, m.num_ejemplares, r.fecha_publicacion
            FROM materiales AS m
            JOIN revista AS r ON m.id_material = r.id_material
        `;
    const [results] = await connection.execute(sql);
    res.json(results);
  } catch (error) {
    console.error("Error al obtener las revistas:", error);
    res.send("Error al obtener las revistas");
  }
});

// POST REVISTAS

app.post("/revistes", async (req, res) => {
  try {
    const { titulo, num_ejemplares, fecha_publicacion } = req.body;

    const [materialResult] = await connection.execute(
      "INSERT INTO materiales (titulo, num_ejemplares, tipus_id) VALUES (?, ?, ?)",
      [titulo, num_ejemplares, 2]
    );

    const id_material = materialResult.insertId;

    await connection.execute(
      "INSERT INTO revista (id_material, fecha_publicacion) VALUES (?, ?)",
      [id_material, fecha_publicacion]
    );

    res.send(`Revista creada con id_material ${id_material}`);
  } catch (error) {
    console.error(error);
    res.send("Error al crear la revista");
  }
});

// PUT REVISTAS

app.put("/revistes/:id", async (req, res) => {
  const revistaId = req.params.id;
  const { num_ejemplares } = req.body;

  const [columnas] = await connection.execute(
    "SELECT tipus_id FROM materiales WHERE id_material = ?",
    [revistaId]
  );

  const tipus_id_num = columnas[0].tipus_id;

  if (!num_ejemplares) {
    return res.send("Campo números de ejemplares no encontrado.");
  } else if (tipus_id_num === 2) {
    try {
      const [result] = await connection.execute(
        "UPDATE materiales SET num_ejemplares = ? WHERE id_material = ?",
        [num_ejemplares, revistaId]
      );

      res.send("Revista actualizada correctamente.");
    } catch (error) {
      console.error("Error al actualizar la revista");
      res.send("Error al actualizar la revista.");
    }
  } else {
    res.send("No es una revista");
  }
});

// ENDPOINT LIBROS

// GET LIBROS

app.get("/llibres", async (req, res) => {
  try {
    const sql = `
            SELECT m.titulo, m.num_ejemplares, l.autor
            FROM materiales AS m
            JOIN libro AS l ON m.id_material = l.id_material
        `;
    const [results] = await connection.execute(sql);
    res.json(results);
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.send("Error al obtener los libros");
  }
});

// POST LIBROS

app.post("/llibres", async (req, res) => {
  try {
    const { titulo, num_ejemplares, autor } = req.body;

    const [materialResult] = await connection.execute(
      "INSERT INTO materiales (titulo, num_ejemplares, tipus_id) VALUES (?, ?, ?)",
      [titulo, num_ejemplares, 1]
    );

    const id_material = materialResult.insertId;

    await connection.execute(
      "INSERT INTO libro (id_material, autor) VALUES (?, ?)",
      [id_material, autor]
    );

    res.send(`Libro creado con id_material ${id_material}`);
  } catch (error) {
    console.error(error);
    res.send("Error al crear el libro");
  }
});

// PUT LIBROS

app.put("/llibres/:id", async (req, res) => {
  const llibreId = req.params.id;
  const { num_ejemplares } = req.body;

  const [columnas] = await connection.execute(
    "SELECT tipus_id FROM materiales WHERE id_material = ?",
    [llibreId]
  );

  const tipus_id_num = columnas[0].tipus_id;

  if (!num_ejemplares) {
    return res.send("Campo números de ejemplares no encontrado.");
  } else if (tipus_id_num === 1) {
    try {
      const [result] = await connection.execute(
        "UPDATE materiales SET num_ejemplares = ? WHERE id_material = ?",
        [num_ejemplares, llibreId]
      );

      res.send("Libro actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el libro");
      res.send("Error al actualizar el libro.");
    }
  } else {
    res.send("No es un libro");
  }
});

// ENDPOINT ADMINISTRADORES

// GET ADMINISTRADORES

app.get("/administradors", async (req, res) => {
  try {
    const sql = `
            SELECT p.nombre, p.dni, a.cargo
            FROM personas AS p
            JOIN administrador AS a ON p.id_persona = a.id_persona
        `;
    const [results] = await connection.execute(sql);
    res.json(results);
  } catch (error) {
    console.error("Error al obtener los administradores:", error);
    res.send("Error al obtener los administradores");
  }
});

// POST ADMINISTRADORES

app.post("/administradors", async (req, res) => {
  try {
    const { nombre, dni, cargo } = req.body;

    const [persona] = await connection.execute(
      "INSERT INTO personas (nombre, dni) VALUES (?, ?)",
      [nombre, dni]
    );

    const id_persona = persona.insertId;

    await connection.execute(
      "INSERT INTO administrador (id_persona, cargo) VALUES (?, ?)",
      [id_persona, cargo]
    );

    res.send(`Administrador creado con id_persona ${id_persona}`);
  } catch (error) {
    console.error(error);
    res.send("Error al crear el administrador");
  }
});

// PUT ADMINISTRADORES

app.put("/administradors/:id", async (req, res) => {
  const administradorId = req.params.id;
  const { cargo } = req.body;

  try {
    const [result] = await connection.execute(
      "UPDATE administrador SET cargo = ? WHERE id_persona = ?",
      [cargo, administradorId]
    );

    res.send("Administrador actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar el administrador");
    res.send("Error al actualizar el administrador.");
  }
});

// ENDPOINT SOCIOS

// GET SOCIOS

app.get("/socis", async (req, res) => {
  try {
    const sql = `
            SELECT p.nombre, p.dni
            FROM personas AS p
            JOIN socio AS s ON p.id_persona = s.id_persona
        `;
    const [results] = await connection.execute(sql);
    res.json(results);
  } catch (error) {
    console.error("Error al obtener los socios:", error);
    res.send("Error al obtener los socios");
  }
});

// POST SOCIOS

app.post("/socis", async (req, res) => {
  try {
    const { nombre, dni } = req.body;

    const [persona] = await connection.execute(
      "INSERT INTO personas (nombre, dni) VALUES (?, ?)",
      [nombre, dni]
    );

    const id_persona = persona.insertId;

    await connection.execute("INSERT INTO socio (id_persona) VALUES (?)", [
      id_persona,
    ]);

    res.send(`Socio creado con id_persona ${id_persona}`);
  } catch (error) {
    console.error(error);
    res.send("Error al crear el socio");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// PUT SOCIOS

app.put("/socis/:id", async (req, res) => {
  const sociId = req.params.id;
  const { nombre } = req.body;

  try {
    const [result] = await connection.execute(
      "UPDATE personas SET nombre = ? WHERE id_persona = ? AND id_persona NOT IN (SELECT id_persona FROM administrador)",
      [nombre, sociId]
    );

    res.send("Socio actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar el socio:",error);
    res.send("Error al actualizar el socio.");
  }
});