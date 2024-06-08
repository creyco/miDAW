import { Usuario } from "./Usuario";
import { Vehiculo } from "./Vehiculo";

export interface Auditoria {
    id_auditoria: number;
    descripcion: string;
    prioridad: string,
    usuario_actual: Usuario,
    usuario_modificacion: Usuario,
    vehiculo: Vehiculo,
    estado: string,
    fecha_modificacion: string,
    fecha_format: string,
    operacion: string,
}
