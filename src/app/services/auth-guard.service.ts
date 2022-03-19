import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SesionService } from './sesion.service';
import { UtilidadService } from './utilidad.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private sesionService: SesionService,
    private utilidadService: UtilidadService
  ) {

  }
  canActivate() {
    let value: boolean = false;
    let usuario = this.sesionService.getSesion();
    if (usuario != null && this.utilidadService.getString(usuario.ID_USUARIO) != '' ) {
      value = true;
    }
    if (!value) {
      console.log('No estás logueado');
      this.sesionService.redirectLogin();
    }
    return value;
  }
}

