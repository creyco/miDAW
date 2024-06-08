import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActividadesDto } from './dto/create-actividades.dto';
import { UpdateActividadeDto } from './dto/update-actividades.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividades } from './entities/actividades.entity';
import { rolesEnum } from 'src/enums/rol-user.enum';
import { estadoActEnum } from '../enums/estados.enum';
import { estadoEnum } from 'src/enums/estado-user.enum';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividades)
    private readonly actividadRepository: Repository<Actividades>,
  ) { }

  async create(actividadDto: CreateActividadesDto, usuario: any): Promise<{ message: string; }> {
    try {
      const newActividad = new Actividades();
      Object.assign(newActividad, actividadDto);
      newActividad.usuario_modificacion = usuario.id
      await this.actividadRepository.save(newActividad)
      return { message: `Actividad Creada con Exito...` }
    } catch (err) {
      throw new NotFoundException({ message: 'Error al Crear Actividad !', error: err })
    }
  }

  async findAll(usuario: any): Promise<Actividades[]> {

    try {
      const query = this.actividadRepository.createQueryBuilder('actividades')
        .innerJoinAndSelect('actividades.usuario_actual', 'usuario')
        .innerJoinAndSelect('actividades.vehiculo', 'vehiculo')
        .orderBy('actividades.fecha_modificacion', 'DESC')

      if (usuario.rol === rolesEnum.MECANICO) {
        query.where('actividades.estado = :estado', { estado: estadoActEnum.PENDIENTE })
          .andWhere('actividades.usuario_actual = :idUsuario', { idUsuario: usuario.id })
          .orderBy('actividades.fecha_modificacion', 'DESC')
      }
      return query.getMany();
    } catch (err) {
      throw new NotFoundException({ message: `Error al Retornar Las Actividades!`, error: err })
    }
  }

  async findOne(id: number): Promise<Actividades> {
    const actividad: Actividades = await this.actividadRepository.findOne({ where: { id_actividad: id } })
    if (!actividad) {
      throw new ForbiddenException(`Actividad no Existe !`)
    }
    const query = this.actividadRepository.createQueryBuilder('actividades')
      .where('actividades.id_actividad = :id_actividad', { id_actividad: id })
      .innerJoinAndSelect('actividades.usuario_actual', 'usuario')
      .innerJoinAndSelect('actividades.vehiculo', 'vehiculo')
      .innerJoinAndSelect('actividades.auditorias', 'auditorias')
      .orderBy('actividades.fecha_modificacion', 'DESC')

    return query.getOne();
  }

  async findByPage(usuario: any, index: number, size: number): Promise<{ total: number; data: Actividades[], pendientes: number, actToday: Actividades[] }> {
    try {
      const queryBuilder = this.actividadRepository.createQueryBuilder('actividades')
        .innerJoinAndSelect('actividades.usuario_actual', 'usuario')
        .innerJoinAndSelect('actividades.vehiculo', 'vehiculo')
        .leftJoinAndSelect('vehiculo.duenio', 'duenio')
        .innerJoinAndSelect('actividades.auditorias', 'auditorias')
        .where('duenio.estado = :estado', { estado: estadoEnum.ACTIVO })
        .skip(index)
        .take(size)
        .orderBy('actividades.fecha_modificacion', 'DESC')

      if (usuario.rol === rolesEnum.MECANICO) {
        queryBuilder
          .where('duenio.estado = :estado', { estado: estadoEnum.ACTIVO })
          .where('actividades.usuario_actual = :idUsuario', { idUsuario: usuario.id })
          .andWhere('actividades.estado != :estado', { estado: estadoActEnum.TERMINADA })
          .skip(index).take(size)
          .orderBy('actividades.prioridad', 'ASC')
          .orderBy('actividades.fecha_modificacion', 'DESC')
      }
      const date = new Date();
      const todayArg = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return {
        total: await queryBuilder.getCount(), data: await queryBuilder.getMany(), pendientes: await queryBuilder
          .where('actividades.estado = :estado', { estado: estadoActEnum.PENDIENTE })
          .getCount(), actToday: await queryBuilder.andWhere('DATE(actividades.fecha_modificacion) = :fecha', { fecha: todayArg }).getMany()
      };

    } catch (err) {
      console.warn(err);
      throw new NotFoundException({ message: `Error al Retornar Paginas de Actividades !`, error: err })
    }
  }


  async update(id: number, updateActividadDto: UpdateActividadeDto, usuario: any): Promise<{ message: string }> {
    const actividad: Actividades = await this.findOne(id)

    try {
      Object.assign(actividad, updateActividadDto);
      actividad.usuario_modificacion = usuario.id
      await this.actividadRepository.save(actividad)
      return { message: `Actividad Editada con Exito...` };

    } catch (err) {
      throw new NotFoundException({ message: "Error al Actualizar actividad !", error: err });
    }
  }

}
