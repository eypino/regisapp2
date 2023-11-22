/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage {
  username: any; // Variable para almacenar el nombre de usuario
  user=localStorage.getItem('usuario');

  constructor(private activeroute: ActivatedRoute, private router: Router, private navCtrl: NavController) {
    this.activeroute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.username = this.router.getCurrentNavigation()?.extras.state?.['username'];
        console.log(this.username);
      }
    });
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioAutenticado');
    localStorage.removeItem('usuario');
    this.navCtrl.navigateForward('/login');
  }

  ngOnInit() {}
}
