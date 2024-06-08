import { Exclude, Expose } from "class-transformer";
import { Actividades } from "src/actividades/entities/actividades.entity";
import { Usuarios } from "src/usuarios/entities/usuarios.entity";
import { Vehiculos } from "src/vehiculos/entities/vehiculos.entity";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Auditoria {
    @PrimaryGeneratedColumn()
    id_auditoria: number;

    @ManyToOne(() => Actividades, (actividad) => actividad.auditorias)
    @JoinColumn({ name: "id_actividad" })
    id_actividad: Actividades;

    @ManyToOne(() => Usuarios, (user) => user.id_usuario)
    @JoinColumn({ name: "usuario_actual" })
    usuario_actual: Usuarios

    @ManyToOne(() => Usuarios, (user) => user.id_usuario)
    @JoinColumn({ name: "usuario_modificacion" })
    usuario_modificacion: Usuarios

    @Column({ type: "varchar", length: 255 })
    descripcion: string;

    @ManyToOne(() => Vehiculos, (vehiculo) => vehiculo.id_vehiculo)
    @JoinColumn({ name: "vehiculo" })
    vehiculo: Vehiculos;

    @Column({ type: "simple-enum" })
    prioridad: string;

    // @Exclude()
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_modificacion: string;

    @Column({ type: "simple-enum" })
    estado: string;

    @Column({ type: "simple-enum" })
    operacion: string;


    @Expose({ name: "fecha_format" })
    get fecha(): string {
        return new Date(this.fecha_modificacion).toLocaleString('es-ES', {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
            year: 'numeric', month: '2-digit', day: '2-digit'
        });
    }
}
