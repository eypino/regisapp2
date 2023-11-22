import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';
import { ServiceRestService } from '../../servicios/service-rest.service';
import { Asistencia } from '../../clases/asistencias';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar-asistencia',
  templateUrl: './modificar-asistencia.page.html',
  styleUrls: ['./modificar-asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ModificarAsistenciaPage implements OnInit {
  presentingElement: HTMLElement | null = null;
  seccionList!: any[];
  asignaturaList!: any[];
  asistenciaList!: Asistencia[]; // Cambiar a un arreglo de Asistencia
  registros!: any[];
  selectedAsignatura: string; // Para almacenar la asignatura seleccionada
  selectedSeccion: string; // Para almacenar la sección seleccionada
  mostrarResultados: boolean;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController,
    private api: ServiceRestService,
    private toastController: ToastController
  ) {
    this.mostrarResultados = false; // Inicializa la propiedad como false al principio
    this.selectedAsignatura = ''; // Inicializa la asignatura seleccionada como vacía
    this.selectedSeccion = ''; // Inicializa la sección seleccionada como vacía
  }

  async ngOnInit() {
    this.presentingElement = document.querySelector('.modal');
    await this.loadSeccionList();
    await this.loadAsistenciaList();
    await this.loadAsignaturaList(); // Cargar la lista de asignaturas al iniciar
  }

  async loadSeccionList() {
    try {
      const resultado = await this.api.getSeccionList().toPromise();
      this.seccionList= resultado || [];
      console.log('Secciones cargadas:', this.seccionList);
    } catch (error) {
      console.error('Error al cargar la lista de secciones', error);
    }
  }

  async loadAsistenciaList() {
    try {
      const resultado= await this.api.getAsistenciaList().toPromise();
      this.asistenciaList= resultado || [];
    } catch (error) {
      console.error('Error al cargar la lista de asistencias', error);
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

  filtrarAsistencia(selectedAsignatura: string, selectedSeccion: string) {
    console.log('selectedAsignatura:', selectedAsignatura);
    console.log('selectedSeccion:', selectedSeccion);

    if (!selectedAsignatura || !selectedSeccion) {
      // Mostrar una alerta si no se han seleccionado ambos filtros
      const alert = this.alertController.create({
        header: 'Filtros Incompletos',
        message: 'Por favor, selecciona tanto la asignatura como la sección para filtrar los registros.',
        buttons: ['Aceptar']
      });
      alert.then(alert => {
        alert.present();
      });
    } else {
      // Ambos filtros están seleccionados, así que procedemos con el filtrado
      this.registros = [];
      for (const asistencia of this.asistenciaList) {
        if ((asistencia.codigo === selectedAsignatura) &&
            (asistencia.seccion === selectedSeccion )) {
          this.registros.push(asistencia);
        }
      }

      console.log('Registros filtrados:', this.registros); // Agrega un log para verificar los resultados

      // Mostrar los resultados si se encontraron registros
      this.mostrarResultados = this.registros.length > 0;
    }
  }
cambiarEstado(asistencia: Asistencia) {
  if (asistencia.id !== undefined) {
    this.api.updateAsistencia(asistencia.id, asistencia).subscribe(
    (response) => {
      // Lógica para manejar la respuesta después de la actualización (puedes mostrar un mensaje de éxito, etc.).
      console.log('Registro de asistencia actualizado:', response);
    },
    (error) => {
      // Lógica para manejar errores (puedes mostrar un mensaje de error, etc.).
      console.error('Error al actualizar el registro de asistencia:', error);
    }
  );
  }
}


cerrarSesion() {
  localStorage.removeItem('usuarioAutenticado');
  localStorage.removeItem('usuario');
  this.navCtrl.navigateForward('/login');
}
}
