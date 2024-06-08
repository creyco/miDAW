import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditoria } from './entities/auditoria.entity';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(Auditoria)
    private readonly audiRepository: Repository<Auditoria>,
  ) { }
  async findAll(): Promise<Auditoria[]> {
    try {
      const query = this.audiRepository.createQueryBuilder('auditoria')
        .innerJoinAndSelect('auditoria.usuario_actual', 'usuario_actual')
        .innerJoinAndSelect('auditoria.usuario_modificacion', 'usuario_modificacion')
        .innerJoinAndSelect('auditoria.vehiculo', 'vehiculo')
        .orderBy('auditoria.fecha_modificacion', 'DESC')
      return query.getMany();

    } catch (err) {
      throw new NotFoundException({ message: `Error al Retornar Las Auditorias !`, error: err })
    }
  }

  async findOne(id: number): Promise<Auditoria> {
    const auditoria: Auditoria = await this.audiRepository.findOneBy({ id_auditoria: id })
    if (!auditoria) throw new ForbiddenException(`Auditoria no Existe!`)
    return auditoria
  }

  async findByPage(index: number, size: number): Promise<{ total: number; data: Auditoria[] }> {
    try {
      const queryBuilder = this.audiRepository.createQueryBuilder('auditoria');
      queryBuilder
        .innerJoinAndSelect('auditoria.usuario_actual', 'usuario_actual')
        .innerJoinAndSelect('auditoria.usuario_modificacion', 'usuario_modificacion')
        .innerJoinAndSelect('auditoria.vehiculo', 'vehiculo')
        .skip(index)
        .take(size)
        .orderBy('auditoria.fecha_modificacion', 'DESC');

      return { total: await queryBuilder.getCount(), data: await queryBuilder.getMany() };

    } catch (err) {
      throw new NotFoundException({ message: `Error al Retornar Paginas de Auditorias !`, error: err })
    }
  }

}
