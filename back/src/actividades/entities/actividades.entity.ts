import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, VirtualColumn } from "typeorm";
import { Usuarios } from "src/usuarios/entities/usuarios.entity";
import { Vehiculos } from "src/vehiculos/entities/vehiculos.entity";
import { Auditoria } from "src/auditoria/entities/auditoria.entity";
import { prioridadEnum } from "../../enums/prioridades-enum";
import { estadoActEnum } from "../../enums/estados.enum";
import { Exclude, Expose } from "class-transformer";
import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";

@UseInterceptors(ClassSerializerInterceptor)
@Entity()
export class Actividades {
    @PrimaryGeneratedColumn()
    id_actividad: number;

    @Column({ type: "varchar", length: 255 })
    descripcion: string;

    @ManyToOne(() => Usuarios, (usuario) => usuario.actividades)
    @JoinColumn({ name: "usuario_actual" })
    usuario_actual: Usuarios;

    @ManyToOne(() => Usuarios, (usuario) => usuario.actividades)
    @JoinColumn({ name: "usuario_modificacion" })
    usuario_modificacion: Usuarios;

    @ManyToOne(() => Vehiculos, (vehiculo) => vehiculo.actividades)
    @JoinColumn({ name: "vehiculo" })
    vehiculo: Vehiculos;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_modificacion: string;

    @Column({ type: "enum", enum: prioridadEnum, nullable: false })
    prioridad: string;

    @Column({ type: "enum", enum: estadoActEnum, default: estadoActEnum.PENDIENTE, nullable: false })
    estado: string;

    @OneToMany(() => Auditoria, (auditoria) => auditoria.id_actividad)
    auditorias: Auditoria[];

    @Expose({ name: "fecha_format" })
    get fecha(): string {
        return new Date(this.fecha_modificacion).toLocaleString('es-ES', {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
            year: 'numeric', month: '2-digit', day: '2-digit'
        });
    }

}

