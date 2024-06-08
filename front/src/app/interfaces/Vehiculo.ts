import { Actividades } from "./Actividades";
import { Cliente } from "./Cliente";

export interface Vehiculo {
    id_vehiculo: number;
    marca_modelo: string;
    duenio: Cliente;
    patente: string;
    color: string;
    pathImage: string;
    actividades: Actividades[]
}
