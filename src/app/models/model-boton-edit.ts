import { ModelBorde } from "./model-borde";
import { ModelFuente } from "./model-fuente";
import { ModelTarget } from "./model-target";

export class ModelBotonEdit{
    ID: string = "";
    TEXTO: string = "";
    URL: string = "";
    TARGET_URL: ModelTarget = new ModelTarget();
    COLOR: string = "#FFFFFF";
    VISIBLE_AUTO_WIDTH:boolean=false;
    VISIBLE_PADDING_DETAIL:boolean=false;
    VISIBLE_PARENT_PADDING_DETAIL:boolean=false;
    VISIBLE_BORDER_DETAIL:boolean=false;
    VISIBLE_BORDER_RADIUS_DETAIL:boolean=false;
    PARENT_PADDING: number = 10;
    PARENT_PADDING_UNIT: string = "px";
    PARENT_PADDING_TOP: number = 10;
    PARENT_PADDING_LEFT: number = 10;
    PARENT_PADDING_RIGHT: number = 10;
    PARENT_PADDING_BOTTOM: number = 10;
    PADDING: number = 10;
    PADDING_UNIT: string = "px";
    PADDING_TOP: number = 10;
    PADDING_LEFT: number = 10;
    PADDING_RIGHT: number = 10;
    PADDING_BOTTOM: number = 10;
    MARGIN: number = 0;
    BORDER: number = 0;
    BORDER_STYLE: ModelBorde = new ModelBorde();
    BORDER_COLOR: string = "#000000";
    BORDER_UNIT: string = "px";
    BORDER_TOP: number = 0;
    BORDER_TOP_STYLE: ModelBorde = new ModelBorde();
    BORDER_TOP_COLOR: string = "#000000";
    BORDER_LEFT: number = 0;
    BORDER_LEFT_STYLE: ModelBorde = new ModelBorde();
    BORDER_LEFT_COLOR: string = "#000000";
    BORDER_RIGHT: number = 0;
    BORDER_RIGHT_STYLE: ModelBorde = new ModelBorde();
    BORDER_RIGHT_COLOR: string = "#000000";
    BORDER_BOTTOM: number = 0;
    BORDER_BOTTOM_STYLE: ModelBorde = new ModelBorde();
    BORDER_BOTTOM_COLOR: string = "#000000";
    DISPLAY: string = "inline-block";
    MAX_WIDTH: number = 100;
    MAX_WIDTH_UNIT: string = "%" ;
    BORDER_RADIUS: number = 4;
    BORDER_RADIUS_UNIT: string = "px";
    BORDER_RADIUS_TOP_LEFT: number = 4;
    BORDER_RADIUS_TOP_RIGHT: number = 4;
    BORDER_RADIUS_BOTTOM_LEFT: number = 4;
    BORDER_RADIUS_BOTTOM_RIGHT: number = 4;
    FONT: ModelFuente = new ModelFuente();
    FONT_SIZE: number = 14;
    FONT_SIZE_UNIT: string = "px";
    LINE_HEIGHT: number = 14;
    LINE_HEIGHT_UNIT: string = "px";
    PARENT_TEXT_ALIGN: string = "center";
    PARENT_ALIGN_LEFT: boolean = false;
    PARENT_ALIGN_RIGHT: boolean = false;
    PARENT_ALIGN_CENTER: boolean = true;
    PARENT_ALIGN_JUSTIFY: boolean = false;
    BACKGROUND_COLOR: string = "#3AAEE0";
    WIDTH_AUTO: string = "auto";
    WIDTH: number = 100;
    WIDTH_UNIT: string = "%";
    WORD_BREAK: string = "break-word";
}