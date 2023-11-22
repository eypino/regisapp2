import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecuperarContrasenaPage {
  email: string = '';
  mensaje = '';
  public alertButtons = ['OK'];

  constructor(private navCtrl: NavController, private alertController: AlertController) {}


  validarCorreo() {
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return patronCorreo.test(this.email);
  }

  async enviarCorreo() {
    if (!this.validarCorreo()) {
      // Muestra una alerta si el correo no es válido
      this.mensaje = "Por favor, ingresa un correo electrónico válido.";
      const alert = await this.alertController.create({
        header: 'Error',
        message: this.mensaje,
        buttons: this.alertButtons,
      });
      await alert.present();
      return;
    }

    // Envía el correo y muestra un mensaje
    this.mensaje = "La verificación ha sido enviada correctamente a su correo electrónico";
    this.email = "";
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: this.mensaje,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Navega a la página de cambiar contraseña
            this.navCtrl.navigateForward('/cambiar-contrasena');
          },
        },
      ],
    });

    await alert.present();
  }
}
