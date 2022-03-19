import { ModelDocenteBusqueda } from "./model-docente-busqueda";
import { ModelMensaje } from "./model-mensaje";

export class ModelDocentePaginadoBusqueda extends ModelMensaje {
    ITEMS!: ModelDocenteBusqueda[];
    TOTAL!: number;
}