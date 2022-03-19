import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  paginaPath: string = '';
  blocked: boolean = true;
  constructor(
    private sesionService: SesionService
  ) { }

  ngOnInit(): void {
    this.paginaPath = window.location.href;
    this.sesionService.grabarAutitoria(this.paginaPath, '000108');
  }
  inicio() {
    this.sesionService.redirectHome();
  }
}
