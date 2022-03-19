import { ModelMensaje } from "./model-mensaje";
import { ModelContactabilidadCelular } from "./model-contactabilidad-celular";
import { ModelContactabilidadCorreo } from "./model-contactabilidad-correo";
import { ModelContactabilidadFijo } from "./model-contactabilidad-fijo";

export class ModelContactabilidadAgrupado extends ModelMensaje{
    CELULARES: ModelContactabilidadCelular[] = [];
    CORREOS: ModelContactabilidadCorreo[] = [];
    FIJOS: ModelContactabilidadFijo[] = [];
}