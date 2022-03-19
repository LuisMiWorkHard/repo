import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public timeout: number = 30000;
  private URL_SERVER: string = this.getAbsolutePath();

  public VERIFICAR_INICIO_OBLIGATORIO_DMDIGITAL = this.URL_SERVER + '/empleado/isInicioDMDigitalObligatorio';
  public INICIO_SESION_X_TOKEN: string = this.URL_SERVER + '/empleado/inicioSesionAutomatico';

  public LOGIN_USUARIO: string = this.URL_SERVER + "/empleado/iniciarSesion";
  public VALIDAR_SESION: string = this.URL_SERVER + "/empleado/validarsesion";
  public CERRAR_SESION: string = this.URL_SERVER + "/empleado/cerrarsesion";
  public GRABAR_AUDITORIA: string = this.URL_SERVER + "/auditoria/grabar";
  public LISTAR_MENU_PERMISOS: string = this.URL_SERVER + "/empleado/ListarMenuPermiso";
  public OBTENER_FOTO_PERFIL: string = this.URL_SERVER + '/empleado/getFotoEmpleado';


  public GET_DOCENTES: string = this.URL_SERVER + '/Docente/getDocentes';
  public GET_CONTACTABILIDAD: string = this.URL_SERVER + '/Docente/getContactibilidad';
  
  constructor() { }

  getAbsolutePath(): string {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    var URL = loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
    if (!environment.production) {
      URL = 'http://localhost:61336';
    }
    return URL;
  }
}
