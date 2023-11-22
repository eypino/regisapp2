import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.page.html',
  styleUrls: ['./ver.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VerPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }


  cerrarSesion() {
    localStorage.removeItem('usuarioAutenticado');
    localStorage.removeItem('usuario');
    this.navCtrl.navigateForward('/login');
  }
}


