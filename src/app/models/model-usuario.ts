import { ModelMensaje } from "./model-mensaje";

export class ModelUsuario extends ModelMensaje {
    ID_USUARIO?: string;
    NOMBRE_COMPLETO?: string;
    MAIL?: string;
    AREA?: string;
    ESTADO?: string;
    DNI?: string;
    CELULAR?: string;
    CODARE?: number
    CODSUBARE?: number;
    NOMUSU?: string;
    APEUSU?: string;
    DISPLAYNAME?: string;
    OFFICE?: string;
    USERNIV?: string;
    PROCESO?: string;
    OFDESID?: string;
    TOKEN?: string;
    DESPLEGANDO?: string;
    ENLACEMAN?: string;
}
