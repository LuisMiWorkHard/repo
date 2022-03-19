import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timeout } from 'rxjs';
import { ModelLogin } from '../models/model-login';
import { ModelLoginValid } from '../models/model-login-valid';
import { ModelUsuario } from '../models/model-usuario';
import { SesionService } from '../services/sesion.service';
import { UrlService } from '../services/url.service';
import { UtilidadService } from '../services/utilidad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  title: string = 'SERVICIOS MÚLTIPLES';
  blocked: boolean = false;
  usuario: ModelLogin = new ModelLogin();
  loginValid: ModelLoginValid = new ModelLoginValid();
  paginaPath: string = '';
  constructor(
    private urlService: UrlService,
    private messageService: MessageService,
    private utilidadService: UtilidadService,
    private sesionService: SesionService,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paginaPath = window.location.href;
    var token = this.activatedRoute.snapshot.paramMap.get('token');
    if (this.utilidadService.getString(token) != '') {
      this.inicioSesionPorToken(this.utilidadService.getString(token));
    } else {
      this.verificarInicioSesionObligatorio();
    }
  }
  validar_dni(): boolean {
    this.loginValid.USERNAME_REQUIRED = false;
    if (this.utilidadService.getString(this.usuario.USERNAME) == '') {
      this.loginValid.USERNAME_REQUIRED = true;
      return false;
    }
    return true;
  }
  validar_password(): boolean {
    this.loginValid.PASSWORD_REQUIRED = false;
    if (this.utilidadService.getString(this.usuario.PASSWORD) == '') {
      this.loginValid.PASSWORD_REQUIRED = true;
      return false;
    }
    return true;
  }
  validar_formulario() {
    let valid: boolean = true;
    if (!this.validar_dni()) {
      valid = false;
    }
    if (!this.validar_password()) {
      valid = false;
    }
    return valid;
  }
  
  acceder() {
    if (this.validar_formulario()) {
      this.blocked = true;
      try {
        const headers = { 'Content-Type': 'application/json' }
        const body = JSON.stringify(this.usuario);
        this.httpClient.post<ModelUsuario[]>(this.urlService.LOGIN_USUARIO, body, {
          headers: headers
        })
          .pipe(
            timeout(this.urlService.timeout)
          )
          .subscribe(data => {
            this.blocked = false;
            if (data != null && data.length>0) {
              if (data[0].ICONO == 0 && data[0].MENSAJE != null) {
                this.messageService.add({ severity: 'error', summary: 'ERROR', detail: data[0].MENSAJE });
                return;
              }
              if (this.utilidadService.getString(data[0].DESPLEGANDO) == 'S') {
                location.href = this.utilidadService.getString(data[0].ENLACEMAN);
                return;
              }
              if (this.utilidadService.getString(data[0].ID_USUARIO) != '') {
                this.sesionService.saveSesion(data[0]);
                this.sesionService.grabarAutitoria(this.paginaPath, '000109');
                this.sesionService.redirectHome();
              }
            }
          },
            err => {
              this.blocked = false;
              this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'ERROR AL PROCESAR LA INFORMACIÓN: ' + err.message });
            });
      } catch (e: any) {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'HAY PROBLEMAS DE CONEXIÓN: ' + e.message });
      }
    }
  }
  inicioSesionPorToken(t: string) {
    this.blocked = true;
    this.sesionService.signOut();
    try {
      const headersObj = { 'Content-Type': 'application/json' };
      const body = { token: t };
      this.httpClient.post<ModelUsuario[]>(this.urlService.INICIO_SESION_X_TOKEN, body, {
        headers: headersObj
      })
        .pipe(
          timeout(this.urlService.timeout)
        )
        .subscribe(async data => {
          this.blocked = false;
          if (data != null && data.length>0) {
            if (data[0].ICONO == 0 && data[0].MENSAJE != null) {
              this.messageService.add({ severity: 'error', summary: 'ERROR', detail: data[0].MENSAJE });
              return;
            }
            if (this.utilidadService.getString(data[0].DESPLEGANDO) == 'S') {
              location.href = this.utilidadService.getString(data[0].ENLACEMAN);
              return;
            }
            if (this.utilidadService.getString(data[0].ID_USUARIO) != '') {
              this.sesionService.saveSesion(data[0]);
              this.sesionService.grabarAutitoria(this.paginaPath, '000109');
              this.sesionService.redirectHome();
            }
          }
        },
          err => {
            this.blocked = false;
            this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'ERROR AL PROCESAR LA INFORMACIÓN: ' + err.message });
          });
    } catch (e: any) {
      this.blocked = false;
      this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'HAY PROBLEMAS DE CONEXIÓN: ' + e.message });
    }
  }
  verificarInicioSesionObligatorio() {
    this.blocked = true;
    try {
      const headersObj = { 'Content-Type': 'application/json' };
      const body = {};
      this.httpClient.post<any>(this.urlService.VERIFICAR_INICIO_OBLIGATORIO_DMDIGITAL, body, {
        headers: headersObj
      })
        .pipe(
          timeout(this.urlService.timeout)
        )
        .subscribe(data => {
          this.blocked = false;
          if (data.MENSAJE != null) {
            this.messageService.add({ severity: 'error', summary: 'ERROR', detail: data.MENSAJE });
            return;
          }
          if (data.inicio_dmdigital) {
            window.location.href = data.url_dmdigital;
          }
        },
          err => {
            this.blocked = false;
            this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'ERROR AL PROCESAR LA INFORMACIÓN: ' + err.message });
            console.log(err.message);
          });
    } catch (e: any) {
      this.blocked = false;
      this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'HAY PROBLEMAS DE CONEXIÓN: ' + e.message });
    }
  }
}
