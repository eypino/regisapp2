import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceRestService } from 'src/app/servicios/service-rest.service';
import { AlumnosPorClase } from 'src/app/clases/alumnos-por-clase';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingresar-asistencia',
  templateUrl: './ingresar-asistencia.page.html',
  styleUrls: ['./ingresar-asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IngresarAsistenciaPage implements OnInit {
  presentingElement: HTMLElement | null = null;
  alumnosPorClaseList!: AlumnosPorClase[]; // Cambia el tipo de la lista a AlumnosPorClase
  seccionList!: any[];
  asignaturaList!: any[];
  selectedAsignatura!: string;
  selectedSeccion!: string;
  idTemporal: number = 0;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController,
    private api: ServiceRestService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.presentingElement = document.querySelector('.modal');
    await this.loadSeccionList();
    await this.loadAsignaturaList();
    await this.loadAlumnosPorClaseList();
    console.log();
    this.loadAsistencias();

  }

  async loadAsistencias() {
    try {
      const asistencias = await this.api.getAsistenciaList().toPromise();
      if (asistencias && asistencias.length > 0 ) {
        // Encuentra el último ID utilizando el método 'reduce'.
        const ultimoId = asistencias.reduce((maxId, asistencia) => {
          return (asistencia.id || 0) > (maxId || 0) ? asistencia.id : maxId;
        }, asistencias[0].id);

        console.log('Último ID de asistencia:', ultimoId);
        this.idTemporal = ultimoId ?? 0;
      }
    } catch (error) {
      console.error('Error al cargar la lista de asistencias', error);
    }
  }

  async loadAsistenciasBorrado() {
    try {
      const asistencias = await this.api.getAsistenciaList().toPromise();
      if (asistencias && asistencias.length > 0 ) {
        // Encuentra el último ID utilizando el método 'reduce'.
        const ultimoId = asistencias.reduce((maxId, asistencia) => {
          return (asistencia.id ?? 0) > maxId ? asistencia.id ?? 0 : maxId;
        }, 0); // Proporciona un valor inicial de 0 para maxId

        console.log('Último ID de asistencia:', ultimoId);
        this.idTemporal = ultimoId ?? 0;


        // Encuentra la última asistencia con el ID más alto
        const ultimaAsistencia = asistencias.find((asistencia) => asistencia.id === ultimoId);

        if (ultimaAsistencia) {
          const hora_entrada = ultimaAsistencia.hora_entrada;
          const fecha = ultimaAsistencia.fecha;
          const codigo = ultimaAsistencia.codigo;

          return { hora_entrada, fecha, codigo };
        }
      }
    } catch (error) {
      console.error('Error al cargar la lista de asistencias', error);
    }
    return { hora: '', fecha: '', codigo: '' }; // Devuelve valores predeterminados en caso de error o lista vacía.
  }


  async loadAlumnosPorClaseList() {
    try {
      const resultado = await this.api.getAlumnosPorClase().toPromise();
      this.alumnosPorClaseList = resultado || []; // Si resultado es undefined, usa un arreglo vacío
      console.log('Lista de alumnos por clase cargada:', this.alumnosPorClaseList);
    } catch (error) {
      console.error('Error al cargar la lista de alumnos por clase', error);
      this.alumnosPorClaseList = []; // En caso de error, también asigna un arreglo vacío
    }
  }

  async loadSeccionList() {
    try {
      const resultado = await this.api.getSeccionList().toPromise();
      this.seccionList = resultado || [];
      console.log('Secciones cargadas:', this.seccionList);
    } catch (error) {
      console.error('Error al cargar la lista de secciones', error);
    }
  }

  async loadAsignaturaList() {
    try {
      const resultado = await this.api.getAsignaturaList().toPromise();
      this.asignaturaList= resultado || [];
      console.log('Asignaturas cargadas:', this.asignaturaList);
    } catch (error) {
      console.error('Error al cargar la lista de asignaturas', error);
    }
  }



  async getUserNameByUsername(username: string): Promise<string> {
    const usuarios = await this.api.getUsuariosList().toPromise();
    if (usuarios) {
      const usuario = usuarios.find((u) => u.username === username);
      // Devuelve el nombre del usuario si está definido, de lo contrario, devuelve 'Usuario no encontrado'
      return usuario?.nombre ?? 'Usuario no encontrado';
    }
    // Si 'usuarios' es undefined, devuelve 'Usuario no encontrado'
    return 'Usuario no encontrado';
  }




  async registrarAsistencia() {
    if (!this.selectedAsignatura || !this.selectedSeccion) {
      this.presentToast({
        message: 'Error al registrar asistencia. Debe seleccionar una asignatura y una sección.',
        duration: 3000,
        position: 'middle',
        icon: 'alert-circle-outline',
      });
      return;
    }

    // Obtener la lista de alumnos por clase según la asignatura y sección seleccionadas
    const alumnosPorClase = this.alumnosPorClaseList.find(
      (item) =>
        item.asignatura === this.selectedAsignatura &&
        item.seccion === this.selectedSeccion
    );

    if (alumnosPorClase) {
      const asistenciasParaRegistrar = alumnosPorClase.alumnos.map(async (alumno: string) => {
        const username = alumno;
        const nombre = await this.getUserNameByUsername(username);
        const fecha = new Date().toLocaleDateString();
        const hora_entrada = new Date().toLocaleTimeString();
        const codigo = this.selectedAsignatura;
        const seccion = this.selectedSeccion;
        const estado = 'ausente';

        this.idTemporal = this.idTemporal + 1;

        this.api.registrarAsistencia({
          id:this.idTemporal,
          username,
          nombre,
          fecha,
          hora_entrada,
          codigo,
          seccion,
          estado,
        }).subscribe({
          next: () => {
            console.log(`Asistencia registrada para ${nombre}`);
          },
          error: (error) => {
            console.error('Error al registrar asistencia', error);
          },
        });
      });

      this.presentToast({
        message: 'Registrando asistencias...',
        duration: 3000,
        position: 'middle',
        icon: 'alert-circle-outline',
      });

      // Esperar a que se completen todas las promesas de registro de asistencia
      await Promise.all(asistenciasParaRegistrar);

      this.presentToast({
        message: 'Asistencias registradas correctamente.',
        duration: 3000,
        position: 'middle',
        icon: 'checkmark-circle-outline',
      });
    }
  }
  cerrarSesion() {
    localStorage.removeItem('usuarioAutenticado');
    localStorage.removeItem('usuario');
    this.navCtrl.navigateForward('/login');
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'El código QR se proyectará en la sala',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.registrarAsistencia();
          },
        },
      ],
    });

    await alert.present();
  }

  formatearHora(hora: string) {
    // Convierte la hora y quita los segundos
    const partes = hora.split(':');
    return `${partes[0]}:${partes[1]}`;
  }

  async borrarAsistencias() {
    const { hora_entrada , fecha, codigo } = await this.loadAsistenciasBorrado();

    if (!hora_entrada || !fecha || !codigo) {
      console.log('No se pudo obtener la hora, fecha y código de la última asistencia.');
      return;
    }

    console.log('Borrando asistencias con hora:', hora_entrada, 'fecha:', fecha, 'código:', codigo);
    this.api.eliminarAsistencia(hora_entrada, fecha, codigo).subscribe(
      () => {
        console.log('Asistencias eliminadas correctamente.');
      },
      (error) => {
        console.error('Error al eliminar asistencias', error);
      }
    );
  }







  async presentToast(options: ToastOptions | undefined) {
    const toast = await this.toastController.create(options);
    toast.present();
  }
}
