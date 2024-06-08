import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { Facturas } from './entities/factura.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FacturasService {

  constructor(
    @InjectRepository(Facturas)
    private readonly facturaRepository: Repository<Facturas>,

  ) { }

  async create(facturaDto: CreateFacturaDto): Promise<{ message: string; }> {
    if (facturaDto.total < 1) {
      throw new NotFoundException({ message: `Ingrese el Importe!` })
    }
    try {
      const newFactura = new Facturas();
      Object.assign(newFactura, facturaDto);
      await this.facturaRepository.save(newFactura)
      return { message: "Factura creada con Exito..." };
    } catch (err) {
      throw new NotFoundException({ message: `Error al Crear Factura !`, error: err })
    }
  }

  async findAll(): Promise<Facturas[]> {
    try {
      return await this.facturaRepository.find({
        order: { fecha_creacion: "DESC" },
        relations: ["vehiculo", "vehiculo.duenio", "vehiculo.actividades"]
      });
    } catch (err) {
      throw new NotFoundException({ message: `Error al Retonar Facturas !`, error: err })
    }
  }

  async findByPage(index: number, size: number): Promise<{ total: number; data: Facturas[] }> {
    try {
      const queryBuilder = this.facturaRepository.createQueryBuilder('facturas');
      queryBuilder.innerJoinAndSelect('facturas.vehiculo', 'vehiculo')
        .innerJoinAndSelect('vehiculo.duenio', 'duenio')
        .innerJoinAndSelect('vehiculo.actividades', 'actividades')
        .skip(index).take(size).orderBy('facturas.fecha_creacion', 'DESC')

      return { total: await queryBuilder.getCount(), data: await queryBuilder.getMany() };

    } catch (err) {
      throw new NotFoundException({ message: `Error al Retornar Paginas de Vehiculos !`, error: err })
    }
  }

  async findOne(id: number) {
    if (!await this.facturaRepository.findOneBy({ id_factura: id })) {
      throw new ForbiddenException(`Factura no Encontrada !`)
    }
    return await this.facturaRepository.findOneBy({ id_factura: id })
  }

  async remove(id: number): Promise<{ message: string; }> {
    const factura: Facturas = await this.findOne(id)

    try {
      await this.facturaRepository.remove(factura)
      return { message: "Factura Eliminada con Exito..." };
    } catch (err) {
      throw new NotFoundException({ message: `Error al Eliminar la Factura N° ${factura.id_factura}!`, error: err })
    }
  }

}
