import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuarios';
import { Asignatura } from '../clases/asignatura';
import { Asistencia } from '../clases/asistencias';
import { Seccion } from '../clases/seccion';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection} from '@capacitor-community/sqlite';
import { AlumnosPorClase } from '../clases/alumnos-por-clase';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db!: SQLiteDBConnection;
  private sqlite: SQLiteConnection;
  private isDbInitialized = false;
  private usuariosData = [
      {
        username: "fcalfun",
        password: "fcalfun",
        nombre: "Francisco Calfún",
        rol: "profesor"
      },
      {
        username: "usuario1",
        password: "password1",
        nombre: "Nayareth Cárdenas",
        rol: "alumno"
      },
      {
        username: "usuario2",
        password: "password2",
        nombre: "Matías Raipane",
        rol: "alumno"
      },
      {
        username: "usuario3",
        password: "password3",
        nombre: "Eyleen Pino",
        rol: "alumno"
      }

  ];

  private seccionesData = [
    {
      id: 1,
      seccion: "001D",
      jornada: "diurna"
    },
    {
      id: 2,
      seccion: "002D",
      jornada: "diurna"
    },
    {
      id: 3,
      seccion: "001v",
      jornada: "vespertina"
    }
  ];

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      // Crear o abrir la base de datos
      this.db = await this.sqlite.createConnection(
        'db',
        false,
        'no-encryption',
        1,
        false
      );
      await this.db.open();

      // Crear tablas si no existen
      await this.createTables();
      await this.initializeData();
      console.log('Base de datos inicializada');
    } catch (e) {
      console.error('Error al inicializar la base de datos', e);
    }
  }

  private async createTables() {
    try {
      // Crear tabla 'user'
      await this.db.execute(`
      CREATE TABLE IF NOT EXISTS user (
        username TEXT PRIMARY KEY,
        password TEXT,
        nombre TEXT,
        rol TEXT
      );
    `);

    // Crear tabla 'seccion'
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS seccion (
        id INTEGER PRIMARY KEY,
        seccion TEXT,
        jornada TEXT
      );
    `);

    // Crear tabla 'asignatura'
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS asignatura (
        codigo TEXT PRIMARY KEY,
        nombre TEXT,
        seccionId INTEGER,
        FOREIGN KEY (seccionId) REFERENCES seccion(id)
      );
    `);

    // Crear tabla 'asistencia'
    await this.db.execute(`
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
    `);

    // Crear tabla 'alumnosPorClase'
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS alumnosPorClase (
        id INTEGER PRIMARY KEY,
        asignaturaCodigo TEXT,
        seccionId INTEGER,
        alumnos TEXT,
        FOREIGN KEY (asignaturaCodigo) REFERENCES asignatura(codigo),
        FOREIGN KEY (seccionId) REFERENCES seccion(id)
      );
    `);
    } catch (e) {
      console.error('Error al crear tablas', e);
    }
  }

  private async initializeData() {
    // Insertar datos de usuarios
    for (const usuario of this.usuariosData) {
      await this.insertUser(usuario);
    }

    // Insertar datos de secciones
    for (const seccion of this.seccionesData) {
      await this.insertSeccion(seccion);
    }

    // ... inserciones para asignaturas, asistencias, alumnosPorClase
  }

  private async insertUser(usuario: any): Promise<void> {
    const statement = `INSERT INTO user (username, password, nombre, rol) VALUES ('${usuario.username}', '${usuario.password}', '${usuario.nombre}', '${usuario.rol}')`;
    await this.db.execute(statement);
  }

  private async insertSeccion(seccion: any): Promise<void> {
    const statement = `INSERT INTO seccion (id, seccion, jornada) VALUES (${seccion.id}, '${seccion.seccion}', '${seccion.jornada}')`;
    await this.db.execute(statement);
  }


  async getAsistenciaList(): Promise<Asistencia[]> {
    const statement = `SELECT * FROM asistencia`;
    const result = await this.db.query(statement);
    return result.values as Asistencia[];
  }

  async getUsuariosList(): Promise<Usuario[]> {
    const statement = `SELECT * FROM user`;
    const result = await this.db.query(statement);
    return result.values as Usuario[];
  }

  async getAsignaturaList(): Promise<Asignatura[]> {
    const statement = `SELECT * FROM asignatura`;
    const result = await this.db.query(statement);
    return result.values as Asignatura[];
  }

  async getSeccionList(): Promise<Seccion[]> {
    const statement = `SELECT * FROM seccion`;
    const result = await this.db.query(statement);
    return result.values as Seccion[];
  }

  async registrarAsistencia(asistencia: Asistencia): Promise<void> {
    const statement = `INSERT INTO asistencia (username, fecha, hora_entrada, asignaturaCodigo, estado) VALUES ('${asistencia.username}', '${asistencia.fecha}', '${asistencia.hora_entrada}', '${asistencia.codigo}', '${asistencia.estado}')`;
    await this.db.execute(statement);
  }

  async updateAsistencia(id: number, asistencia: Asistencia): Promise<void> {
    const statement = `UPDATE asistencia SET username = '${asistencia.username}', fecha = '${asistencia.fecha}', hora_entrada = '${asistencia.hora_entrada}', asignaturaCodigo = '${asistencia.codigo}', estado = '${asistencia.estado}' WHERE id = ${id}`;
    await this.db.execute(statement);
  }

  async getAlumnosPorClase(): Promise<AlumnosPorClase[]> {
    const statement = `SELECT * FROM alumnosPorClase`;
    const result = await this.db.query(statement);
    return result.values as AlumnosPorClase[];
  }

  async deleteAsistencias(hora_entrada: string, fecha: string, codigo: string): Promise<void> {
    const statement = `DELETE FROM asistencia WHERE hora_entrada = '${hora_entrada}' AND fecha = '${fecha}' AND codigo = '${codigo}'`;
    await this.db.execute(statement);
  }

  async deleteUser(username: string): Promise<void> {
    const statement = `DELETE FROM user WHERE username = '${username}'`;
    await this.db.execute(statement);
  }

  async ensureDbInitialized() {
    if (!this.isDbInitialized) {
      await this.initializeDatabase();
      this.isDbInitialized = true;
    }
  }
}
