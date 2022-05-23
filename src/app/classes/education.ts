import { Candidate } from "./candidate";

export class Education {
    id!: number
    nombreUniversidad!: string;
    carrera!: string;
    fechaDesde!: string;
    fechaHasta!: string;
    candidato!: Candidate;
}
