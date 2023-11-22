/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-asig',
  templateUrl: './asig.page.html',
  styleUrls: ['./asig.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AsigPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}



  cerrarSesion() {
    localStorage.removeItem('usuarioAutenticado');
    localStorage.removeItem('usuario');
    this.navCtrl.navigateForward('/login');
  }
}
