import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { timeout } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { UrlService } from '../services/url.service';
import { UtilidadService } from '../services/utilidad.service';
import { SesionService } from '../services/sesion.service';
import { HttpClient } from '@angular/common/http';
import { ModelAplicacionMenu } from '../models/model-aplicacion-menu';
import { environment } from 'src/environments/environment';
import { ModelFotoPerfil } from '../models/model-foto-perfil';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  title: string = 'SERVICIOS MÚLTIPLES';
  paginaPath: string = '';
  @ViewChild('wrapper', { static: true }) wrapper?: ElementRef;
  display: boolean = true;
  blocked: boolean = false;
  menu: MenuItem[] = [];
  foto?: string;
  nombreUsuario: string = '';

  constructor(
    private urlService: UrlService,
    private messageService: MessageService,
    private utilidadService: UtilidadService,
    private sesionService: SesionService,
    private httpClient: HttpClient,
    private permissionsService: NgxPermissionsService
  ) {

  }

  async ngOnInit() {
    this.paginaPath = window.location.href;
    this.sesionService.grabarAutitoria(this.paginaPath, '000111');
    if (environment.production) {
      await this.sesionService.verificarSesion();
    }
    var usuario = this.sesionService.getSesion();
    this.nombreUsuario = this.utilidadService.getString(usuario.NOMBRE_COMPLETO);
    var fotoperfil = this.sesionService.getFotoPerfil();
    if (fotoperfil != null && this.utilidadService.getString(fotoperfil.Data64String) != '') {
      this.foto = 'data:image/jpg;base64,' + fotoperfil.Data64String;
    } else {
      this.obtenerFotoPerfil();
    }
    this.ObtenerMenu();
  }
  clickToggle() {
    if (this.display) {
      this.wrapper?.nativeElement.classList.add('sidebar-inactive-l');
      this.display = false;
    }
    else {
      this.wrapper?.nativeElement.classList.remove('sidebar-inactive-l');
      this.display = true;
    }
  }
  ObtenerMenu() {
    this.menu = [];
    this.permissionsService.loadPermissions([]);

    this.blocked = true;
    try {
      var usuario = this.sesionService.getSesion();
      const headers = { 'Content-Type': 'application/json' }
      const body = {
        OPCION: 1,
        USUREG: usuario.ID_USUARIO,
        CODAPLI: this.utilidadService.CODAPLI
      };
      this.httpClient.post<ModelAplicacionMenu[]>(this.urlService.LISTAR_MENU_PERMISOS, body, {
        headers: headers
      })
        .pipe(
          timeout(this.urlService.timeout)
        )
        .subscribe(data => {
          this.menu = [];
          this.blocked = false;
          if (data != null && data.length > 0) {
            if (data[0].MENSAJE != null) {
              this.messageService.add({ severity: 'error', summary: 'ERROR', detail: data[0].MENSAJE });
              return;
            } else {
              let data_opciones: string[] = [];
              let data_menu: ModelAplicacionMenu[] = [];
              for (var i = 0; i < data.length; i++) {
                if (this.utilidadService.getString(data[i].TIPOMENU) == 'M') {
                  data_menu.push(data[i]);
                }
                data_opciones.push(this.utilidadService.getString(data[i].CODOPCION));
              }
              this.permissionsService.loadPermissions(data_opciones);
              this.TreeViewMenu(data_menu, undefined, undefined);
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
  TreeViewMenu(data: ModelAplicacionMenu[], CODOPCION?: string, PADRE?: MenuItem) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].CODPARENT == CODOPCION) {
        var item = {
          label: data[i].TITULO,
          icon: data[i].ICON,
          routerLink: data[i].URLMENU
        }
        if (PADRE == null) {
          this.menu.push(item);
        }
        else {
          if (PADRE.items == null) {
            PADRE.items = [];
          }
          PADRE.items.push(item);
        }
        this.TreeViewMenu(data, data[i].CODOPCION, item);
      }
    }
  }
  obtenerFotoPerfil(): void {
    var usuario = this.sesionService.getSesion();
    this.blocked = true;
    try {
      const headersjson = { 'Content-Type': 'application/json' };
      const body = {
        username: usuario.ID_USUARIO
      };
      this.httpClient.post<ModelFotoPerfil>(this.urlService.OBTENER_FOTO_PERFIL, body, {
        headers: headersjson
      })
        .pipe(
          timeout(this.urlService.timeout)
        )
        .subscribe(data => {
          this.blocked = false;
          if (data != null) {
            if (data.MENSAJE != null) {
              this.messageService.add({ severity: 'error', summary: 'ERROR', detail: data.MENSAJE });
              return;
            }
            if (this.utilidadService.getString(data.Data64String) != '') {
              this.foto = 'data:image/jpg;base64,' + data.Data64String;
              this.sesionService.saveFotoPerfil(data);
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
  async cerrarSesion() {
    await this.sesionService.grabarAutitoria(this.paginaPath, '000110');
    await this.sesionService.cerrarsesion();
  }
}
