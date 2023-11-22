export class UserUpgradeStatements {
  userUpgrades = [
      {
      toVersion: 1,
      statements: [
        `
        CREATE TABLE IF NOT EXISTS user (
          username TEXT PRIMARY KEY,
          password TEXT,
          nombre TEXT,
          rol TEXT
        );
      `,
      `
      CREATE TABLE IF NOT EXISTS seccion (
        id INTEGER PRIMARY KEY,
        seccion TEXT,
        jornada TEXT
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS asignatura (
        codigo TEXT PRIMARY KEY,
        nombre TEXT,
        seccionId INTEGER,
        FOREIGN KEY (seccionId) REFERENCES seccion(id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS asistencia (
        id INTEGER PRIMARY KEY,
        username TEXT,
        fecha TEXT,
        hora_entrada TEXT,
        asignaturaCodigo TEXT,
        estado TEXT,
        FOREIGN KEY (username) REFERENCES user(username),
        FOREIGN KEY (asignaturaCodigo) REFERENCES asignatura(codigo)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS alumnosPorClase (
        id INTEGER PRIMARY KEY,
        asignaturaCodigo TEXT,
        seccionId INTEGER,
        alumnos TEXT,
        FOREIGN KEY (asignaturaCodigo) REFERENCES asignatura(codigo),
        FOREIGN KEY (seccionId) REFERENCES seccion(id)
      );
    `,

      ]
      },
      /* add new statements below for next database version when required*/
      /*
      {
      toVersion: 2,
      statements: [
          `ALTER TABLE users ADD COLUMN email TEXT;`,
      ]
      },
      */
  ]
}
