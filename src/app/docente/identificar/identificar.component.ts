import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ModelFiltroValid } from 'src/app/models/ModelFiltroValid';
import { SesionService } from 'src/app/services/sesion.service';
import { UrlService } from 'src/app/services/url.service';
import { ModelDocentePaginadoBusqueda } from 'src/app/models/model-docente-paginado-busqueda';
import { ModelDocenteBusqueda } from 'src/app/models/model-docente-busqueda';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { ModelContactabilidadAgrupado } from 'src/app/models/model-contactabilidad-agrupado';
import { ModelContactabilidadCelular } from 'src/app/models/model-contactabilidad-celular';
import { ModelContactabilidadCorreo } from 'src/app/models/model-contactabilidad-correo';
import { ModelContactabilidadFijo } from 'src/app/models/model-contactabilidad-fijo';

@Component({
  selector: 'app-identificar',
  templateUrl: './identificar.component.html',
  styleUrls: ['./identificar.component.css'],
  providers: [MessageService]
})
export class IdentificarComponent implements OnInit {
  paginaPath:string='';
  page?: number = 1;
  LIMIT: number = 10;
  blocked: boolean = false;
  totalRecords: number = 0;
  reiniciar_page: number = 0;

  selectedRadioFiltro: string = "1";
  dni: string = "";
  apenom: string = "";
  usuario?: string = '';
  foto: string = '';
  firma: string = '';
  display_datos: boolean = false;

  docentes: ModelDocenteBusqueda[] = [];
  docente: ModelDocenteBusqueda = new ModelDocenteBusqueda();
  celulares: ModelContactabilidadCelular[] = [];
  correos: ModelContactabilidadCorreo[] = [];
  fijos: ModelContactabilidadFijo[] = [];
  validFiltro: ModelFiltroValid = new ModelFiltroValid();

  constructor(
    private urlService: UrlService,
    private sesionService: SesionService,
    private messageService: MessageService,
    private utilidadService: UtilidadService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.paginaPath = window.location.href;
    this.sesionService.grabarAutitoria(this.paginaPath, '000107');
    this.usuario = this.sesionService.getSesion().ID_USUARIO;
    this.inicializar_formulario();
  }

  limpiar_filtro() {
    this.dni = "";
    this.apenom = "";
  }

  inicializar_formulario(){
    this.limpiar_filtro();
  }

  fn_buscar(){
    if ( this.selectedRadioFiltro == "" || (this.selectedRadioFiltro != "1" && this.selectedRadioFiltro != "2")) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'SELECCIONE UNA OPCIÓN DE FILTRO VALIDO' });
      return;
    }
    if(this.validar_busqueda_filtro()){
      this.page = 1;
      this.reiniciar_page = 0;
      this.buscarDocentes();
    }
  }

  validar_dni_filtro(): boolean {
    this.validFiltro.DNI_LENGTH = false;
    if (this.dni == '' ||  this.dni.length != 8) {
      this.validFiltro.DNI_LENGTH = true;
      return false;
    }
    return true;
  }

  validar_nombres_filtro(): boolean {
    this.validFiltro.NOM_LENGTH = false;
    if (this.apenom == '' ||  this.apenom.length < 3) {
      this.validFiltro.NOM_LENGTH = true;
      return false;
    }
    return true;
  }

  validar_busqueda_filtro() {
    let valid: boolean = true;
    if (this.selectedRadioFiltro == "1" && !this.validar_dni_filtro()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'INGRESE UN DNI CON 8 DíGITOS' });
      valid = false;
    }
    if (this.selectedRadioFiltro == "2" && !this.validar_nombres_filtro()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'INGRESE UN TEXTO DE AL MENOS 3 CARACTERES EN APELLIDOS Y NOMBRES' });
      valid = false;
    }
    return valid;
  }

  buscarDocentes(){
    this.docentes = [];
    this.totalRecords = 0;
    this.blocked = true;
    try {
      const headersobj = { 'Content-Type': 'application/json' };
      const body = {
        OPCION: 1,
        PAGINA: this.page,
        LIMITE: this.LIMIT,
        DNI: this.dni == '' ? null : this.dni,
        QUERY: this.apenom == '' ? null : this.apenom,
        USUREG: this.usuario
      };
      this.httpClient.post<ModelDocentePaginadoBusqueda>(this.urlService.GET_DOCENTES, body, {
        headers: headersobj
      })
        .pipe(
          timeout(this.urlService.timeout*10)
        )
        .subscribe(data => {
          this.blocked = false;
          if (data != null) {
            if (data.MENSAJE != null || data.ICONO == 0) {
              this.messageService.add({ severity: 'error', summary: 'ERROR', detail: data.MENSAJE });
              return;
            }
            this.docentes = data.ITEMS;
            this.totalRecords = data.TOTAL;
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

  buscarDocente(ASODNI: string){
    this.docente = new ModelDocenteBusqueda();
    this.foto = '';
    this.firma = '';
    this.blocked = true;
    try {
      const headersobj = { 'Content-Type': 'application/json' };
      const body = {
        OPCION: 2,
        DNI: ASODNI,
        USUREG: this.usuario
      };
      this.httpClient.post<ModelDocentePaginadoBusqueda>(this.urlService.GET_DOCENTES, body, {
        headers: headersobj
      })
        .pipe(
          timeout(this.urlService.timeout*10)
        )
        .subscribe(data => {
          this.blocked = false;
          if (data != null) {
            if (data.MENSAJE != null || data.ICONO == 0) {
              this.messageService.add({ severity: 'error', summary: 'ERROR', detail: data.MENSAJE });
              return;
            }
            this.docente = data.ITEMS[0];
            if(data.ITEMS[0].FOTO && data.ITEMS[0].FOTO != null){
              this.foto = 'data:image/jpeg;base64,' + data.ITEMS[0].FOTO;
            }
            if(data.ITEMS[0].FIRMA && data.ITEMS[0].FIRMA != null){
              this.firma = 'data:image/jpeg;base64,' + data.ITEMS[0].FIRMA;
            }
            console.log(this.docente);
            this.buscarContactabilidad(ASODNI);
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

  buscarContactabilidad(ASODNI: string){
    this.blocked = true;
    try {
      const headersobj = { 'Content-Type': 'application/json' };
      const body = {
        ASODNI: ASODNI
      };
      this.httpClient.post<ModelContactabilidadAgrupado>(this.urlService.GET_CONTACTABILIDAD, body, {
        headers: headersobj
      })
        .pipe(
          timeout(this.urlService.timeout*10)
        )
        .subscribe(data => {
          this.blocked = false;
          if (data != null) {
            if (data.MENSAJE != null || data.ICONO == 0) {
              this.messageService.add({ severity: 'error', summary: 'ERROR', detail: data.MENSAJE });
              return;
            }
            this.celulares = data.CELULARES;
            this.correos = data.CORREOS;
            this.fijos = data.FIJOS;
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

  loadLazy(event: LazyLoadEvent) {
    if (event.first == 0) {
      this.page = 1;
    } else {
      this.page = event.first;
      if (this.page != undefined) {
        this.page = this.page / this.LIMIT + 1;
      }
    }
    this.buscarDocentes();
  }

  fn_ver_docente(ASODNI: string){
    this.display_datos = true;
    this.buscarDocente(ASODNI);
  }

  keypress_dni(event: any) {
    return this.utilidadService.keyNumber(event);
  }
}
