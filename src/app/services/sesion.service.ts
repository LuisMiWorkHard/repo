import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as MobileDetect from 'mobile-detect';
import { DeviceDetectorService } from 'ngx-device-detector';
import { timeout } from 'rxjs/operators';
import { ModelAplicacionMenu } from '../models/model-aplicacion-menu';
import { ModelAuditoria } from '../models/model-auditoria';
import { ModelFotoPerfil } from '../models/model-foto-perfil';
import { ModelMensaje } from '../models/model-mensaje';
import { ModelUsuario } from '../models/model-usuario';
import { UrlService } from './url.service';
import { UtilidadService } from './utilidad.service';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private USER_KEY = 'KEYUSER';
  private FOTO_KEY = 'KEYFOTO';
  public MAP_URL = new Map<string, string>([
    ["https://api.ipify.org/?format=json", "https://api.ipify.org/?format=json"]
  ]);

  private usuario: ModelUsuario;
  private fotoPerfil: ModelFotoPerfil;
  constructor(
    private utilidadService: UtilidadService,
    private httpCliente: HttpClient,
    private urlService: UrlService,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {
    this.usuario = new ModelUsuario();
    this.fotoPerfil = new ModelFotoPerfil();
  }
  public signOut() {
    this.usuario = new ModelUsuario();
    this.fotoPerfil = new ModelFotoPerfil();
    localStorage.clear();
  }

  public saveSesion(user: ModelUsuario): void {
    this.usuario = user;
    var json = JSON.stringify(user);
    localStorage.removeItem(this.USER_KEY);
    localStorage.setItem(this.USER_KEY, json);
  }
  public getSesion(): ModelUsuario {
    try {
      var json = this.utilidadService.getString(localStorage.getItem(this.USER_KEY));
      this.usuario = JSON.parse(json);
    } catch (ex) {
      this.usuario = new ModelUsuario();
    }
    return this.usuario;
  }
  public saveFotoPerfil(foto: ModelFotoPerfil): void {
    const json = JSON.stringify(foto);
    localStorage.removeItem(this.FOTO_KEY);
    localStorage.setItem(this.FOTO_KEY, json);
  }

  public getFotoPerfil(): ModelFotoPerfil {
    try {
      const json = this.utilidadService.getString(localStorage.getItem(this.FOTO_KEY));
      this.fotoPerfil = JSON.parse(json);
    } catch (ex) {
      this.fotoPerfil = new ModelFotoPerfil();
    }
    return this.fotoPerfil;
  }
  public async verificarSesion(): Promise<Boolean> {
    let activo: boolean = false;
    console.log("verificar sessión");
    try {
      const headers = { 'Content-Type': 'application/json' }
      const body = {};
      await this.httpCliente.post<ModelUsuario[]>(this.urlService.VALIDAR_SESION, body, {
        headers: headers
      })
        .pipe(
          timeout(this.urlService.timeout)
        )
        .toPromise()
        .then(data => {
          if (data != null && data.length > 0) {
            let usuario: ModelUsuario = data[0];
            if (this.utilidadService.getString(usuario.DESPLEGANDO) == 'S') {
              location.href = this.utilidadService.getString(usuario.ENLACEMAN);
              return;
            }
            if (this.utilidadService.getString(usuario.ID_USUARIO) != '') {
              this.saveSesion(usuario);
              activo = true;
            } else {
              this.signOut();
              window.close();
              this.redirectLogin();
            }
          } else {
            this.signOut();
            window.close();
            this.redirectLogin();
          }
        }).catch(err => {
          this.signOut();
          window.close();
          this.redirectLogin();
          activo = false;
        });
    } catch (e) {
      this.signOut();
      window.close();
      this.redirectLogin();
      activo = false;
    }
    return activo;
  }
  public async cerrarsesion(): Promise<Boolean> {
    let activo: boolean = false;
    console.log("cerrar sessión");
    try {
      const headers = { 'Content-Type': 'application/json' }
      const body = {};
      await this.httpCliente.post<ModelUsuario[]>(this.urlService.CERRAR_SESION, body, {
        headers: headers
      })
        .pipe(
          timeout(this.urlService.timeout)
        )
        .toPromise()
        .then(data => {
          activo = true;
          this.signOut();
          window.close();
          this.redirectLogin();
        }).catch(err => {
          activo = false;
          this.signOut();
          window.close();
          this.redirectLogin();
        });
    } catch (e) {
      activo = false;
      this.signOut();
      window.close();
      this.redirectLogin();
    }
    return activo;
  }
  public async grabarAutitoria(URL: string, OPCION: string) {
    try {
      var usuario = this.getSesion();
      let auditoria: ModelAuditoria = new ModelAuditoria();
      var deviceInfo = this.deviceService.getDeviceInfo();
      var md = new MobileDetect(this.deviceService.userAgent);
      var dispositivo = "";
      if (this.deviceService.isMobile()) {
        dispositivo = "MOBILE";
      }
      if (this.deviceService.isTablet()) {
        dispositivo = "TABLET";
      }
      if (this.deviceService.isDesktop()) {
        dispositivo = "DESKTOP";
      }
      var ip_publica;
      var latitude;
      var longitude;
      try {
        await this.utilidadService.getIPAddress().toPromise().then((res: any) => {
          ip_publica = res.ip;
        });
      } catch (ex) { }
      try {
        await this.utilidadService.getPosition().then(pos => {
          latitude = pos.lat;
          longitude = pos.lng;
        });
      } catch (ex) { }
      auditoria.USUREG = usuario.ID_USUARIO;
      auditoria.NOMAPE = usuario.NOMBRE_COMPLETO;
      auditoria.LATITUDE = latitude;
      auditoria.LONGITUDE = longitude;
      auditoria.APLICACION = this.utilidadService.CODAPLI;
      auditoria.TIPOAPLICACION = 'WEB';
      auditoria.CODOPCION = OPCION;
      auditoria.PAGINA = URL;
      auditoria.DISPOSITIVO = dispositivo;
      auditoria.UA = deviceInfo.userAgent;
      auditoria.USERAGENT = deviceInfo.browser;
      auditoria.OS = deviceInfo.os;
      auditoria.MOBILE = this.utilidadService.getString(md.mobile());
      auditoria.PHONE = this.utilidadService.getString(md.phone());
      auditoria.TABLET = this.utilidadService.getString(md.tablet());
      const headers = { 'Content-Type': 'application/json' }
      const body = JSON.stringify(auditoria);
      this.httpCliente.post<ModelMensaje>(this.urlService.GRABAR_AUDITORIA, body, {
        headers: headers
      })
        .pipe(
          timeout(this.urlService.timeout)
        )
        .subscribe(data => {

        },
          err => {

          });
    } catch (e: any) {

    }
  }
  public redirectHome() {
    this.router.navigate(['home','envio-masivo','correo','editor']);
  }
  public redirectLogin() {
    this.router.navigate(['login']);
  }
}
