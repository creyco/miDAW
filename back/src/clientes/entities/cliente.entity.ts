import { estadoEnum } from "src/enums/estado-user.enum";
import { Vehiculos } from "src/vehiculos/entities/vehiculos.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, ManyToMany, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Clientes {
    @PrimaryGeneratedColumn()
    id_cliente: number;

    @Column({ type: "varchar", length: 255 })
    nombre: string;

    @Column({ type: "varchar", length: 255 })
    apellido: string;

    @Column({ type: "varchar", length: 255 })
    cuit: string;

    @Column({ type: "varchar", length: 255 })
    telefono: string;

    @Column({ type: "varchar", length: 255 })
    domicilio: string;

    @Column({ type: "enum", enum: estadoEnum, default: estadoEnum.ACTIVO })
    estado: string;


    @OneToMany(() => Vehiculos, (vehiculo) => vehiculo.duenio) // Define la relación inversa
    vehiculos: Vehiculos[]

}
