/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  styleUrls: ['./escanear-qr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EscanearQRPage implements OnInit {

  constructor(private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  async escanearQR() {
    const alert = await this.alertController.create({
      header: 'Escanear QR',
      message: 'Se abrirá la cámara para escanear el código QR.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Escaneo de QR cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Abriendo la cámara para escanear el QR');
            // Aquí puedes agregar la lógica para abrir la cámara y escanear el QR
          }
        }
      ]
    });
    await alert.present();
  }
  cerrarSesion() {
    localStorage.removeItem('usuarioAutenticado');
    localStorage.removeItem('usuario');
    this.navCtrl.navigateForward('/login');
  }
}
