export class Asistencia {
  id?: number;
  username?: string;
  nombre?: string;
  fecha?: string;
  hora_entrada?: string;
  codigo?: string;
  estado?: string;
  seccion?: string;

  constructor(id?: number, username?: string, nombre?: string, fecha?: string, hora_entrada?: string, codigo?: string, estado?: string, seccion?: string) {
    if (id) this.id = id;
    if (username) this.username = username;
    if (nombre) this.nombre = nombre;
    if (fecha) this.fecha = fecha;
    if (hora_entrada) this.hora_entrada = hora_entrada;
    if (codigo) this.codigo = codigo;
    if (estado) this.estado = estado;
    if (seccion) this.seccion = seccion;
  }
}
