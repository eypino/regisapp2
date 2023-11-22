export class AlumnosPorClase {
  asignatura?: string; // Haciendo la propiedad opcional
  seccion?: string;    // Haciendo la propiedad opcional
  alumnos: string[] = []; // Asignando un valor por defecto

  constructor(asignatura?: string, seccion?: string, alumnos?: string[]) {
    if (asignatura) this.asignatura = asignatura;
    if (seccion) this.seccion = seccion;
    if (alumnos) this.alumnos = alumnos;
  }
}
