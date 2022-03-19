import { ModelMensaje } from "./model-mensaje";

export class ModelAplicacionMenu extends ModelMensaje {
    CODOPCION?: string;
    CODAPLI?: string;
    TITULO?: string;
    RESUMEN?: string;
    CODPARENT?: string;
    ICON?: string;
    URLMENU?: string;
    TIPOMENU?: string;
    ORDEN?: number;
    CODEST?: number;
}
