import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculos } from './entities/vehiculos.entity';
import * as fs from 'fs';
import { join, resolve } from 'path';
import { ClientesService } from 'src/clientes/clientes.service';
import { estadoEnum } from 'src/enums/estado-user.enum';

require('dotenv').config();

@Injectable()
export class VehiculosService {

  constructor(
    @InjectRepository(Vehiculos)
    private readonly vehiculoRepository: Repository<Vehiculos>,
    private readonly clienteService: ClientesService
  ) { }

  async create(imagen: Express.Multer.File, vehiculoDto: CreateVehiculoDto): Promise<{ message: string; }> {
    vehiculoDto.patente = vehiculoDto.patente.replace(/\s/g, '').toUpperCase();

    if (await this.vehiculoRepository.findOne({ where: { patente: vehiculoDto.patente } })) {
      throw new ConflictException(`Ya existe un Vehiculo con la Patente ${vehiculoDto.patente} !`)
    }
    await this.clienteService.findOne(Number(vehiculoDto.duenio))

    try {

      const newVehiculo = new Vehiculos();
      Object.assign(newVehiculo, vehiculoDto);
      newVehiculo.patente = vehiculoDto.patente
      newVehiculo.imagen = imagen ? imagen.filename : 'autoDefault.png';
      await this.vehiculoRepository.save(newVehiculo)
      return { message: "Vehiculo creado con Exito..." };
    } catch (err) {
      throw new NotFoundException({ message: `Error al Crear Vehiculo !`, error: err })
    }
  }

  async findAll(): Promise<Vehiculos[]> {
    try {
      const queryBuilder = this.vehiculoRepository.createQueryBuilder('vehiculos');
      queryBuilder.innerJoinAndSelect('vehiculos.duenio', 'duenio')
      queryBuilder.where('duenio.estado = :estado', { estado: estadoEnum.ACTIVO })
        .orderBy('vehiculos.id_vehiculo', 'DESC');

      return await queryBuilder.getMany()

    } catch (err) {
      throw new NotFoundException({ message: `Error al retonar vehiculos !`, error: err })
    }
  }

  async findByPage(index: number, size: number): Promise<{ total: number; data: Vehiculos[] }> {
    try {
      const queryBuilder = this.vehiculoRepository.createQueryBuilder('vehiculos');
      queryBuilder.innerJoinAndSelect('vehiculos.duenio', 'duenio')
      queryBuilder.where('duenio.estado = :estado', { estado: estadoEnum.ACTIVO })
        .skip(index).take(size).orderBy('vehiculos.id_vehiculo', 'DESC');

      return { total: await queryBuilder.getCount(), data: await queryBuilder.getMany() };

    } catch (err) {
      throw new NotFoundException({ message: `Error al Retornar Paginas de Vehiculos !`, error: err })
    }
  }


  async findOne(id: number): Promise<Vehiculos> {
    if (!await this.vehiculoRepository.findOneBy({ id_vehiculo: id })) {
      throw new ForbiddenException(`Vehiculo no Encontrado !`)
    }
    return await this.vehiculoRepository.findOneBy({ id_vehiculo: id })
  }

  async findByPatente(search: UpdateVehiculoDto): Promise<Vehiculos> {

    const queryBuilder = this.vehiculoRepository.createQueryBuilder('vehiculos');
    queryBuilder.innerJoinAndSelect('vehiculos.duenio', 'duenio')
      .innerJoinAndSelect('vehiculos.actividades', 'actividades')
      .where('patente = :patente', { patente: search.patente })
      .andWhere('duenio.estado = :estado', { estado: estadoEnum.ACTIVO })

    if (!await queryBuilder.getOne()) {
      throw new BadRequestException({ message: "No se Encontraron Resultados" })
    }
    return await queryBuilder.getOne()
  }


  async update(imagen: Express.Multer.File, id: number, updateVehiculoDto: UpdateVehiculoDto): Promise<{ message: string }> {
    const vehiculo: Vehiculos = await this.findOne(id)
    if ((await this.vehiculoRepository.findOneBy({ patente: updateVehiculoDto.patente })).id_vehiculo !== vehiculo.id_vehiculo) {
      throw new ConflictException(`Ya existe un Vehiculo con la Patente ${updateVehiculoDto.patente} !`)
    }
    try {
      Object.assign(vehiculo, updateVehiculoDto);
      if (updateVehiculoDto.patente) vehiculo.patente = updateVehiculoDto.patente.toUpperCase()
      if (imagen) {
        const rutaImagen = resolve(join(__dirname, '../../public/img', vehiculo.imagen));
        fs.unlinkSync(rutaImagen);
        vehiculo.imagen = imagen.filename;
      }

      await this.vehiculoRepository.save(vehiculo)
      return { message: "Vehiculo Editado con Exito..." };
    } catch (err) {
      throw new NotFoundException({ message: `Error al Editar el Vehiculo !`, error: err })
    }
  }


}
