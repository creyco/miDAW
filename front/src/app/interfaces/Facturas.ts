import { Vehiculo } from "./Vehiculo";

export interface Facturas {
    id_factura: number;
    vehiculo: Vehiculo
    importes: string;
    total: number;
    fecha_creacion: string;
}
