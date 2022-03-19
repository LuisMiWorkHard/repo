import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SesionService } from './sesion.service';
import { UtilidadService } from './utilidad.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService implements CanActivate {

  constructor(
    private sesionService: SesionService,
    private utilidadService: UtilidadService
  ) { 
      
  }
  canActivate() {
    let usuario = this.sesionService.getSesion();
    if (usuario != null && this.utilidadService.getString(usuario.ID_USUARIO)!='') {
        this.sesionService.redirectHome();
    }
    return true;
  }
}
