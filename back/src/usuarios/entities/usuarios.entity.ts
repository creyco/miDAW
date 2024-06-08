import { Exclude, Expose } from 'class-transformer';
import { Actividades } from 'src/actividades/entities/actividades.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { estadoEnum } from '../../enums/estado-user.enum';
import { rolesEnum } from '../../enums/rol-user.enum';
@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 255 })
  apellido: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  nombre_usuario: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  contrasenia: string;

  @Column({ type: 'enum', enum: estadoEnum, default: estadoEnum.ACTIVO })
  estado: string;

  @Column({ type: 'enum', enum: rolesEnum, default: rolesEnum.MECANICO })
  rol: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, default: 'userDefault.png' })
  imagen: string;

  @OneToMany(() => Actividades, (actividad) => actividad.usuario_actual) // Define la relación inversa
  actividades: Actividades[];

  @Expose({ name: 'pathImage' })
  get pathImage() {
    return `http://localhost:${process.env.PUERTO}/img/${this.imagen}`;
  }
}
