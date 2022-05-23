import { TypeDocument } from "./type-document";

export class Candidate {
    id!: number;
    nombre!: string;
    apellido!: string;
    direccion!: string;
    profileImage!: string;
    urlProfileImage!: string; //Este campo contendra la url de la imagen, pero no se debe persistir!!
    titulo!: string;
    descripcion!: string
}
