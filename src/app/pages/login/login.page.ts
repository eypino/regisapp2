import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, AlertController, ToastController, IonicModule } from '@ionic/angular';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  presentingElement: HTMLElement | null = null;
  userList!: any[];


  user = {
    username: '',
    password: '',
    nombre: '',
    rol: '',
  };

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController,
    private db: DatabaseService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.presentingElement = document.querySelector('.modal');
    await this.db.ensureDbInitialized(); //bd
    await this.loadUserList();
  }

  recuperarContrasena() {
    this.navCtrl.navigateForward('/recuperar-contrasena');
  }

  async loadUserList() {
    try {
      this.userList = await this.db.getUsuariosList();
    } catch (error) {
      console.error('Error al cargar la lista de usuarios', error);
    }
  }

  async login() {
    if (!this.userList) {
      await this.loadUserList();
    }

    const authenticatedUser = this.userList.find(
      (u) => u.username === this.user.username && u.password === this.user.password
    );

    if (authenticatedUser) {
      this.user.nombre = authenticatedUser.nombre;
      this.user.rol = authenticatedUser.rol;
      localStorage.setItem('usuarioAutenticado', 'true');
      localStorage.setItem('usuario', this.user.nombre)

      if (this.user.rol === 'alumno') {
        this.router.navigate(['/home2'], {
          state: { username: this.user.nombre },
        });
      } else {
        this.router.navigate(['/home'], {
          state: { username: this.user.nombre },
        });
      }
    } else {
      this.mostrarAlerta();
    }
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'El nombre de usuario o contraseña son incorrectos.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
