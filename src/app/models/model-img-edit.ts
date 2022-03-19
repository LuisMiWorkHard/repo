import { ModelTarget } from "./model-target";

export class ModelImgEdit{
    ID: string = "";
    SRC: string = "assets/img/no-images.png";
    VISIBLE_AUTO_WIDTH:boolean=false;
    PARENT_TEXT_ALIGN: string = "center";
    PARENT_ALIGN_LEFT: boolean = false;
    PARENT_ALIGN_RIGHT: boolean = false;
    PARENT_ALIGN_CENTER: boolean = true;
    PARENT_ALIGN_JUSTIFY: boolean = false;
    URL: string = "";
    TARGET_URL: ModelTarget = new ModelTarget();
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
    WIDTH_UNIT: string = "%";
    WIDTH: number = 100;
    HEIGHT_AUTO: string = "auto";
}