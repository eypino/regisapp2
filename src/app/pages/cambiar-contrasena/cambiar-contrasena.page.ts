import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';


@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CambiarContrasenaPage {
  contrasenaActual: string = '';
  nuevaContrasena: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  async cambiarContrasena() {
    if (!this.contrasenaActual || !this.nuevaContrasena) {
      // Validar si los campos están vacíos
      this.mostrarAlerta('Campos requeridos', 'Por favor, completa todos los campos.');
      return;
    }

    // Validar que la nueva contraseña cumpla con el patrón seguro
    if (!this.validarContrasenaSegura(this.nuevaContrasena)) {
      // Validar la fortaleza de la contraseña
      this.mostrarAlerta(
        'Contraseña débil',
        'La nueva contraseña debe contener al menos 8 caracteres, incluyendo letras mayúsculas, minúsculas y números.'
      );
      return;
    }


    // Contraseña cambiada con éxito
    this.mostrarAlerta('Éxito', 'Contraseña cambiada correctamente.');
    this.navCtrl.navigateForward('/login');
  }

  validarContrasenaSegura(contrasena: string): boolean {
    // patrón de contraseña segura: al menos 8 caracteres, incluyendo letras mayúsculas, minúsculas y números.
    const patronContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return patronContrasena.test(contrasena);
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  irAtras() {
    this.navCtrl.back();
  }
}
