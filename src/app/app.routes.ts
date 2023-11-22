import { Routes } from '@angular/router';
import { AutorizadoGuard } from './autorizado.guard';
import { NoAutorizadoGuard } from './no-autorizado.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.page').then( m => m.HomePage),canActivate:[AutorizadoGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'asig',
    loadComponent: () => import('./pages/asig/asig.page').then( m => m.AsigPage),canActivate:[AutorizadoGuard]
  },
  {
    path: 'cambiar-contrasena',
    loadComponent: () => import('./pages/cambiar-contrasena/cambiar-contrasena.page').then( m => m.CambiarContrasenaPage), canActivate:[NoAutorizadoGuard]
  },
  {
    path: 'escanear-qr',
    loadComponent: () => import('./pages/escanear-qr/escanear-qr.page').then( m => m.EscanearQRPage),canActivate:[AutorizadoGuard]
  },
  {
    path: 'home2',
    loadComponent: () => import('./pages/home2/home2.page').then( m => m.Home2Page),canActivate:[AutorizadoGuard]
  },
  {
    path: 'ingresar-asistencia',
    loadComponent: () => import('./pages/ingresar-asistencia/ingresar-asistencia.page').then( m => m.IngresarAsistenciaPage),canActivate:[AutorizadoGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage), canActivate:[NoAutorizadoGuard]
  },
  {
    path: 'modificar-asistencia',
    loadComponent: () => import('./pages/modificar-asistencia/modificar-asistencia.page').then( m => m.ModificarAsistenciaPage),canActivate:[AutorizadoGuard]
  },
  {
    path: 'recuperar-contrasena',
    loadComponent: () => import('./pages/recuperar-contrasena/recuperar-contrasena.page').then( m => m.RecuperarContrasenaPage), canActivate:[NoAutorizadoGuard]
  },
  {
    path: 'ver',
    loadComponent: () => import('./pages/ver/ver.page').then( m => m.VerPage),canActivate:[AutorizadoGuard]
  },
  {
    path: 'prueba',
    loadComponent: () => import('./prueba/prueba.page').then( m => m.PruebaPage)
  },
  { path: '**', component:PageNotFoundComponent }
];
