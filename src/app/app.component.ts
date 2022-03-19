import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { SesionService } from './services/sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestión de Canales';

  constructor(
    private config: PrimeNGConfig,
    private router: Router,
    private sesionService: SesionService
  ) { }

  ngOnInit() {
    this.config.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar',
      emptyMessage: 'No se han encontrado datos',
      emptyFilterMessage: 'No se han encontrado datos'
    });
  }
  @HostListener('document:click', ['$event.target'])
  public async onClick(targetElement: any) {
    if (this.router.url.indexOf('login') == -1) {
      if (environment.production) {
        await this.sesionService.verificarSesion();
      }
    }
  }
}
