import { Auditoria } from "./Auditoria";
import { Usuario } from "./Usuario";
import { Vehiculo } from "./Vehiculo";

export interface Actividades {
    id_actividad: number;
    descripcion: string;
    prioridad: string;
    vehiculo: Vehiculo
    usuario_actual: Usuario
    estado: string;
    fecha_modificacion: string
    fecha_format: string
    auditorias: Auditoria[];
}
