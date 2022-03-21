import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ModelBorde } from 'src/app/models/model-borde';
import { ModelBotonEdit } from 'src/app/models/model-boton-edit';
import { ModelGridEdit } from 'src/app/models/model-grid-edit';
import { ModelFuente } from 'src/app/models/model-fuente';
import { ModelImgEdit } from 'src/app/models/model-img-edit';
import { ModelTarget } from 'src/app/models/model-target';
import { ModelTextoEdit } from 'src/app/models/model-texto-edit';
import { ModelVariable } from 'src/app/models/model-variable';
import { ConditionalExpr } from '@angular/compiler';
import { ActivatedRoute, Params } from '@angular/router';

declare let unlayer: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild('wrapper', { static: true }) wrapper?: ElementRef;
  display_menu: boolean = false;
  display_delete: boolean = false;
  display_estructuras: boolean = false;
  id_element_selected: string = "";
  MAX_LENGHT_2 = 2;
  MAX_LENGHT_3 = 3;
  MIN_VALUE_8 = 8;
  MAX_VALUE_99 = 99;
  index: number = 0;
  id_plantilla: number = 0;
  actual_plantilla: any;

  /*IMAGEN PROPIEDADES*/
  imgList: ModelImgEdit[] = [];
  imgSelectedList: ModelImgEdit = new ModelImgEdit();
  targets: ModelTarget[];
  selectedTarget: ModelTarget = new ModelTarget();
  
  /*TEXTO PROPIEDADES*/
  textoList: ModelTextoEdit[] = [];
  textoSelectedList: ModelTextoEdit = new ModelTextoEdit();
  variables: ModelVariable[];
  selectedVariable: ModelVariable = new ModelVariable();
  fuentes: ModelFuente[];
  selectedFuente: ModelFuente = new ModelFuente();

  /*BOTON PROPIEDADES*/
  botonList: ModelBotonEdit[] = [];
  botonSelectedList: ModelBotonEdit = new ModelBotonEdit();
  targetsButton: ModelTarget[];
  selectedTargetButton: ModelTarget = new ModelTarget();
  bordes: ModelBorde[];
  selectedBorde: ModelBorde = new ModelBorde();

  /*BOTON ENLACE*/
  gridList: ModelGridEdit[] = [];
  gridSelectedList: ModelGridEdit = new ModelGridEdit();

  constructor(
    @Inject(DOCUMENT) document: Document,
    private elementRef:ElementRef,
    private route: ActivatedRoute) 
  { 
    this.targets = [
      { TEXTO: 'Ninguno', CODIGO: 0, VALOR: '' },
      { TEXTO: 'Nuevo Tab', CODIGO: 1, VALOR: '_blank' },
      { TEXTO: 'Mismo Tab', CODIGO: 2, VALOR: '_self' }
    ];
    this.fuentes = [
      { TEXTO: 'ARIAL', VALOR: 'Arial, sans-serif'},
      { TEXTO: 'VERDANA', VALOR: 'Verdana, sans-serif'},
      { TEXTO: 'HELVETICA', VALOR: 'Helvetica, sans-serif'},
      { TEXTO: 'TAHOMA', VALOR: 'Tahoma, sans-serif'},
      { TEXTO: 'TIMES NEW ROMAN', VALOR: '\'Times New Roman\', Times, serif'},
      { TEXTO: 'GEORGIA', VALOR: 'Georgia, Times, serif'}
    ];
    this.variables = [
      { TEXTO: '[VARIABLE1]', CODIGO: 0 },
      { TEXTO: '[VARIABLE2]', CODIGO: 1 }
    ];
    this.targetsButton = [
      {TEXTO: 'Ninguno', CODIGO: 0, VALOR: ''},
      {TEXTO: 'Nuevo Tab', CODIGO: 1, VALOR: '_blank'},
      {TEXTO: 'Mismo Tab', CODIGO: 2, VALOR: '_self'}
    ];
    this.bordes = [
      { TEXTO: 'SOLIDO', VALOR: 'solid'},
      { TEXTO: 'PUNTEADO', VALOR: 'dotted'},
      { TEXTO: 'INTERLINEADO', VALOR: 'dashed'},
    ];
  }

  ngOnInit(): void {
    //inicio
    this.route.params.subscribe((params: Params) => this.id_plantilla = params['id']);
    console.log(this.id_plantilla);

    let plantillas = [{
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

    this.actual_plantilla = plantillas.find(x => x.ID == this.id_plantilla);
    let beforeContentAddGrids = document.getElementById("td-contenido");
    if(beforeContentAddGrids){
      beforeContentAddGrids.innerHTML = this.actual_plantilla.PLANTILLA_HTML_LOAD;
    }
    //fin

    this.gridList = [];
    let contentGrids = document.getElementById("td-contenido");
    if(contentGrids){
      let tdInitials = contentGrids.querySelectorAll("[id*='td-']");
      if(tdInitials){
        tdInitials.forEach(x => { 
          let newObjectGrid = new ModelGridEdit();
          newObjectGrid.ID = x.id;
          this.gridList.push(newObjectGrid);
        });
      }
    }
  }

  ngAfterViewInit():void{
    this.loadHTMLVisor();
    this.elementRef.nativeElement.querySelector('img').addEventListener('click', this.mostrarOpcionesPorTipo.bind(this));
    this.elementRef.nativeElement.querySelector('.textov').addEventListener('click', this.mostrarOpcionesPorTipo.bind(this));
    this.elementRef.nativeElement.querySelector('.botonv').addEventListener('click', this.mostrarOpcionesPorTipo.bind(this));
    /* this.elementRef.nativeElement.querySelector('.enlacev').addEventListener('click', this.mostrarOpcionesPorTipo.bind(this)); */
  }

  loadHTMLVisor(){
    let visor =  document.getElementById("td-contenido");
    console.log(visor);
    /* let actualTD: any = ""; */
    visor?.querySelectorAll("td").forEach( x => { 
      x.innerHTML = "<div class='hover-td hide' (click)=\"clickOpenToggle('" +x.getAttribute("id")+ "')\"><span class='select-marker'></span></div><div class='auxiliar'></div>"; 
      /* actualTD = x.getAttribute("id"); */
      x.querySelector(".hover-td")?.addEventListener("click", this.clickOpenToggle.bind(this, x.getAttribute("id") || "", false));
    });
  }

  clickDeleteElement(){
    let element_selected = document.getElementById(this.id_element_selected);
    if(element_selected){
      let nodeParent = this.getNodeParentDiv(element_selected);
      let nodeRoot = nodeParent.parentElement;
      if(element_selected != nodeParent){
        nodeParent.remove();
      }else{
        if(element_selected.tagName == "TD"){
          let parent_tr = element_selected.parentElement;
          if(parent_tr && parent_tr.tagName == "TR"){
            if(parent_tr.childNodes.length == 1){
              let parent_table = parent_tr.parentElement;
              if(parent_table){
                if(parent_table.tagName == "TABLE"){
                  let parent_of_table = parent_table.parentElement;
                  if(parent_of_table){
                    nodeRoot = parent_of_table;
                  }
                }
                parent_table.remove();
              }
            }
            else{
              element_selected.remove();
            }
          }
        }
      }
      if(nodeRoot && nodeRoot.tagName == "TD" && nodeRoot.childNodes.length == 1){
        let new_content_texto = document.createElement("div");
        new_content_texto.setAttribute("class","auxiliar");
        nodeRoot.append(new_content_texto);
      }
      element_selected.remove();
    }
    this.clickCloseToggle();
  }

  clickOpenToggle(id: string) {
    
    this.wrapper?.nativeElement.classList.add('sidebar-inactive-l');
    this.display_menu = false;
    
    if(id.length > 3 && id.substring(0,2)){
      this.display_delete = false;
      this.display_estructuras = true;
    }
    else{
      this.display_delete = true;
      this.display_estructuras = false;
    }
    
    this.id_element_selected = id;

    console.log("id seleccionado: " + id);
    
    document.querySelectorAll(".border-selected").forEach(x=> {
      x.classList.add("border-unselected");
      x.classList.remove("border-selected");
    });
    let element_selected = document.getElementById(id);
    
    if(element_selected){
      element_selected.classList.remove("border-unselected");
      element_selected.classList.add("border-selected");
    }
      
    document.querySelectorAll(".panel-diseno").forEach(x => {
      x.classList.remove("show-animation");
      x.classList.add("hide-animation");
    });

    document.getElementById("p-esquema")?.classList.remove("hide-animation");
    document.getElementById("p-esquema")?.classList.add("show-animation");

    let gridActual = this.gridList.find(x => x.ID == id);
    this.gridSelectedList = gridActual != undefined ? gridActual : new ModelGridEdit();
  }

  clickCloseToggle(){
    this.wrapper?.nativeElement.classList.remove('sidebar-inactive-l');
    this.display_menu = true;
  }

  mostrarOpcionesPorTipo(id:string, tipo: string){
    console.log("Mostrar opciones por Id: " + id + ", Tipo:" + tipo);

    this.wrapper?.nativeElement.classList.add('sidebar-inactive-l');
    this.display_menu = false;
    this.display_delete = true;

    document.querySelectorAll(".border-selected").forEach(x=> {
      x.classList.add("border-unselected");
      x.classList.remove("border-selected");
    });

    this.id_element_selected = id;

    let element_selected = document.getElementById(id);
    
    if(element_selected){
      let parent = element_selected.parentElement;  
      if(parent){
        if(parent.tagName == "DIV"){
          parent.classList.remove("border-unselected");
          parent.classList.add("border-selected");
        }
        else{
          if(parent.tagName == "A"){
            let parent_2 = parent.parentElement;
            if(parent_2){
              parent_2.classList.remove("border-unselected");
              parent_2.classList.add("border-selected");
            }
          }
        }
      }
    }
    
    document.querySelectorAll(".panel-diseno").forEach(x => {
      x.classList.remove("show-animation");
      x.classList.add("hide-animation");
    });
    
    switch (tipo) {
      case 'img':
        document.getElementById("p-imagen")?.classList.remove("hide-animation");
        document.getElementById("p-imagen")?.classList.add("show-animation");
        
        let imgActual = this.imgList.find(x => x.ID == id);
        this.imgSelectedList = imgActual != undefined ? imgActual : new ModelImgEdit();
        break;
      case 'textov':
        document.getElementById("p-texto")?.classList.remove("hide-animation");
        document.getElementById("p-texto")?.classList.add("show-animation");

        let textoActual = this.textoList.find(x => x.ID == id);
        this.textoSelectedList = textoActual != undefined ? textoActual : new ModelTextoEdit();
        break;
      case 'botonv':
        document.getElementById("p-boton")?.classList.remove("hide-animation");
        document.getElementById("p-boton")?.classList.add("show-animation");

        let botonActual = this.botonList.find(x => x.ID == id);
        this.botonSelectedList = botonActual != undefined ? botonActual : new ModelBotonEdit();
        break;
      /* case 'enlacev':
        document.getElementById("p-enlace")?.classList.remove("hide-animation");
        document.getElementById("p-enlace")?.classList.add("show-animation");

        let enlaceActual = this.enlaceList.find(x => x.ID == id);
        this.enlaceSelectedList = enlaceActual != undefined ? enlaceActual : new ModelEnlaceEdit();
        break; */
      default:
        this.clickCloseToggle();
        break;
    }
  }

  getSelectedAndRemoveDiv(): any{
      let element_selected = document.getElementById(this.id_element_selected);
      console.log("getSelectedAndRemoveDiv: ", element_selected);
      if(element_selected){
        let div_inner_selected = element_selected.querySelector(":scope > .auxiliar");
        if (div_inner_selected){
          div_inner_selected.remove();
        }
      }

      return element_selected;
  }

  addTable(option:number){
    let element_selected = this.getSelectedAndRemoveDiv();
    console.log(element_selected);
    if(element_selected){
      let new_table =  document.createElement("table");
      let new_id_table = this.getNewIdForElement();
      new_table.setAttribute("id",new_id_table);
      new_table.setAttribute("border","0");
      new_table.setAttribute("cellpadding","0");
      new_table.setAttribute("cellspacing","0");
      new_table.setAttribute("width","100%");
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
              let new_id_td_1_1 = this.getNewIdForElement();
              new_td_1_1.setAttribute("id",new_id_td_1_1);
              new_td_1_1.setAttribute("align","center");
              new_td_1_1.setAttribute("valign","center");
              new_td_1_1.setAttribute("width","100%");
              new_td_1_1.setAttribute("style","position:relative; background-color:#FFFFFF;");
              new_td_1_1.classList.add("td-child");
              new_td_1_1.classList.add("border-unselected");
              actual_tr.appendChild(new_td_1_1);
              break;
            case 2:
              let new_td_2_1 = document.createElement("td");
              let new_id_td_2_1 = this.getNewIdForElement();
              new_td_2_1.setAttribute("id",new_id_td_2_1);
              new_td_2_1.setAttribute("align","center");
              new_td_2_1.setAttribute("valign","center");
              new_td_2_1.setAttribute("width","50%");
              new_td_2_1.setAttribute("style","position:relative; background-color:#FFFFFF;");
              new_td_2_1.classList.add("td-child");
              new_td_2_1.classList.add("border-unselected");
              actual_tr.appendChild(new_td_2_1);

              let new_td_2_2 = document.createElement("td");
              let new_id_td_2_2 = this.getNewIdForElement();
              new_td_2_2.setAttribute("id",new_id_td_2_2);
              new_td_2_2.setAttribute("align","center");
              new_td_2_2.setAttribute("valign","center");
              new_td_2_2.setAttribute("width","50%");
              new_td_2_2.setAttribute("style","position:relative; background-color:#FFFFFF;");
              new_td_2_2.classList.add("td-child");
              new_td_2_2.classList.add("border-unselected");
              actual_tr.appendChild(new_td_2_2);
              break;
            case 3:
              let new_td_3_1 = document.createElement("td");
              let new_id_td_3_1 = this.getNewIdForElement();
              new_td_3_1.setAttribute("id",new_id_td_3_1);
              new_td_3_1.setAttribute("align","center");
              new_td_3_1.setAttribute("valign","center");
              new_td_3_1.setAttribute("width","33.33%");
              new_td_3_1.setAttribute("style","position:relative; background-color:#FFFFFF;");
              new_td_3_1.classList.add("td-child");
              new_td_3_1.classList.add("border-unselected");
              actual_tr.appendChild(new_td_3_1);

              let new_td_3_2 = document.createElement("td");
              let new_id_td_3_2 = this.getNewIdForElement();
              new_td_3_2.setAttribute("id",new_id_td_3_2);
              new_td_3_2.setAttribute("align","center");
              new_td_3_2.setAttribute("valign","center");
              new_td_3_2.setAttribute("width","33.33%");
              new_td_3_2.setAttribute("style","position:relative; background-color:#FFFFFF;");
              new_td_3_2.classList.add("td-child");
              new_td_3_2.classList.add("border-unselected");
              actual_tr.appendChild(new_td_3_2);

              let new_td_3_3 = document.createElement("td");
              let new_id_td_3_3 = this.getNewIdForElement();
              new_td_3_3.setAttribute("id",new_id_td_3_3);
              new_td_3_3.setAttribute("align","center");
              new_td_3_3.setAttribute("valign","center");
              new_td_3_3.setAttribute("width","33.33%");
              new_td_3_3.setAttribute("style","position:relative; background-color:#FFFFFF;");
              new_td_3_3.classList.add("td-child");
              new_td_3_3.classList.add("border-unselected");
              actual_tr.appendChild(new_td_3_3);
              break;
            case 4:
              let new_td_4_1 = document.createElement("td");
              let new_id_td_4_1 = this.getNewIdForElement();
              new_td_4_1.setAttribute("id",new_id_td_4_1);
              new_td_4_1.setAttribute("align","center");
              new_td_4_1.setAttribute("valign","center");
              new_td_4_1.setAttribute("width","33.33%");
              new_td_4_1.setAttribute("style","position:relative; background-color:#FFFFFF;");
              new_td_4_1.classList.add("td-child");
              new_td_4_1.classList.add("border-unselected");
              actual_tr.appendChild(new_td_4_1);

              let new_td_4_2 = document.createElement("td");
              let new_id_td_4_2 = this.getNewIdForElement();
              new_td_4_2.setAttribute("id",new_id_td_4_2);
              new_td_4_2.setAttribute("align","center");
              new_td_4_2.setAttribute("valign","center");
              new_td_4_2.setAttribute("width","66.66%");
              new_td_4_2.setAttribute("style","position:relative; background-color:#FFFFFF;");
              new_td_4_2.classList.add("td-child");
              new_td_4_2.classList.add("border-unselected");
              actual_tr.appendChild(new_td_4_2);
              break;
            case 5:
              let new_td_5_1 = document.createElement("td");
              let new_id_td_5_1 = this.getNewIdForElement();
              new_td_5_1.setAttribute("id",new_id_td_5_1);
              new_td_5_1.setAttribute("align","center");
              new_td_5_1.setAttribute("valign","center");
              new_td_5_1.setAttribute("width","66.66%");
              new_td_5_1.setAttribute("style","position:relative; background-color:#FFFFFF;");
              new_td_5_1.classList.add("td-child");
              new_td_5_1.classList.add("border-unselected");
              actual_tr.appendChild(new_td_5_1);

              let new_td_5_2 = document.createElement("td");
              let new_id_td_5_2 = this.getNewIdForElement();
              new_td_5_2.setAttribute("id",new_id_td_5_2);
              new_td_5_2.setAttribute("align","center");
              new_td_5_2.setAttribute("valign","center");
              new_td_5_2.setAttribute("width","33.33%");
              new_td_5_2.setAttribute("style","position:relative; background-color:#FFFFFF;");
              new_td_5_2.classList.add("td-child");
              new_td_5_2.classList.add("border-unselected");
              actual_tr.appendChild(new_td_5_2);
              break;
            default:
              break;
          }
          let new_tds = actual_tr.querySelectorAll("td");
          if(new_tds){
            new_tds.forEach(x => {
              x.innerHTML = "<div class='hover-td-bottom hide' (click)=\"clickOpenToggle('" +x.getAttribute("id")+ "')\"><span class='select-multiple-marker'></span></div><div class='auxiliar'></div>"; 
              /* actualTD = x.getAttribute("id"); */
              x.querySelector(".hover-td-bottom")?.addEventListener("click", this.clickOpenToggle.bind(this, x.getAttribute("id") || "", false));
            });
          }
        }
      }
    }
  }

  addImagen(){
    let element_selected = this.getSelectedAndRemoveDiv();
    if(element_selected){
      let new_content_img = document.createElement("div");
      let new_id_div = this.getNewIdForElement();
      /* this.removeFlagLastCreated(); */
      new_content_img.setAttribute("class","border-unselected");
      new_content_img.setAttribute("id",new_id_div);
      element_selected.appendChild(new_content_img);
      let new_div = document.getElementById(new_id_div);
      if(new_div){
        let new_img =  document.createElement("img");
        //new_img.setAttribute("src","https://repositorio.derrama.org.pe/logderrama.png");
        let setter = new ModelImgEdit();
        new_img.setAttribute("src",setter.SRC);
        let new_id = this.getNewIdForElement();
        /* new_content_img.classList.remove("last-created"); */
        /* this.removeFlagsBeforeLastCreated(); */
        /* this.removeFlagLastCreated(); */
        /* new_img.setAttribute("class","last-created"); */
        new_img.setAttribute("id", new_id);
        //new_img.setAttribute("style","margin: 0; border: 0; padding: 0; display: block; max-width: 100%; height: auto;");
        new_img.style["margin"] = setter.MARGIN.toString();
        new_img.style["border"] = setter.BORDER.toString();
        new_img.style["padding"] = setter.PADDING.toString();
        new_img.style["display"] = setter.DISPLAY;
        new_img.style["maxWidth"] = setter.MAX_WIDTH.toString() + setter.MAX_WIDTH_UNIT;
        new_img.style["width"] = setter.WIDTH.toString() + setter.WIDTH_UNIT;
        new_img.style["height"] = setter.HEIGHT_AUTO;
        
        new_div.appendChild(new_img);
        document.getElementById(new_id)?.addEventListener("click", this.mostrarOpcionesPorTipo.bind(this, new_id, "img", false));
        
        let new_img_model = new ModelImgEdit();
        new_img_model.ID = new_id;
        this.imgList.push(new_img_model);
      }
    }
  }

  addTexto(){
    let element_selected = this.getSelectedAndRemoveDiv();

    if(element_selected){
      let new_content_texto = document.createElement("div");
      let new_id_div = this.getNewIdForElement();
      /* this.removeFlagLastCreated(); */
      new_content_texto.setAttribute("class","border-unselected");
      new_content_texto.setAttribute("id",new_id_div);
      element_selected.appendChild(new_content_texto);
      let new_div = document.getElementById(new_id_div);
      if(new_div){
        let new_span = document.createElement("span");
        let new_id = this.getNewIdForElement();
        /* this.removeFlagLastCreated(); */
        new_span.setAttribute("class","textov");
        new_span.setAttribute("id",new_id);
        new_span.textContent = "Ingrese un nuevo texto AQUI";
        let setter = new ModelTextoEdit();
        new_span.style["margin"] = setter.MARGIN.toString();
        new_span.style["border"] = setter.BORDER.toString();
        new_span.style["padding"] = setter.PADDING.toString();
        new_span.style["display"] = setter.DISPLAY;
        new_span.style["maxWidth"] = setter.MAX_WIDTH.toString() + setter.MAX_WIDTH_UNIT;
        new_span.style["wordBreak"] = setter.WORD_BREAK;
        new_span.style["color"] = setter.COLOR;
        new_span.style["fontFamily"] = setter.FUENTE.VALOR;
        new_span.style["fontSize"] = setter.TAMANO.toString() + setter.TAMANO_UNIT;
        new_span.style["lineHeight"] = setter.LINE_HEIGHT.toString() + setter.LINE_HEIGHT_UNIT;
        new_span.style["minHeight"] = setter.MIN_HIGHT.toString() + setter.MIN_HIGHT_UNIT;
    
        new_div.appendChild(new_span);
        document.getElementById(new_id)?.addEventListener("click", this.mostrarOpcionesPorTipo.bind(this, new_id, "textov", false));
      
        let new_texto_model = new ModelTextoEdit();
        new_texto_model.ID = new_id;
        this.textoList.push(new_texto_model);
      }
    }
  }

  addBoton(){
    let element_selected = this.getSelectedAndRemoveDiv();

    if(element_selected){
      let setter = new ModelBotonEdit();
      let new_content_boton = document.createElement("div");
      let new_id_div = this.getNewIdForElement();
      /* this.removeFlagLastCreated(); */
      new_content_boton.setAttribute("class","border-unselected");
      new_content_boton.setAttribute("id",new_id_div);
      new_content_boton.style["padding"]= setter.PARENT_PADDING.toString() + setter.PARENT_PADDING_UNIT;
      
      element_selected.appendChild(new_content_boton);
      let new_div = document.getElementById(new_id_div);
      if(new_div){
        let new_button =  document.createElement("span");
        let new_id = this.getNewIdForElement();
        /* this.removeFlagLastCreated(); */
        new_button.setAttribute("class","botonv");
        new_button.setAttribute("id",new_id);
        new_button.textContent = "Mi Botón";
        new_button.style["margin"] = setter.MARGIN.toString();
        new_button.style["border"] = setter.BORDER.toString();
        new_button.style["padding"] = setter.PADDING.toString() + setter.PADDING_UNIT;
        new_button.style["display"] = setter.DISPLAY;
        new_button.style["maxWidth"] = setter.MAX_WIDTH.toString() + setter.MAX_WIDTH_UNIT;
        new_button.style["borderRadius"] = setter.BORDER_RADIUS.toString() + setter.BORDER_RADIUS_UNIT;
        new_button.style["fontFamily"] = setter.FONT.VALOR;
        new_button.style["fontSize"] = setter.FONT_SIZE.toString() + setter.FONT_SIZE_UNIT;
        new_button.style["lineHeight"] = setter.LINE_HEIGHT.toString() + setter.LINE_HEIGHT_UNIT;
        new_button.style["textAlign"] = setter.PARENT_TEXT_ALIGN;
        new_button.style["backgroundColor"] = setter.BACKGROUND_COLOR;
        new_button.style["width"] = setter.WIDTH_AUTO;
        new_button.style["wordBreak"] = setter.WORD_BREAK;
        new_button.style["color"] = setter.COLOR;

        new_div.appendChild(new_button);
        document.getElementById(new_id)?.addEventListener("click", this.mostrarOpcionesPorTipo.bind(this, new_id, "botonv", false));

        let new_boton_model = new ModelBotonEdit();
        new_boton_model.ID = new_id;
        this.botonList.push(new_boton_model);
      }
    }
  }

  /* addHipervinculo(){
    let element_selected = this.getSelectedAndRemoveDiv();

    if(element_selected){
      let new_content_texto = document.createElement("div");
      let new_id_div = this.getNewIdForElement();
      this.removeFlagLastCreated();
      new_content_texto.setAttribute("class","border-unselected last-created");
      new_content_texto.setAttribute("id",new_id_div);
      element_selected.appendChild(new_content_texto);
      let new_div = document.getElementById(new_id_div);
      if(new_div){
        let new_hiper =  document.createElement("a");
        let new_id = this.getNewIdForElement();
        this.removeFlagLastCreated();
        new_hiper.setAttribute("class","enlacev last-created");
        new_hiper.setAttribute("id",new_id);
        new_hiper.textContent = "Ingrese un nuevo texto";
        let setter = new ModelEnlaceEdit();
        new_hiper.style["margin"] = setter.MARGIN.toString();
        new_hiper.style["border"] = setter.BORDER.toString();
        new_hiper.style["padding"] = setter.PADDING.toString();
        new_hiper.style["display"] = setter.DISPLAY;
        new_hiper.style["maxWidth"] = setter.MAX_WIDTH.toString() + setter.MAX_WIDTH_UNIT;
        new_hiper.style["wordBreak"] = setter.WORD_BREAK;
        new_hiper.style["color"] = setter.COLOR;
        new_hiper.style["fontFamily"] = setter.FUENTE.VALOR;
        new_hiper.style["fontSize"] = setter.TAMANO.toString() + setter.TAMANO_UNIT;
        new_hiper.style["lineHeight"] = setter.LINE_HEIGHT.toString() + setter.LINE_HEIGHT_UNIT;
        new_hiper.style["minHeight"] = setter.MIN_HIGHT.toString() + setter.MIN_HIGHT_UNIT;
        new_hiper.style["textDecoration"] = setter.TEXT_DECORATION;
        
        new_div.appendChild(new_hiper);
        document.getElementById(new_id)?.addEventListener("click", this.mostrarOpcionesPorTipo.bind(this, new_id, "enlacev", false));
        
        let new_enlace_model = new ModelEnlaceEdit();
        new_enlace_model.ID = new_id;
        this.enlaceList.push(new_enlace_model);
      }
    }

    
  } */

  /* removeFlagLastCreated(): void{
    let last_created = document.querySelectorAll(".last-created");
    if(last_created){
      last_created.forEach(x => {
        x.classList.add("before-last-created");
        x.classList.remove("last-created");
    });
    }
  } */

  /* replaceFlagNewLastCreated(): void{
    let before_last_created = document.querySelectorAll(".before-last-created");
    if(before_last_created){
      before_last_created.forEach(x => {
        x.classList.add("last-created");
        x.classList.remove("before-last-created");
    });
    }
  } */
/*
  removeDivFlagsBeforeLastCreated(): void{
    let before_last_created = document.querySelectorAll("div.before-last-created");
    if(before_last_created){
      before_last_created.forEach(x => {
        x.classList.remove("before-last-created");
    });
    }
  }
 */
  /* removeFlagsBeforeLastCreated(): void{
    let before_last_created_list =  document.querySelectorAll(".before-last-created");
    console.log("beforeLastCreated: ",before_last_created_list);
    if(before_last_created_list){
      before_last_created_list.forEach(x => {
        x.classList.remove("before-last-created");
      });
    }
  } */

  /* removeFlagsLastCreated(): void{
    let before_last_created = document.querySelectorAll(".last-created");
    if(before_last_created){
      before_last_created.forEach(x => {
        x.classList.remove("last-created");
    });
    }
  } */

  getNewIdForElement(): string {
    this.index += 1;
    return this.index.toString();
    /* let contenido = document.getElementById("td-contenido");
    if(contenido){
      let ultimo_creado = contenido.querySelector(".last-created");
      console.log(ultimo_creado);
      if(ultimo_creado){
        let id_ultimo_creado = ultimo_creado.getAttribute("id");
        if(id_ultimo_creado){
          return (parseInt(id_ultimo_creado) + 1) + "";
        }
      }
    }
    return "0"; */
    /* let result = "";

    switch (tipo) {
      case "img":
        result = tipo + (contenido?.querySelectorAll("img").length ? contenido?.querySelectorAll("img").length : 0);
        break;
      case "textov":
        result = tipo + (contenido?.querySelectorAll("span.textov").length ? contenido?.querySelectorAll("span.textov").length : 0);
        break;
      case "botonv":
        result = tipo + (contenido?.querySelectorAll("span.botonv").length ? contenido?.querySelectorAll("span.botonv").length : 0);
        break;
      case "a":
        result = tipo + (contenido?.querySelectorAll("a").length ? contenido?.querySelectorAll("a").length : 0);
        break;
      default:
        break;
    }
    return result; */
  }

  //METODOS EDICION IMAGEN
  switchWidthImageChange(e:any): void{
    this.imgSelectedList.VISIBLE_AUTO_WIDTH = e.checked;
    if(!this.imgSelectedList.VISIBLE_AUTO_WIDTH){
      let setter = new ModelImgEdit();
      this.imgSelectedList.WIDTH = setter.WIDTH;
      
      let act_img = document.getElementById(this.id_element_selected);
      if(act_img){
        act_img.style["width"] = this.imgSelectedList.WIDTH.toString() + this.imgSelectedList.WIDTH_UNIT;
      }
    }
    
  }

  sliderWidthImageChange(e:any): void{
    this.imgSelectedList.WIDTH = e.value;
    
    let act_img = document.getElementById(this.id_element_selected);
    if(act_img){
      act_img.style["width"] = this.imgSelectedList.WIDTH.toString() + this.imgSelectedList.WIDTH_UNIT;
    }
  }

  alignClick(align: string): void{
    let act_img = document.getElementById(this.id_element_selected);
    let parent = act_img?.parentElement;
    if(parent){
      console.log("entre");
      this.imgSelectedList.PARENT_TEXT_ALIGN = align;
      parent.style.cssText += "text-align: " + align + "; text-align: -webkit-" + align + "; text-align: -moz-" + align + ";"; 
      
      this.imgSelectedList.PARENT_ALIGN_CENTER = false;
      this.imgSelectedList.PARENT_ALIGN_LEFT = false;
      this.imgSelectedList.PARENT_ALIGN_RIGHT = false;
      this.imgSelectedList.PARENT_ALIGN_JUSTIFY = false;
      
      switch (align) {
        case "center":
          this.imgSelectedList.PARENT_ALIGN_CENTER = true;
          break;
        case "left":
          this.imgSelectedList.PARENT_ALIGN_LEFT = true;
          break;
        case "right":
          this.imgSelectedList.PARENT_ALIGN_RIGHT = true;
          break;
        default:
          this.imgSelectedList.PARENT_ALIGN_JUSTIFY = true;
          break;
      }
    }
  }

  urlKeyPress(){
    console.log("urlKeyPress. id_element_selected: ", this.id_element_selected);
    let act_img = document.getElementById(this.id_element_selected);
    console.log("urlKeyPress. act_img: ", act_img);
    let parent = act_img?.parentElement;
    console.log("urlKeyPress. parent: ", parent);
    if(act_img && parent){
      if(parent.tagName != "A"){
        let link_image =  document.createElement("a");
        let new_id = this.getNewIdForElement();
        console.log("urlKeyPress. new_id: ", new_id);
        /* this.removeFlagLastCreated(); */
        /* link_image.setAttribute("class","last-created"); */
        link_image.setAttribute("id", new_id);
        link_image.style["margin"] = "0";
        link_image.style["border"] = "0";
        link_image.style["padding"] = "0";
        /* link_image.style["display"] = "block"; */
        parent.appendChild(link_image);
        let new_link_image = document.getElementById(new_id);
        console.log("urlKeyPress. new_link_image: ", new_link_image);
        if(new_link_image){
          new_link_image.appendChild(act_img);
        }
      }
    }
  }

  targetUrlChange(){
    let act_img = document.getElementById(this.id_element_selected);
    let parent = act_img?.parentElement;
    if(act_img && parent){
      console.log(parent.tagName);
      if(parent.tagName == "A"){
        /* this.imgSelectedList.TARGET_URL = this.selectedTarget.CODIGO; */
        parent.setAttribute("target", this.imgSelectedList.TARGET_URL.VALOR);
      }
    }
  }

  switchPaddingImageChange(e:any): void{
    this.imgSelectedList.VISIBLE_PADDING_DETAIL = e.checked;
    let setter = new ModelImgEdit();
    this.imgSelectedList.PADDING = setter.PADDING;
    this.imgSelectedList.PADDING_TOP = setter.PADDING_TOP;
    this.imgSelectedList.PADDING_LEFT = setter.PADDING_LEFT;
    this.imgSelectedList.PADDING_RIGHT = setter.PADDING_RIGHT;
    this.imgSelectedList.PADDING_BOTTOM = setter.PADDING_BOTTOM;
    if(!this.imgSelectedList.VISIBLE_PADDING_DETAIL){
      let act_img = document.getElementById(this.id_element_selected);
      if(act_img){
        act_img.style["paddingTop"] = "";
        act_img.style["paddingLeft"] = "";
        act_img.style["paddingRight"] = "";
        act_img.style["paddingBottom"] = "";
        act_img.style["padding"] = this.imgSelectedList.PADDING.toString() + this.imgSelectedList.PADDING_UNIT;
      }
    }
    else{
      let act_img = document.getElementById(this.id_element_selected);
      if(act_img){
        act_img.style["padding"] = "";
        act_img.style["paddingTop"] = this.imgSelectedList.PADDING_TOP.toString() + this.imgSelectedList.PADDING_UNIT;
        act_img.style["paddingLeft"] = this.imgSelectedList.PADDING_LEFT.toString() + this.imgSelectedList.PADDING_UNIT;
        act_img.style["paddingRight"] = this.imgSelectedList.PADDING_RIGHT.toString() + this.imgSelectedList.PADDING_UNIT;
        act_img.style["paddingBottom"] = this.imgSelectedList.PADDING_BOTTOM.toString() + this.imgSelectedList.PADDING_UNIT;
      }
    }
  }

  onPaddingInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.imgSelectedList.PADDING = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.imgSelectedList.PADDING = e.value;
      }
    }else{
      this.imgSelectedList.PADDING = 0;
    }
    let act_img = document.getElementById(this.id_element_selected);
    if(act_img){
      act_img.style["padding"] = this.imgSelectedList.PADDING.toString() + this.imgSelectedList.PADDING_UNIT;
    }
  }

  onPaddingTopInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.imgSelectedList.PADDING_TOP = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.imgSelectedList.PADDING_TOP = e.value;
      }
    }else{
      this.imgSelectedList.PADDING_TOP = 0;
    }
    let act_img = document.getElementById(this.id_element_selected);
    if(act_img){
      act_img.style["paddingTop"] = this.imgSelectedList.PADDING_TOP.toString() + this.imgSelectedList.PADDING_UNIT;
    }
  }

  onPaddingLeftInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.imgSelectedList.PADDING_LEFT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.imgSelectedList.PADDING_LEFT = e.value;
      }
    }else{
      this.imgSelectedList.PADDING_LEFT = 0;
    }
    let act_img = document.getElementById(this.id_element_selected);
    if(act_img){
      act_img.style["paddingLeft"] = this.imgSelectedList.PADDING_LEFT.toString() + this.imgSelectedList.PADDING_UNIT;
    }
  }

  onPaddingRightInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.imgSelectedList.PADDING_RIGHT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.imgSelectedList.PADDING_RIGHT = e.value;
      }
    }else{
      this.imgSelectedList.PADDING_RIGHT = 0;
    }
    let act_img = document.getElementById(this.id_element_selected);
    if(act_img){
      act_img.style["paddingRight"] = this.imgSelectedList.PADDING_RIGHT.toString() + this.imgSelectedList.PADDING_UNIT;
    }
  }

  onPaddingBottomInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.imgSelectedList.PADDING_BOTTOM = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.imgSelectedList.PADDING_BOTTOM = e.value;
      }
    }else{
      this.imgSelectedList.PADDING_BOTTOM = 0;
    }
    let act_img = document.getElementById(this.id_element_selected);
    if(act_img){
      act_img.style["paddingBottom"] = this.imgSelectedList.PADDING_BOTTOM + this.imgSelectedList.PADDING_UNIT;
    }
  }

  //METODOS EDICION TEXTO
  onFontSelectedChange(): void{
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["fontFamily"] = this.textoSelectedList.FUENTE.VALOR;
    }
  }

  onFontSizeInput(e:any): void{
    if(e.value != null){
      if(e.value > this.MAX_VALUE_99){
        let caracteres_validos = e.value.toString().substring(0,this.MAX_LENGHT_2);
        this.textoSelectedList.TAMANO = parseInt(caracteres_validos);
        this.textoSelectedList.LINE_HEIGHT = parseInt(caracteres_validos);
      }else{
        this.textoSelectedList.TAMANO = e.value;
        this.textoSelectedList.LINE_HEIGHT = e.value;
      }
      let act_texto = document.getElementById(this.id_element_selected);
      if(act_texto){
        act_texto.style["fontSize"] = this.textoSelectedList.TAMANO.toString() + this.textoSelectedList.TAMANO_UNIT;
        act_texto.style["lineHeight"] = this.textoSelectedList.LINE_HEIGHT.toString() + this.textoSelectedList.LINE_HEIGHT_UNIT;
      }
    }
  }

  onFontSizeModelChange(value:any){
    if(value == null || value < this.MIN_VALUE_8){
      this.textoSelectedList.TAMANO = this.MIN_VALUE_8;
      this.textoSelectedList.LINE_HEIGHT = this.MIN_VALUE_8;
    }
    else{
      this.textoSelectedList.TAMANO = value;
      this.textoSelectedList.LINE_HEIGHT = value;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["fontSize"] = this.textoSelectedList.TAMANO.toString() + this.textoSelectedList.TAMANO_UNIT;
      act_texto.style["lineHeight"] = this.textoSelectedList.LINE_HEIGHT.toString() + this.textoSelectedList.LINE_HEIGHT_UNIT;
    }
  }

  /* onFontSizeBlur(e:any): void{
    if(e.target.value == null || e.target.value === '' || e.target.value == undefined){
      this.textoSelectedList.TAMANO = this.MIN_VALUE_8;
      this.textoSelectedList.LINE_HEIGHT = this.MIN_VALUE_8;
      let act_texto = document.getElementById(this.id_element_selected);
      if(act_texto){
        act_texto.style["fontSize"] = this.textoSelectedList.TAMANO.toString() + this.textoSelectedList.TAMANO_UNIT;
        act_texto.style["lineHeight"] = this.textoSelectedList.LINE_HEIGHT.toString() + this.textoSelectedList.LINE_HEIGHT_UNIT;
      }
    }
  } */

  onColorChange(e:any): void{
    if(e.value != null){
      this.textoSelectedList.COLOR = e.value;
    }else{
      this.textoSelectedList.COLOR = "#fff";
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["color"] = this.textoSelectedList.COLOR;
    }
  }

  alignTextoClick(align: string): void{
    let act_texto = document.getElementById(this.id_element_selected);
    let parent = act_texto?.parentElement;
    if(parent){
      this.textoSelectedList.PARENT_TEXT_ALIGN = align;
      parent.style.cssText += "text-align: " + align + "; text-align: -webkit-" + align + "; text-align: -moz-" + align + ";"; 
    
      this.textoSelectedList.PARENT_ALIGN_CENTER = false;
      this.textoSelectedList.PARENT_ALIGN_LEFT = false;
      this.textoSelectedList.PARENT_ALIGN_RIGHT = false;
      this.textoSelectedList.PARENT_ALIGN_JUSTIFY = false;
      
      switch (align) {
        case "center":
          this.textoSelectedList.PARENT_ALIGN_CENTER = true;
          break;
        case "left":
          this.textoSelectedList.PARENT_ALIGN_LEFT = true;
          break;
        case "right":
          this.textoSelectedList.PARENT_ALIGN_RIGHT = true;
          break;
        default:
          this.textoSelectedList.PARENT_ALIGN_JUSTIFY = true;
          break;
      }
    }
  }

  onTextoChanged(e:any){
    console.log(e.htmlValue);
    if(e.htmlValue != null){
      this.textoSelectedList.TEXTO = e.htmlValue;
    }else{
      this.textoSelectedList.TEXTO = "";
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.innerHTML = this.textoSelectedList.TEXTO;
    }
  }

  switchPaddingTextoChange(e:any): void{
    this.textoSelectedList.VISIBLE_PADDING_DETAIL = e.checked;
    let setter = new ModelTextoEdit();
    this.textoSelectedList.PADDING = setter.PADDING;
    this.textoSelectedList.PADDING_TOP = setter.PADDING_TOP;
    this.textoSelectedList.PADDING_LEFT = setter.PADDING_LEFT;
    this.textoSelectedList.PADDING_RIGHT = setter.PADDING_RIGHT;
    this.textoSelectedList.PADDING_BOTTOM = setter.PADDING_BOTTOM;
    if(!this.textoSelectedList.VISIBLE_PADDING_DETAIL){
      let act_texto = document.getElementById(this.id_element_selected);
      if(act_texto){
        act_texto.style["paddingTop"] = "";
        act_texto.style["paddingLeft"] = "";
        act_texto.style["paddingRight"] = "";
        act_texto.style["paddingBottom"] = "";
        act_texto.style["padding"] = this.textoSelectedList.PADDING.toString() + this.textoSelectedList.PADDING_UNIT;
      }
    }
    else{
      let act_texto = document.getElementById(this.id_element_selected);
      if(act_texto){
        act_texto.style["padding"] = "";
        act_texto.style["paddingTop"] = this.textoSelectedList.PADDING_TOP.toString() + this.textoSelectedList.PADDING_UNIT;
        act_texto.style["paddingLeft"] = this.textoSelectedList.PADDING_LEFT.toString() + this.textoSelectedList.PADDING_UNIT;
        act_texto.style["paddingRight"] = this.textoSelectedList.PADDING_RIGHT.toString() + this.textoSelectedList.PADDING_UNIT;
        act_texto.style["paddingBottom"] = this.textoSelectedList.PADDING_BOTTOM.toString() + this.textoSelectedList.PADDING_UNIT;
      }
    }
  }

  onPaddingTextoInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.textoSelectedList.PADDING = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.textoSelectedList.PADDING = e.value;
      }
    }else{
      this.textoSelectedList.PADDING = 0;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["padding"] = this.textoSelectedList.PADDING.toString() + this.textoSelectedList.PADDING_UNIT;
    }
  }

  onPaddingTopTextoInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.textoSelectedList.PADDING_TOP = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.textoSelectedList.PADDING_TOP = e.value;
      }
    }else{
      this.textoSelectedList.PADDING_TOP = 0;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["paddingTop"] = this.textoSelectedList.PADDING_TOP.toString() + this.textoSelectedList.PADDING_UNIT;
    }
  }

  onPaddingLeftTextoInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.textoSelectedList.PADDING_LEFT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.textoSelectedList.PADDING_LEFT = e.value;
      }
    }else{
      this.textoSelectedList.PADDING_LEFT = 0;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["paddingLeft"] = this.textoSelectedList.PADDING_LEFT.toString() + this.textoSelectedList.PADDING_UNIT;
    }
  }

  onPaddingRightTextoInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.textoSelectedList.PADDING_RIGHT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.textoSelectedList.PADDING_RIGHT = e.value;
      }
    }else{
      this.textoSelectedList.PADDING_RIGHT = 0;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["paddingRight"] = this.textoSelectedList.PADDING_RIGHT.toString() + this.textoSelectedList.PADDING_UNIT;
    }
  }

  onPaddingBottomTextoInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.textoSelectedList.PADDING_BOTTOM = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.textoSelectedList.PADDING_BOTTOM = e.value;
      }
    }else{
      this.textoSelectedList.PADDING_BOTTOM = 0;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["paddingBottom"] = this.textoSelectedList.PADDING_BOTTOM.toString() + this.textoSelectedList.PADDING_UNIT;
    }
  }

  addVaribleClick(): void{
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      if(act_texto.hasChildNodes()){
        let new_span = document.createElement("span");
        act_texto.classList.add("variable");
        new_span.innerText = this.selectedVariable.TEXTO;
        console.log(act_texto.lastElementChild?.tagName);
        let lastChild = act_texto.lastElementChild;
        if(lastChild){
          if(lastChild.tagName == "P"){
            if(lastChild.hasChildNodes() && lastChild.lastElementChild?.tagName == "BR"){
              lastChild.lastElementChild.remove();
              lastChild.appendChild(new_span);
            }
            else{
              act_texto.lastChild?.appendChild(new_span);
            }
          }
        }else{
          act_texto.innerHTML = "";
          act_texto.appendChild(new_span);
        }
      }
      this.textoSelectedList.TEXTO = act_texto.innerHTML;
      //this.textoSelectedList.TEXTO += "<span class='variable'>" + this.selectedVariable.TEXTO + "</span>";
    }
  }

  //METODOS EDICION BOTON

  onButtonFontSelectedChange(): void{
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["fontFamily"] = this.botonSelectedList.FONT.VALOR;
    }
  }

  urlButtonKeyPress(){
    let act_boton = document.getElementById(this.id_element_selected);
    let parent = act_boton?.parentElement;
    if(act_boton && parent){
      if(parent.tagName != "A"){
        let link_button =  document.createElement("a");
        let new_id = this.getNewIdForElement();
        /* this.removeFlagLastCreated(); */
        link_button.setAttribute("class","last-created");
        link_button.setAttribute("id", new_id);
        link_button.style["margin"] = "0";
        link_button.style["border"] = "0";
        link_button.style["padding"] = "0";
        parent.appendChild(link_button);
        let new_link_button = document.getElementById(new_id);
        if(new_link_button){
          new_link_button.appendChild(act_boton);
        }
      }
    }
  }

  targetUrlButtonChange(){
    let act_boton = document.getElementById(this.id_element_selected);
    let parent = act_boton?.parentElement;
    if(act_boton && parent){
      if(parent.tagName == "A"){
        /* this.botonSelectedList.TARGET_URL = this.selectedTarget; */
        console.log(this.botonSelectedList.TARGET_URL);
        parent.setAttribute("target", this.botonSelectedList.TARGET_URL.VALOR);
      }
    }
  }

  onTextoButtonChanged(e:any){
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.innerHTML = this.botonSelectedList.TEXTO;
    }
  }

  onFontSizeButtonInput(e:any): void{
    if(e.value != null){
      if(e.value > this.MAX_VALUE_99){
        let caracteres_validos = e.value.toString().substring(0,this.MAX_LENGHT_2);
        this.botonSelectedList.FONT_SIZE = parseInt(caracteres_validos);
        this.botonSelectedList.LINE_HEIGHT = parseInt(caracteres_validos);
      }else{
        this.botonSelectedList.FONT_SIZE = e.value;
        this.botonSelectedList.LINE_HEIGHT = e.value;
      }
      let act_texto = document.getElementById(this.id_element_selected);
      if(act_texto){
        act_texto.style["fontSize"] = this.botonSelectedList.FONT_SIZE.toString() + this.botonSelectedList.FONT_SIZE_UNIT;
        act_texto.style["lineHeight"] = this.botonSelectedList.LINE_HEIGHT.toString() + this.botonSelectedList.LINE_HEIGHT_UNIT;
      }
    }
  }

  onFontSizeButtonModelChange(value:any){
    if(value == null || value < this.MIN_VALUE_8){
      this.botonSelectedList.FONT_SIZE = this.MIN_VALUE_8;
      this.botonSelectedList.LINE_HEIGHT = this.MIN_VALUE_8;
    }
    else{
      this.botonSelectedList.FONT_SIZE = value;
      this.botonSelectedList.LINE_HEIGHT = value;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["fontSize"] = this.botonSelectedList.FONT_SIZE.toString() + this.botonSelectedList.FONT_SIZE_UNIT;
      act_texto.style["lineHeight"] = this.botonSelectedList.LINE_HEIGHT.toString() + this.botonSelectedList.LINE_HEIGHT_UNIT;
    }
  }

  onColorTextButtonChange(e:any): void{
    if(e.value != null){
      this.botonSelectedList.COLOR = e.value;
    }else{
      this.botonSelectedList.COLOR = "#FFFFFF";
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["color"] = this.botonSelectedList.COLOR;
    }
  }

  onColorBackgroundButtonChange(e:any): void{
    if(e.value != null){
      this.botonSelectedList.BACKGROUND_COLOR = e.value;
    }else{
      this.botonSelectedList.BACKGROUND_COLOR = "#3AAEE0";
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["backgroundColor"] = this.botonSelectedList.BACKGROUND_COLOR;
    }
  }

  switchWidthButtonChange(e:any): void{
    this.botonSelectedList.VISIBLE_AUTO_WIDTH = e.checked;
    if(!this.botonSelectedList.VISIBLE_AUTO_WIDTH){
      console.log("aqui");
      let act_img = document.getElementById(this.id_element_selected);
      if(act_img){
        act_img.style["width"] = this.botonSelectedList.WIDTH_AUTO;
      }
    }
    else{
      let setter = new ModelBotonEdit();
      this.botonSelectedList.WIDTH = setter.WIDTH;
      let act_img = document.getElementById(this.id_element_selected);
      if(act_img){
        act_img.style["width"] = this.botonSelectedList.WIDTH.toString() + this.botonSelectedList.WIDTH_UNIT;
      }
    }
    
  }

  sliderWidthButtonChange(e:any): void{
    this.botonSelectedList.WIDTH = e.value;
    
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["width"] = this.botonSelectedList.WIDTH.toString() + this.botonSelectedList.WIDTH_UNIT;
    }
  }

  alignTextoButtonClick(align: string): void{
    let act_boton = document.getElementById(this.id_element_selected);
    let parent = act_boton?.parentElement;
    if(parent){
      this.botonSelectedList.PARENT_TEXT_ALIGN = align;
      parent.style.cssText += "text-align: " + align + "; text-align: -webkit-" + align + "; text-align: -moz-" + align + ";"; 
    
      this.botonSelectedList.PARENT_ALIGN_CENTER = false;
      this.botonSelectedList.PARENT_ALIGN_LEFT = false;
      this.botonSelectedList.PARENT_ALIGN_RIGHT = false;
      this.botonSelectedList.PARENT_ALIGN_JUSTIFY = false;
      
      switch (align) {
        case "center":
          this.botonSelectedList.PARENT_ALIGN_CENTER = true;
          break;
        case "left":
          this.botonSelectedList.PARENT_ALIGN_LEFT = true;
          break;
        case "right":
          this.botonSelectedList.PARENT_ALIGN_RIGHT = true;
          break;
        default:
          this.botonSelectedList.PARENT_ALIGN_JUSTIFY = true;
          break;
      }
    }
  }

  switchPaddingButtonChange(e:any): void{
    this.botonSelectedList.VISIBLE_PADDING_DETAIL = e.checked;
    let setter = new ModelBotonEdit();
    this.botonSelectedList.PADDING = setter.PADDING;
    this.botonSelectedList.PADDING_TOP = setter.PADDING_TOP;
    this.botonSelectedList.PADDING_LEFT = setter.PADDING_LEFT;
    this.botonSelectedList.PADDING_RIGHT = setter.PADDING_RIGHT;
    this.botonSelectedList.PADDING_BOTTOM = setter.PADDING_BOTTOM;
    if(!this.botonSelectedList.VISIBLE_PADDING_DETAIL){
      let act_boton = document.getElementById(this.id_element_selected);
      if(act_boton){
        act_boton.style["paddingTop"] = "";
        act_boton.style["paddingLeft"] = "";
        act_boton.style["paddingRight"] = "";
        act_boton.style["paddingBottom"] = "";
        act_boton.style["padding"] = this.botonSelectedList.PADDING.toString() + this.botonSelectedList.PADDING_UNIT;
      }
    }
    else{
      let act_boton = document.getElementById(this.id_element_selected);
      if(act_boton){
        act_boton.style["padding"] = "";
        act_boton.style["paddingTop"] = this.botonSelectedList.PADDING_TOP.toString() + this.botonSelectedList.PADDING_UNIT;
        act_boton.style["paddingLeft"] = this.botonSelectedList.PADDING_LEFT.toString() + this.botonSelectedList.PADDING_UNIT;
        act_boton.style["paddingRight"] = this.botonSelectedList.PADDING_RIGHT.toString() + this.botonSelectedList.PADDING_UNIT;
        act_boton.style["paddingBottom"] = this.botonSelectedList.PADDING_BOTTOM.toString() + this.botonSelectedList.PADDING_UNIT;
      }
    }
  }

  onButtonPaddingInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.PADDING = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.PADDING = e.value;
      }
    }else{
      this.botonSelectedList.PADDING = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["padding"] = this.botonSelectedList.PADDING.toString() + this.botonSelectedList.PADDING_UNIT;
    }
  }

  onButtonPaddingTopInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.PADDING_TOP = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.PADDING_TOP = e.value;
      }
    }else{
      this.botonSelectedList.PADDING_TOP = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["paddingTop"] = this.botonSelectedList.PADDING_TOP.toString() + this.botonSelectedList.PADDING_UNIT;
    }
  }

  onButtonPaddingLeftInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.PADDING_LEFT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.PADDING_LEFT = e.value;
      }
    }else{
      this.botonSelectedList.PADDING_LEFT = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["paddingLeft"] = this.botonSelectedList.PADDING_LEFT.toString() + this.botonSelectedList.PADDING_UNIT;
    }
  }

  onButtonPaddingRightInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.PADDING_RIGHT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.PADDING_RIGHT = e.value;
      }
    }else{
      this.botonSelectedList.PADDING_RIGHT = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["paddingRight"] = this.botonSelectedList.PADDING_RIGHT.toString() + this.botonSelectedList.PADDING_UNIT;
    }
  }

  onButtonPaddingBottomInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.PADDING_BOTTOM = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.PADDING_BOTTOM = e.value;
      }
    }else{
      this.botonSelectedList.PADDING_BOTTOM = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["paddingBottom"] = this.botonSelectedList.PADDING_BOTTOM + this.botonSelectedList.PADDING_UNIT;
    }
  }

  switchBorderButtonChange(e:any): void{
    this.botonSelectedList.VISIBLE_BORDER_DETAIL = e.checked;
    let setter = new ModelBotonEdit();
    this.botonSelectedList.BORDER = setter.BORDER;
    this.botonSelectedList.BORDER_TOP = setter.BORDER_TOP;
    this.botonSelectedList.BORDER_TOP_STYLE = setter.BORDER_TOP_STYLE;
    this.botonSelectedList.BORDER_TOP_COLOR = setter.BORDER_TOP_COLOR;
    this.botonSelectedList.BORDER_LEFT = setter.BORDER_LEFT;
    this.botonSelectedList.BORDER_LEFT_STYLE = setter.BORDER_LEFT_STYLE;
    this.botonSelectedList.BORDER_LEFT_COLOR = setter.BORDER_LEFT_COLOR;
    this.botonSelectedList.BORDER_RIGHT = setter.BORDER_RIGHT;
    this.botonSelectedList.BORDER_RIGHT_STYLE = setter.BORDER_RIGHT_STYLE;
    this.botonSelectedList.BORDER_RIGHT_COLOR = setter.BORDER_RIGHT_COLOR;
    this.botonSelectedList.BORDER_BOTTOM = setter.BORDER_BOTTOM;
    this.botonSelectedList.BORDER_BOTTOM_STYLE = setter.BORDER_BOTTOM_STYLE;
    this.botonSelectedList.BORDER_BOTTOM_COLOR = setter.BORDER_BOTTOM_COLOR;
    if(!this.botonSelectedList.VISIBLE_BORDER_DETAIL){
      let act_boton = document.getElementById(this.id_element_selected);
      if(act_boton){
        act_boton.style["borderTop"] = "";
        act_boton.style["borderLeft"] = "";
        act_boton.style["borderRight"] = "";
        act_boton.style["borderBottom"] = "";
        act_boton.style["border"] = this.botonSelectedList.BORDER.toString() + this.botonSelectedList.BORDER_UNIT;
      }
    }
    else{
      let act_boton = document.getElementById(this.id_element_selected);
      if(act_boton){
        act_boton.style["border"] = "";
        act_boton.style["borderTop"] = this.botonSelectedList.BORDER_TOP.toString() + this.botonSelectedList.BORDER_UNIT;
        act_boton.style["borderLeft"] = this.botonSelectedList.BORDER_LEFT.toString() + this.botonSelectedList.BORDER_UNIT;
        act_boton.style["borderRight"] = this.botonSelectedList.BORDER_RIGHT.toString() + this.botonSelectedList.BORDER_UNIT;
        act_boton.style["borderBottom"] = this.botonSelectedList.BORDER_BOTTOM.toString() + this.botonSelectedList.BORDER_UNIT;
      }
    }
  }

  BorderButtonStyleChange(){
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      console.log("entre");
      act_boton.classList.remove("border-selected");
      act_boton.style["border"] = this.botonSelectedList.BORDER.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderColor"] = this.botonSelectedList.BORDER_COLOR;
      act_boton.style["borderStyle"] = this.botonSelectedList.BORDER_STYLE.VALOR;
    }
  }

  onButtonBorderInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_2){
        this.botonSelectedList.BORDER = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_2));
      }else{
        this.botonSelectedList.BORDER = e.value;
      }
    }else{
      this.botonSelectedList.BORDER = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.classList.remove("border-selected");
      act_boton.style["border"] = this.botonSelectedList.BORDER.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderColor"] = this.botonSelectedList.BORDER_COLOR;
      act_boton.style["borderStyle"] = this.botonSelectedList.BORDER_STYLE.VALOR;
    }
  }

  onColorBorderButtonChange(e:any): void{
    if(e.value != null){
      this.botonSelectedList.BORDER_COLOR = e.value;
    }else{
      this.botonSelectedList.BORDER_COLOR = "";
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.classList.remove("border-selected");
      act_boton.style["border"] = this.botonSelectedList.BORDER.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderColor"] = this.botonSelectedList.BORDER_COLOR;
      act_boton.style["borderStyle"] = this.botonSelectedList.BORDER_STYLE.VALOR;
    }
  }

  onButtonBorderTopInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.BORDER_TOP = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.BORDER_TOP = e.value;
      }
    }else{
      this.botonSelectedList.BORDER_TOP = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderTop"] = this.botonSelectedList.BORDER_TOP.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderTopColor"] = this.botonSelectedList.BORDER_TOP_COLOR;
      act_boton.style["borderTopStyle"] = this.botonSelectedList.BORDER_TOP_STYLE.VALOR;
    }
  }

  onColorBorderTopButtonChange(e:any): void{
    if(e.value != null){
      this.botonSelectedList.BORDER_TOP_COLOR = e.value;
    }else{
      this.botonSelectedList.BORDER_TOP_COLOR = "";
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderTop"] = this.botonSelectedList.BORDER_TOP.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderTopColor"] = this.botonSelectedList.BORDER_TOP_COLOR;
      act_boton.style["borderTopStyle"] = this.botonSelectedList.BORDER_TOP_STYLE.VALOR;
    }
  }

  onButtonBorderLeftInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.BORDER_LEFT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.BORDER_LEFT = e.value;
      }
    }else{
      this.botonSelectedList.BORDER_LEFT = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderLeft"] = this.botonSelectedList.BORDER_LEFT.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderLeftColor"] = this.botonSelectedList.BORDER_LEFT_COLOR;
      act_boton.style["borderLeftStyle"] = this.botonSelectedList.BORDER_LEFT_STYLE.VALOR;
    }
  }

  onColorBorderLeftButtonChange(e:any): void{
    if(e.value != null){
      this.botonSelectedList.BORDER_LEFT_COLOR = e.value;
    }else{
      this.botonSelectedList.BORDER_LEFT_COLOR = "";
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderLeft"] = this.botonSelectedList.BORDER_LEFT.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderLeftColor"] = this.botonSelectedList.BORDER_LEFT_COLOR;
      act_boton.style["borderLeftStyle"] = this.botonSelectedList.BORDER_LEFT_STYLE.VALOR;
    }
  }

  onButtonBorderRightInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.BORDER_RIGHT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.BORDER_RIGHT = e.value;
      }
    }else{
      this.botonSelectedList.BORDER_RIGHT = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderRight"] = this.botonSelectedList.BORDER_RIGHT.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderRightColor"] = this.botonSelectedList.BORDER_RIGHT_COLOR;
      act_boton.style["borderRightStyle"] = this.botonSelectedList.BORDER_RIGHT_STYLE.VALOR;
    }
  }

  onColorBorderRightButtonChange(e:any): void{
    if(e.value != null){
      this.botonSelectedList.BORDER_RIGHT_COLOR = e.value;
    }else{
      this.botonSelectedList.BORDER_RIGHT_COLOR = "";
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderRight"] = this.botonSelectedList.BORDER_RIGHT.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderRightColor"] = this.botonSelectedList.BORDER_RIGHT_COLOR;
      act_boton.style["borderRightStyle"] = this.botonSelectedList.BORDER_RIGHT_STYLE.VALOR;
    }
  }

  onButtonBorderBottomInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.BORDER_BOTTOM = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.BORDER_BOTTOM = e.value;
      }
    }else{
      this.botonSelectedList.BORDER_BOTTOM = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderBottom"] = this.botonSelectedList.BORDER_BOTTOM + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderBottomColor"] = this.botonSelectedList.BORDER_BOTTOM_COLOR;
      act_boton.style["borderBottomStyle"] = this.botonSelectedList.BORDER_BOTTOM_STYLE.VALOR;
    }
  }

  onColorBorderBottomButtonChange(e:any): void{
    if(e.value != null){
      this.botonSelectedList.BORDER_BOTTOM_COLOR = e.value;
    }else{
      this.botonSelectedList.BORDER_BOTTOM_COLOR = "";
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderBottom"] = this.botonSelectedList.BORDER_BOTTOM + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderBottomColor"] = this.botonSelectedList.BORDER_BOTTOM_COLOR;
      act_boton.style["borderBottomStyle"] = this.botonSelectedList.BORDER_BOTTOM_STYLE.VALOR;
    }
  }

  BorderTopButtonStyleChange(){
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderTop"] = this.botonSelectedList.BORDER_TOP.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderTopColor"] = this.botonSelectedList.BORDER_TOP_COLOR;
      act_boton.style["borderTopStyle"] = this.botonSelectedList.BORDER_TOP_STYLE.VALOR;
    }
  }

  BorderLeftButtonStyleChange(){
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderLeft"] = this.botonSelectedList.BORDER_LEFT.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderLeftColor"] = this.botonSelectedList.BORDER_LEFT_COLOR;
      act_boton.style["borderLeftStyle"] = this.botonSelectedList.BORDER_LEFT_STYLE.VALOR;
    }
  }

  BorderRightButtonStyleChange(){
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderRight"] = this.botonSelectedList.BORDER_RIGHT.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderRightColor"] = this.botonSelectedList.BORDER_RIGHT_COLOR;
      act_boton.style["borderRightStyle"] = this.botonSelectedList.BORDER_RIGHT_STYLE.VALOR;
    }
  }

  BorderBottomButtonStyleChange(){
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderBottom"] = this.botonSelectedList.BORDER_BOTTOM.toString() + this.botonSelectedList.BORDER_UNIT;
      act_boton.style["borderBottomColor"] = this.botonSelectedList.BORDER_BOTTOM_COLOR;
      act_boton.style["borderBottomStyle"] = this.botonSelectedList.BORDER_BOTTOM_STYLE.VALOR;
    }
  }

  switchBorderRadiusButtonChange(e:any): void{
    this.botonSelectedList.VISIBLE_BORDER_RADIUS_DETAIL = e.checked;
    let setter = new ModelBotonEdit();
    this.botonSelectedList.BORDER_RADIUS = setter.BORDER_RADIUS;
    this.botonSelectedList.BORDER_RADIUS_TOP_LEFT = setter.BORDER_RADIUS_TOP_LEFT;
    this.botonSelectedList.BORDER_RADIUS_TOP_RIGHT = setter.BORDER_RADIUS_TOP_RIGHT;
    this.botonSelectedList.BORDER_RADIUS_BOTTOM_LEFT = setter.BORDER_RADIUS_BOTTOM_LEFT;
    this.botonSelectedList.BORDER_RADIUS_BOTTOM_RIGHT = setter.BORDER_RADIUS_BOTTOM_RIGHT;
    if(!this.botonSelectedList.VISIBLE_BORDER_RADIUS_DETAIL){
      let act_boton = document.getElementById(this.id_element_selected);
      if(act_boton){
        act_boton.style["borderTopLeftRadius"] = "";
        act_boton.style["borderTopRightRadius"] = "";
        act_boton.style["borderBottomLeftRadius"] = "";
        act_boton.style["borderBottomRightRadius"] = "";
        act_boton.style["borderRadius"] = this.botonSelectedList.BORDER_RADIUS.toString() + this.botonSelectedList.BORDER_RADIUS_UNIT;
      }
    }
    else{
      let act_boton = document.getElementById(this.id_element_selected);
      if(act_boton){
        act_boton.style["borderRadius"] = "";
        act_boton.style["borderTopLeftRadius"] = this.botonSelectedList.BORDER_RADIUS_TOP_LEFT.toString() + this.botonSelectedList.BORDER_RADIUS_UNIT;
        act_boton.style["borderTopRightRadius"] = this.botonSelectedList.BORDER_RADIUS_TOP_RIGHT.toString() + this.botonSelectedList.BORDER_RADIUS_UNIT;
        act_boton.style["borderBottomLeftRadius"] = this.botonSelectedList.BORDER_RADIUS_BOTTOM_LEFT.toString() + this.botonSelectedList.BORDER_RADIUS_UNIT;
        act_boton.style["borderBottomRightRadius"] = this.botonSelectedList.BORDER_RADIUS_BOTTOM_RIGHT.toString() + this.botonSelectedList.BORDER_RADIUS_UNIT;
      }
    }
  }

  onButtonBorderRadiusInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_2){
        this.botonSelectedList.BORDER_RADIUS = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_2));
      }else{
        this.botonSelectedList.BORDER_RADIUS = e.value;
      }
    }else{
      this.botonSelectedList.BORDER_RADIUS = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderRadius"] = this.botonSelectedList.BORDER_RADIUS.toString() + this.botonSelectedList.BORDER_RADIUS_UNIT;
    }
  }

  onButtonBorderRadiusTopLeftInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_2){
        this.botonSelectedList.BORDER_RADIUS_TOP_LEFT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_2));
      }else{
        this.botonSelectedList.BORDER_RADIUS_TOP_LEFT = e.value;
      }
    }else{
      this.botonSelectedList.BORDER_RADIUS_TOP_LEFT = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderTopLeftRadius"] = this.botonSelectedList.BORDER_RADIUS_TOP_LEFT + this.botonSelectedList.BORDER_RADIUS_UNIT;
    }
  }

  onButtonBorderRadiusTopRightInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_2){
        this.botonSelectedList.BORDER_RADIUS_TOP_RIGHT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_2));
      }else{
        this.botonSelectedList.BORDER_RADIUS_TOP_RIGHT = e.value;
      }
    }else{
      this.botonSelectedList.BORDER_RADIUS_TOP_RIGHT = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderTopRightRadius"] = this.botonSelectedList.BORDER_RADIUS_TOP_RIGHT + this.botonSelectedList.BORDER_RADIUS_UNIT;
    }
  }

  onButtonBorderRadiusBottomLeftInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_2){
        this.botonSelectedList.BORDER_RADIUS_BOTTOM_LEFT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_2));
      }else{
        this.botonSelectedList.BORDER_RADIUS_BOTTOM_LEFT = e.value;
      }
    }else{
      this.botonSelectedList.BORDER_RADIUS_BOTTOM_LEFT = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderBottomLeftRadius"] = this.botonSelectedList.BORDER_RADIUS_BOTTOM_LEFT + this.botonSelectedList.BORDER_RADIUS_UNIT;
    }
  }

  onButtonBorderRadiusBottomRightInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_2){
        this.botonSelectedList.BORDER_RADIUS_BOTTOM_RIGHT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_2));
      }else{
        this.botonSelectedList.BORDER_RADIUS_BOTTOM_RIGHT = e.value;
      }
    }else{
      this.botonSelectedList.BORDER_RADIUS_BOTTOM_RIGHT = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      act_boton.style["borderBottomRightRadius"] = this.botonSelectedList.BORDER_RADIUS_BOTTOM_RIGHT + this.botonSelectedList.BORDER_RADIUS_UNIT;
    }
  }

  switchParentPaddingButtonChange(e:any): void{
    this.botonSelectedList.VISIBLE_PARENT_PADDING_DETAIL = e.checked;
    let setter = new ModelBotonEdit();
    this.botonSelectedList.PARENT_PADDING = setter.PARENT_PADDING;
    this.botonSelectedList.PARENT_PADDING_TOP = setter.PARENT_PADDING_TOP;
    this.botonSelectedList.PARENT_PADDING_LEFT = setter.PARENT_PADDING_LEFT;
    this.botonSelectedList.PARENT_PADDING_RIGHT = setter.PARENT_PADDING_RIGHT;
    this.botonSelectedList.PARENT_PADDING_BOTTOM = setter.PARENT_PADDING_BOTTOM;
    if(!this.botonSelectedList.VISIBLE_PARENT_PADDING_DETAIL){
      let act_boton = document.getElementById(this.id_element_selected);
      if(act_boton){
        let nodeParent = this.getNodeParentDiv(act_boton);
        if(act_boton != nodeParent){
          nodeParent.style["paddingTop"] = "";
          nodeParent.style["paddingLeft"] = "";
          nodeParent.style["paddingRight"] = "";
          nodeParent.style["paddingBottom"] = "";
          nodeParent.style["padding"] = this.botonSelectedList.PARENT_PADDING.toString() + this.botonSelectedList.PARENT_PADDING_UNIT;
        }
      }
    }
    else{
      let act_boton = document.getElementById(this.id_element_selected);
      if(act_boton){
        let nodeParent = this.getNodeParentDiv(act_boton);
        if(act_boton != nodeParent){
          nodeParent.style["padding"] = "";
          nodeParent.style["paddingTop"] = this.botonSelectedList.PARENT_PADDING_TOP.toString() + this.botonSelectedList.PARENT_PADDING_UNIT;
          nodeParent.style["paddingLeft"] = this.botonSelectedList.PARENT_PADDING_LEFT.toString() + this.botonSelectedList.PARENT_PADDING_UNIT;
          nodeParent.style["paddingRight"] = this.botonSelectedList.PARENT_PADDING_RIGHT.toString() + this.botonSelectedList.PARENT_PADDING_UNIT;
          nodeParent.style["paddingBottom"] = this.botonSelectedList.PARENT_PADDING_BOTTOM.toString() + this.botonSelectedList.PARENT_PADDING_UNIT;
        }
      }
    }
  }

  onButtonParentPaddingInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.PARENT_PADDING = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.PARENT_PADDING = e.value;
      }
    }else{
      this.botonSelectedList.PARENT_PADDING = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      let nodeParent = this.getNodeParentDiv(act_boton);
      if(act_boton != nodeParent){
        nodeParent.style["padding"] = this.botonSelectedList.PARENT_PADDING.toString() + this.botonSelectedList.PARENT_PADDING_UNIT;
      }
    }
  }

  onButtonParentPaddingTopInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.PARENT_PADDING_TOP = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.PARENT_PADDING_TOP = e.value;
      }
    }else{
      this.botonSelectedList.PARENT_PADDING_TOP = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      let nodeParent = this.getNodeParentDiv(act_boton);
      if(act_boton != nodeParent){
        nodeParent.style["paddingTop"] = this.botonSelectedList.PARENT_PADDING_TOP.toString() + this.botonSelectedList.PARENT_PADDING_UNIT;
      }
    }
  }

  onButtonParentPaddingLeftInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.PARENT_PADDING_LEFT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.PARENT_PADDING_LEFT = e.value;
      }
    }else{
      this.botonSelectedList.PARENT_PADDING_LEFT = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      let nodeParent = this.getNodeParentDiv(act_boton);
      if(act_boton != nodeParent){
        nodeParent.style["paddingLeft"] = this.botonSelectedList.PARENT_PADDING_LEFT.toString() + this.botonSelectedList.PARENT_PADDING_UNIT;
      }
    }
  }

  onButtonParentPaddingRightInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.PARENT_PADDING_RIGHT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.PARENT_PADDING_RIGHT = e.value;
      }
    }else{
      this.botonSelectedList.PARENT_PADDING_RIGHT = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      let nodeParent = this.getNodeParentDiv(act_boton);
      if(act_boton != nodeParent){
        nodeParent.style["paddingRight"] = this.botonSelectedList.PARENT_PADDING_RIGHT.toString() + this.botonSelectedList.PARENT_PADDING_UNIT;
      }
    }
  }

  onButtonParentPaddingBottomInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.botonSelectedList.PARENT_PADDING_BOTTOM = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.botonSelectedList.PARENT_PADDING_BOTTOM = e.value;
      }
    }else{
      this.botonSelectedList.PARENT_PADDING_BOTTOM = 0;
    }
    let act_boton = document.getElementById(this.id_element_selected);
    if(act_boton){
      let nodeParent = this.getNodeParentDiv(act_boton);
      if(act_boton != nodeParent){
        nodeParent.style["paddingBottom"] = this.botonSelectedList.PARENT_PADDING_BOTTOM.toString() + this.botonSelectedList.PARENT_PADDING_UNIT;
      }
    }
  }

  getNodeParentDiv(node : HTMLElement): HTMLElement {
    let parent = node.parentElement;  
    if(parent){
      if(parent.tagName == "DIV"){
        return parent;
      }
      else{
        if(parent.tagName == "A"){
          let parent_2 = parent.parentElement;
          if(parent_2){
            return parent_2;
          }
        }
      }
    }
    return node;
  }

  //METODOS EDICION ENLACE
  /* onColorEnlaceChange(e:any): void{
    if(e.value != null){
      this.enlaceSelectedList.COLOR = e.value;
    }else{
      this.enlaceSelectedList.COLOR = "#fff";
    }
    let act_link = document.getElementById(this.id_element_selected);
    if(act_link){
      act_link.style["color"] = this.enlaceSelectedList.COLOR;
    }
  } */

  //METODOS EDICION GRILLA
  onColorGridChange(e:any): void{
    if(e.value != null){
      this.gridSelectedList.COLOR = e.value;
    }else{
      this.gridSelectedList.COLOR = "#fff";
    }
    let act_grid = document.getElementById(this.id_element_selected);
    if(act_grid){
      act_grid.style["backgroundColor"] = this.gridSelectedList.COLOR;
    }
  }

  switchPaddingGridChange(e:any): void{
    this.gridSelectedList.VISIBLE_PADDING_DETAIL = e.checked;
    let setter = new ModelGridEdit();
    this.gridSelectedList.PADDING = setter.PADDING;
    this.gridSelectedList.PADDING_TOP = setter.PADDING_TOP;
    this.gridSelectedList.PADDING_LEFT = setter.PADDING_LEFT;
    this.gridSelectedList.PADDING_RIGHT = setter.PADDING_RIGHT;
    this.gridSelectedList.PADDING_BOTTOM = setter.PADDING_BOTTOM;
    if(!this.gridSelectedList.VISIBLE_PADDING_DETAIL){
      let act_grid = document.getElementById(this.id_element_selected);
      if(act_grid){
        act_grid.style["paddingTop"] = "";
        act_grid.style["paddingLeft"] = "";
        act_grid.style["paddingRight"] = "";
        act_grid.style["paddingBottom"] = "";
        act_grid.style["padding"] = this.gridSelectedList.PADDING.toString() + this.gridSelectedList.PADDING_UNIT;
      }
    }
    else{
      let act_grid = document.getElementById(this.id_element_selected);
      if(act_grid){
        act_grid.style["padding"] = "";
        act_grid.style["paddingTop"] = this.gridSelectedList.PADDING_TOP.toString() + this.gridSelectedList.PADDING_UNIT;
        act_grid.style["paddingLeft"] = this.gridSelectedList.PADDING_LEFT.toString() + this.gridSelectedList.PADDING_UNIT;
        act_grid.style["paddingRight"] = this.gridSelectedList.PADDING_RIGHT.toString() + this.gridSelectedList.PADDING_UNIT;
        act_grid.style["paddingBottom"] = this.gridSelectedList.PADDING_BOTTOM.toString() + this.gridSelectedList.PADDING_UNIT;
      }
    }
  }

  onPaddingGridInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.gridSelectedList.PADDING = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.gridSelectedList.PADDING = e.value;
      }
    }else{
      this.gridSelectedList.PADDING = 0;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["padding"] = this.gridSelectedList.PADDING.toString() + this.gridSelectedList.PADDING_UNIT;
    }
  }

  onPaddingTopGridInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.gridSelectedList.PADDING_TOP = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.gridSelectedList.PADDING_TOP = e.value;
      }
    }else{
      this.gridSelectedList.PADDING_TOP = 0;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["paddingTop"] = this.gridSelectedList.PADDING_TOP.toString() + this.gridSelectedList.PADDING_UNIT;
    }
  }

  onPaddingLeftGridInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.gridSelectedList.PADDING_LEFT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.gridSelectedList.PADDING_LEFT = e.value;
      }
    }else{
      this.gridSelectedList.PADDING_LEFT = 0;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["paddingLeft"] = this.gridSelectedList.PADDING_LEFT.toString() + this.gridSelectedList.PADDING_UNIT;
    }
  }

  onPaddingRightGridInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.gridSelectedList.PADDING_RIGHT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.gridSelectedList.PADDING_RIGHT = e.value;
      }
    }else{
      this.gridSelectedList.PADDING_RIGHT = 0;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["paddingRight"] = this.gridSelectedList.PADDING_RIGHT.toString() + this.gridSelectedList.PADDING_UNIT;
    }
  }

  onPaddingBottomGridInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_3){
        this.gridSelectedList.PADDING_BOTTOM = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_3));
      }else{
        this.gridSelectedList.PADDING_BOTTOM = e.value;
      }
    }else{
      this.gridSelectedList.PADDING_BOTTOM = 0;
    }
    let act_texto = document.getElementById(this.id_element_selected);
    if(act_texto){
      act_texto.style["paddingBottom"] = this.gridSelectedList.PADDING_BOTTOM.toString() + this.gridSelectedList.PADDING_UNIT;
    }
  }

  switchBorderRadiusGridChange(e:any): void{
    this.gridSelectedList.VISIBLE_BORDER_RADIUS_DETAIL = e.checked;
    let setter = new ModelGridEdit();
    this.gridSelectedList.BORDER_RADIUS = setter.BORDER_RADIUS;
    this.gridSelectedList.BORDER_RADIUS_TOP_LEFT = setter.BORDER_RADIUS_TOP_LEFT;
    this.gridSelectedList.BORDER_RADIUS_TOP_RIGHT = setter.BORDER_RADIUS_TOP_RIGHT;
    this.gridSelectedList.BORDER_RADIUS_BOTTOM_LEFT = setter.BORDER_RADIUS_BOTTOM_LEFT;
    this.gridSelectedList.BORDER_RADIUS_BOTTOM_RIGHT = setter.BORDER_RADIUS_BOTTOM_RIGHT;
    if(!this.gridSelectedList.VISIBLE_BORDER_RADIUS_DETAIL){
      let act_grid = document.getElementById(this.id_element_selected);
      if(act_grid){
        act_grid.style["borderTopLeftRadius"] = "";
        act_grid.style["borderTopRightRadius"] = "";
        act_grid.style["borderBottomLeftRadius"] = "";
        act_grid.style["borderBottomRightRadius"] = "";
        act_grid.style["borderRadius"] = this.gridSelectedList.BORDER_RADIUS.toString() + this.gridSelectedList.BORDER_RADIUS_UNIT;
      }
    }
    else{
      let act_grid = document.getElementById(this.id_element_selected);
      if(act_grid){
        act_grid.style["borderRadius"] = "";
        act_grid.style["borderTopLeftRadius"] = this.gridSelectedList.BORDER_RADIUS_TOP_LEFT.toString() + this.gridSelectedList.BORDER_RADIUS_UNIT;
        act_grid.style["borderTopRightRadius"] = this.gridSelectedList.BORDER_RADIUS_TOP_RIGHT.toString() + this.gridSelectedList.BORDER_RADIUS_UNIT;
        act_grid.style["borderBottomLeftRadius"] = this.gridSelectedList.BORDER_RADIUS_BOTTOM_LEFT.toString() + this.gridSelectedList.BORDER_RADIUS_UNIT;
        act_grid.style["borderBottomRightRadius"] = this.gridSelectedList.BORDER_RADIUS_BOTTOM_RIGHT.toString() + this.gridSelectedList.BORDER_RADIUS_UNIT;
      }
    }
  }

  onGridBorderRadiusInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_2){
        this.gridSelectedList.BORDER_RADIUS = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_2));
      }else{
        this.gridSelectedList.BORDER_RADIUS = e.value;
      }
    }else{
      this.gridSelectedList.BORDER_RADIUS = 0;
    }
    let act_grid = document.getElementById(this.id_element_selected);
    if(act_grid){
      act_grid.style["borderRadius"] = this.gridSelectedList.BORDER_RADIUS.toString() + this.gridSelectedList.BORDER_RADIUS_UNIT;
    }
  }

  onGridBorderRadiusTopLeftInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_2){
        this.gridSelectedList.BORDER_RADIUS_TOP_LEFT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_2));
      }else{
        this.gridSelectedList.BORDER_RADIUS_TOP_LEFT = e.value;
      }
    }else{
      this.gridSelectedList.BORDER_RADIUS_TOP_LEFT = 0;
    }
    let act_grid = document.getElementById(this.id_element_selected);
    if(act_grid){
      act_grid.style["borderTopLeftRadius"] = this.gridSelectedList.BORDER_RADIUS_TOP_LEFT + this.gridSelectedList.BORDER_RADIUS_UNIT;
    }
  }

  onGridBorderRadiusTopRightInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_2){
        this.gridSelectedList.BORDER_RADIUS_TOP_RIGHT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_2));
      }else{
        this.gridSelectedList.BORDER_RADIUS_TOP_RIGHT = e.value;
      }
    }else{
      this.gridSelectedList.BORDER_RADIUS_TOP_RIGHT = 0;
    }
    let act_grid = document.getElementById(this.id_element_selected);
    if(act_grid){
      act_grid.style["borderTopRightRadius"] = this.gridSelectedList.BORDER_RADIUS_TOP_RIGHT + this.gridSelectedList.BORDER_RADIUS_UNIT;
    }
  }

  onGridBorderRadiusBottomLeftInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_2){
        this.gridSelectedList.BORDER_RADIUS_BOTTOM_LEFT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_2));
      }else{
        this.gridSelectedList.BORDER_RADIUS_BOTTOM_LEFT = e.value;
      }
    }else{
      this.gridSelectedList.BORDER_RADIUS_BOTTOM_LEFT = 0;
    }
    let act_grid = document.getElementById(this.id_element_selected);
    if(act_grid){
      act_grid.style["borderBottomLeftRadius"] = this.gridSelectedList.BORDER_RADIUS_BOTTOM_LEFT + this.gridSelectedList.BORDER_RADIUS_UNIT;
    }
  }

  onGridBorderRadiusBottomRightInput(e:any): void{
    if(e.value != null){
      if(e.value.toString().length > this.MAX_LENGHT_2){
        this.gridSelectedList.BORDER_RADIUS_BOTTOM_RIGHT = parseInt(e.value.toString().substring(0,this.MAX_LENGHT_2));
      }else{
        this.gridSelectedList.BORDER_RADIUS_BOTTOM_RIGHT = e.value;
      }
    }else{
      this.gridSelectedList.BORDER_RADIUS_BOTTOM_RIGHT = 0;
    }
    let act_grid = document.getElementById(this.id_element_selected);
    if(act_grid){
      act_grid.style["borderBottomRightRadius"] = this.gridSelectedList.BORDER_RADIUS_BOTTOM_RIGHT + this.gridSelectedList.BORDER_RADIUS_UNIT;
    }
  }
}
