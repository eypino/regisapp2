/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home2',
  templateUrl: 'home2.page.html',
  styleUrls: ['home2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Home2Page {
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
