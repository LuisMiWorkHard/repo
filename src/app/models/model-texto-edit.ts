import { ModelFuente } from "./model-fuente";

export class ModelTextoEdit{
    ID: string = "";
    TEXTO: string = "";
    COLOR: string = "rgb(1,1,1)";
    FUENTE: ModelFuente = new ModelFuente();
    TAMANO: number = 14;
    TAMANO_UNIT: string = "px";
    PARENT_TEXT_ALIGN: string = "center";
    PARENT_ALIGN_LEFT: boolean = false;
    PARENT_ALIGN_RIGHT: boolean = false;
    PARENT_ALIGN_CENTER: boolean = true;
    PARENT_ALIGN_JUSTIFY: boolean = false;
    VISIBLE_PADDING_DETAIL:boolean=false;
    PADDING: number = 0;
    PADDING_UNIT: string = "px";
    PADDING_TOP: number = 0;
    PADDING_LEFT: number = 0;
    PADDING_RIGHT: number = 0;
    PADDING_BOTTOM: number = 0;
    MARGIN: number = 0;
    BORDER: number = 0;
    DISPLAY: string = "block";
    MAX_WIDTH_UNIT: string = "%";
    MAX_WIDTH: number = 100;
    WORD_BREAK: string = "break-word";
    LINE_HEIGHT: number = 14;
    LINE_HEIGHT_UNIT: string = "px";
    MIN_HIGHT: number = 9;
    MIN_HIGHT_UNIT : string = "px";
}