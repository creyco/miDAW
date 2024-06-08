import { Vehiculo } from "./Vehiculo";

export interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido: string;
    cuit: string;
    telefono: string;
    domicilio: string;
    estado: string;
    vehiculos: Vehiculo[]
}
