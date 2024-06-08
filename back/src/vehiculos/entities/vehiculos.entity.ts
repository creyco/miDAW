import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Actividades } from "src/actividades/entities/actividades.entity";
import { Exclude, Expose } from "class-transformer";
import { Auditoria } from "src/auditoria/entities/auditoria.entity";
import { Clientes } from '../../clientes/entities/cliente.entity';
import { Facturas } from "src/facturas/entities/factura.entity";
require('dotenv').config();

@Entity()
export class Vehiculos {
    @PrimaryGeneratedColumn()
    id_vehiculo: number;

    @Column({ type: "varchar", length: 255 })
    marca_modelo: string;

    @ManyToOne(() => Clientes, (cliente) => cliente.id_cliente)
    @JoinColumn({ name: "duenio" })
    duenio: Clientes;

    @Column({ type: "varchar", length: 255 })
    patente: string;

    @Column({ type: "varchar", length: 255 })
    color: string;

    @Exclude()
    @Column({ type: "varchar", length: 255, default: 'autoDefault.png' })
    imagen: string;

    // @Exclude()
    @OneToMany(() => Actividades, (actividad) => actividad.vehiculo) // Define la relación inversa
    actividades: Actividades[];

    @Exclude()
    @OneToMany(() => Facturas, (factura) => factura.vehiculo) // Define la relación inversa
    facturas: Facturas[];

    @Expose({ name: "pathImage" })
    get pathImage() {
        return `http://localhost:${process.env.PUERTO}/img/${this.imagen}`
    };
} 
