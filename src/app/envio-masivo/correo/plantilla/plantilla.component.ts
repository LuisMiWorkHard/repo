import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.css'],
  providers: [MessageService]
})
export class PlantillaComponent implements OnInit {

  plantillas:any;
  opcion_html_first_part = '<div class="opcion-plantilla">';
  opcion_html_last_part = '</div>';
  display_nueva_plantilla: boolean = false;
  index: number = 0;

  constructor(
    private router: Router,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    
    this.plantillas = [{
      ID: 1,
      NOMBRE: 'PLANTILLA 1',
      PLANTILLA_HTML_EDIT: '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="50%" id="td-1"></td><td align="center" valign="top" width="50%" id="td-2"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-3"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="50%" id="td-4"></td><td align="center" valign="top" width="50%" id="td-5"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-6"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-7"></td></tr></table>',
      PLANTILLA_HTML_LOAD: '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="50%" id="td-1"></td><td align="center" valign="top" width="50%" id="td-2"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-3"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="50%" id="td-4"></td><td align="center" valign="top" width="50%" id="td-5"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-6"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-7"></td></tr></table>'
    },
    {
      ID: 2,
      NOMBRE: 'PLANTILLA 2',
      PLANTILLA_HTML_EDIT: '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="50%" id="td-1"></td><td align="center" valign="top" width="50%" id="td-2"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-3"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-4"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-5"></td></tr></table>',
      PLANTILLA_HTML_LOAD: '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="50%" id="td-1"></td><td align="center" valign="top" width="50%" id="td-2"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-3"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-4"></td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" width="100%" id="td-5"></td></tr></table>'
    }];
  }

  onShowPlantilla(){
    /* this.display_nueva_plantilla = true; */
    let element_selected = document.getElementById("td-contenido");
    console.log(element_selected);
    if(element_selected){
      element_selected.innerHTML = "<div class='auxiliar-plantilla'></div>";
    }
  }

  seleccionPlantilla(id:number){
    this.router.navigate(['/home','envio-masivo','correo','editor', id]);
  }

  getNewIdForElement(): string {
    this.index += 1;
    return this.index.toString();
  }

  addTable(option:number){
    let element_selected = document.getElementById("td-contenido");
    if(element_selected){
      let div_inner_selected = element_selected.querySelector(":scope > .auxiliar-plantilla");
      if (div_inner_selected){
        div_inner_selected.remove();
      }
      let new_table =  document.createElement("table");
      let new_id_table = this.getNewIdForElement();
      new_table.setAttribute("id",new_id_table);
      new_table.setAttribute("border","0");
      new_table.setAttribute("cellpadding","0");
      new_table.setAttribute("cellspacing","0");
      new_table.setAttribute("width","100%");
      new_table.setAttribute("style","position:relative;");
      element_selected.appendChild(new_table);
      let actual_table = document.getElementById(new_id_table);
      if(actual_table){
        let new_tr = document.createElement("tr");
        let new_id_tr = this.getNewIdForElement();
        new_tr.setAttribute("id",new_id_tr);
        actual_table.appendChild(new_tr);
        let actual_tr = document.getElementById(new_id_tr);
        if(actual_tr){
          switch (option) {
            case 1:
              let new_td_1_1 = document.createElement("td");
              let new_id_td_1_1 = "td-" + this.getNewIdForElement();
              new_td_1_1.setAttribute("id",new_id_td_1_1);
              new_td_1_1.setAttribute("align","center");
              new_td_1_1.setAttribute("valign","center");
              new_td_1_1.setAttribute("width","100%");
              new_td_1_1.setAttribute("style","background-color:#FFFFFF;");
              new_td_1_1.classList.add("border-unselected");
              actual_tr.appendChild(new_td_1_1);
              break;
            case 2:
              let new_td_2_1 = document.createElement("td");
              let new_id_td_2_1 = "td-" + this.getNewIdForElement();
              new_td_2_1.setAttribute("id",new_id_td_2_1);
              new_td_2_1.setAttribute("align","center");
              new_td_2_1.setAttribute("valign","center");
              new_td_2_1.setAttribute("width","50%");
              new_td_2_1.setAttribute("style","background-color:#FFFFFF;");
              new_td_2_1.classList.add("border-unselected");
              actual_tr.appendChild(new_td_2_1);

              let new_td_2_2 = document.createElement("td");
              let new_id_td_2_2 = "td-" + this.getNewIdForElement();
              new_td_2_2.setAttribute("id",new_id_td_2_2);
              new_td_2_2.setAttribute("align","center");
              new_td_2_2.setAttribute("valign","center");
              new_td_2_2.setAttribute("width","50%");
              new_td_2_2.setAttribute("style","background-color:#FFFFFF;");
              new_td_2_2.classList.add("border-unselected");
              actual_tr.appendChild(new_td_2_2);
              break;
            case 3:
              let new_td_3_1 = document.createElement("td");
              let new_id_td_3_1 = "td-" + this.getNewIdForElement();
              new_td_3_1.setAttribute("id",new_id_td_3_1);
              new_td_3_1.setAttribute("align","center");
              new_td_3_1.setAttribute("valign","center");
              new_td_3_1.setAttribute("width","33.33%");
              new_td_3_1.setAttribute("style","background-color:#FFFFFF;");
              new_td_3_1.classList.add("border-unselected");
              actual_tr.appendChild(new_td_3_1);

              let new_td_3_2 = document.createElement("td");
              let new_id_td_3_2 = "td-" + this.getNewIdForElement();
              new_td_3_2.setAttribute("id",new_id_td_3_2);
              new_td_3_2.setAttribute("align","center");
              new_td_3_2.setAttribute("valign","center");
              new_td_3_2.setAttribute("width","33.33%");
              new_td_3_2.setAttribute("style","background-color:#FFFFFF;");
              new_td_3_2.classList.add("border-unselected");
              actual_tr.appendChild(new_td_3_2);

              let new_td_3_3 = document.createElement("td");
              let new_id_td_3_3 = "td-" + this.getNewIdForElement();
              new_td_3_3.setAttribute("id",new_id_td_3_3);
              new_td_3_3.setAttribute("align","center");
              new_td_3_3.setAttribute("valign","center");
              new_td_3_3.setAttribute("width","33.33%");
              new_td_3_3.setAttribute("style","background-color:#FFFFFF;");
              new_td_3_3.classList.add("border-unselected");
              actual_tr.appendChild(new_td_3_3);
              break;
            case 4:
              let new_td_4_1 = document.createElement("td");
              let new_id_td_4_1 = "td-" + this.getNewIdForElement();
              new_td_4_1.setAttribute("id",new_id_td_4_1);
              new_td_4_1.setAttribute("align","center");
              new_td_4_1.setAttribute("valign","center");
              new_td_4_1.setAttribute("width","33.33%");
              new_td_4_1.setAttribute("style","background-color:#FFFFFF;");
              new_td_4_1.classList.add("border-unselected");
              actual_tr.appendChild(new_td_4_1);

              let new_td_4_2 = document.createElement("td");
              let new_id_td_4_2 = "td-" + this.getNewIdForElement();
              new_td_4_2.setAttribute("id",new_id_td_4_2);
              new_td_4_2.setAttribute("align","center");
              new_td_4_2.setAttribute("valign","center");
              new_td_4_2.setAttribute("width","66.66%");
              new_td_4_2.setAttribute("style","background-color:#FFFFFF;");
              new_td_4_2.classList.add("border-unselected");
              actual_tr.appendChild(new_td_4_2);
              break;
            case 5:
              let new_td_5_1 = document.createElement("td");
              let new_id_td_5_1 = "td-" + this.getNewIdForElement();
              new_td_5_1.setAttribute("id",new_id_td_5_1);
              new_td_5_1.setAttribute("align","center");
              new_td_5_1.setAttribute("valign","center");
              new_td_5_1.setAttribute("width","66.66%");
              new_td_5_1.setAttribute("style","background-color:#FFFFFF;");
              new_td_5_1.classList.add("border-unselected");
              actual_tr.appendChild(new_td_5_1);

              let new_td_5_2 = document.createElement("td");
              let new_id_td_5_2 = "td-" + this.getNewIdForElement();
              new_td_5_2.setAttribute("id",new_id_td_5_2);
              new_td_5_2.setAttribute("align","center");
              new_td_5_2.setAttribute("valign","center");
              new_td_5_2.setAttribute("width","33.33%");
              new_td_5_2.setAttribute("style","background-color:#FFFFFF;");
              new_td_5_2.classList.add("border-unselected");
              actual_tr.appendChild(new_td_5_2);
              break;
            default:
              break;
          }
          let new_tds = actual_table.querySelectorAll("td");
          if(new_tds){
            new_tds.forEach( x => x.innerHTML = "<div class='auxiliar'></div>" );
          }
          actual_table.innerHTML += "<div class='hover-td hide' (click)=\"deleteTable('" +new_id_table+ "')\"><span class='selection-remove'></span></div>";
          actual_table.querySelector(".hover-td")?.addEventListener("click", this.deleteTable.bind(this, new_id_table, false));
        }
      }
    }
  }

  deleteTable(id: string){
    let actual_table_selected = document.getElementById(id);
    if(actual_table_selected){
      actual_table_selected.remove();
    }
    let html_content = document.getElementById("td-contenido");
    if(html_content){
      let nodesTables = html_content.querySelectorAll("table");
      if(nodesTables){
        if(nodesTables.length == 0 ){
          let div_auxiliar_plantilla = document.createElement("div");
          div_auxiliar_plantilla.setAttribute("class","auxiliar-plantilla");
          div_auxiliar_plantilla.setAttribute("style","height:40vh;");
          html_content.appendChild(div_auxiliar_plantilla);
        }
      }else{
        let div_auxiliar_plantilla = document.createElement("div");
        div_auxiliar_plantilla.setAttribute("class","auxiliar-plantilla");
        div_auxiliar_plantilla.setAttribute("style","height:40vh;");
        html_content.appendChild(div_auxiliar_plantilla);
      }
    }
  }

  grabarPlantilla(){
    let html_content_edit = document.getElementById("td-contenido");
    let html_content_load = document.getElementById("content_html_load");
    if(html_content_edit && html_content_load){
      html_content_load.innerHTML = html_content_edit.innerHTML;
      let tables = html_content_load.querySelectorAll("table");
      console.log(tables.length);
      if(tables.length == 0){
        this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'DEBE INGRESAR AL MENOS UNA FILA A LA PLANTILLA' });
      }else{
        tables.forEach(x => {
          x.removeAttribute("style");
          x.removeAttribute("id");
        });
        let trs = html_content_load.querySelectorAll("tr");
        trs.forEach(x => {
          x.removeAttribute("id");
        });
        let tds = html_content_load.querySelectorAll("td");
        tds.forEach(x => {
          x.classList.remove("border-unselected");
          x.classList.remove("border-selected");
        });
        let divs_auxiliar = html_content_load.querySelectorAll(".auxiliar");
        divs_auxiliar.forEach(x => x.remove());
        let divs_hover_td = html_content_load.querySelectorAll(".hover-td");
        divs_hover_td.forEach(x => x.remove());
        console.log(html_content_load.innerHTML);
      }
    }
  }

}
