import { Expose } from "class-transformer";
import { Vehiculos } from "src/vehiculos/entities/vehiculos.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Facturas {
    @PrimaryGeneratedColumn()
    id_factura: number;

    @ManyToOne(() => Vehiculos, (v) => v.id_vehiculo)
    @JoinColumn({ name: "vehiculo" })
    vehiculo: Vehiculos;

    @Column({ type: "varchar", length: 255 })
    importes: string;

    @Column({ type: "int" })
    total: number;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_creacion: string;
}
