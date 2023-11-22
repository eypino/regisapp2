import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Asistencia } from '../clases/asistencias';
import { Observable, tap, of } from 'rxjs';
import { Usuario } from '../clases/usuarios';
import { Asignatura } from '../clases/asignatura';
import { Seccion } from '../clases/seccion';
import { AlumnosPorClase } from 'src/app/clases/alumnos-por-clase';

@Injectable({
  providedIn: 'root',
})
export class ServiceRestService {
  http = inject(HttpClient);
  URL: string = 'http://localhost:3300';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  //Obtener la lista de asistencia
  getAsistenciaList(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(`${this.URL}/asistencia/`).pipe(
      tap((Asistencia) => console.log('Registros de asistencia obtenidos')),
      catchError(this.handleError<Asistencia[]>('Get Asistencia', []))
    );
  }
  //Obtener lista de usuarios
  getUsuariosList(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(`${this.URL}/user/`).pipe(
    tap((Usuario) => console.log('Registros de usuarios obtenidos')),
    catchError(this.handleError<Usuario[]>('Get Usuario', []))
  );
}

getAsignaturaList(): Observable<Asignatura[]> {
  return this.http.get<Asignatura[]>(`${this.URL}/asignatura/`).pipe(
    tap((Asignatura) => console.log('Registros de Asignaturas obtenidos')),
    catchError(this.handleError<Asignatura[]>('Get Asignatura', []))
  );
}

getSeccionList(): Observable<Seccion[]> {
  return this.http.get<Seccion[]>(`${this.URL}/seccion/`).pipe(
    tap((Seccion) => console.log('Registros de seccion obtenidos')),
    catchError(this.handleError<Asistencia[]>('Get Seccion', []))
  );
}

updateAsistencia(id: number, asistencia: Asistencia): Observable<any> {
  return this.http.put(`${this.URL}/asistencia/` + id, asistencia, this.httpHeader).pipe(
    tap((_) => console.log(`Asistencia updated: ${id}`)),
    catchError(this.handleError<Asistencia[]>('Update Asistencia'))
  );
}

getAlumnosPorClase(): Observable<AlumnosPorClase[]> {
  return this.http.get<AlumnosPorClase[]>(`${this.URL}/alumnosPorClase/`).pipe(
    tap((alumnosPorClase) => console.log('Registros de alumnos por clase obtenidos')),
    catchError(this.handleError<AlumnosPorClase[]>('Get Alumnos por Clase', []))
  );
}

registrarAsistencia(asistencia: Asistencia): Observable<any> {
  return this.http.post<Asistencia>(`${this.URL}/asistencia/`, asistencia, this.httpHeader)
    .pipe(
      tap((asistencia) => console.log('Asistencia registrada:', asistencia)),
      catchError(this.handleError<Asistencia>('Registrar Asistencia'))
    );
}

deleteAsistencias(hora_entrada: string, fecha: string, codigo: string): Observable<any> {
  const options = {
    params: {
      hora_entrada,
      fecha,
      codigo,
    },};
  return this.http.delete(`${this.URL}/asistencia/`, options)
    .pipe(
      catchError(this.handleError<any>('Delete Asistencias'))
    );
}


deleteUser(userId: number) {

  fetch(`/api/usuarios/${userId}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
  })
  .catch(error => console.error('Error:', error));
}

eliminarAsistencia(hora_entrada: string, fecha: string, codigo:string):Observable<any>{
let text = "hora_entrada="+hora_entrada+"?fecha="+fecha+"?codigo="+codigo+";"
console.log("Eliminando servicio")
  const stURL =`${this.URL}/asistencia/${text}`
  return this.http.delete(stURL)
}




  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
