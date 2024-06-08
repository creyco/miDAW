import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Clientes } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { estadoEnum } from 'src/enums/estado-user.enum';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Clientes)
    private readonly clienteRepository: Repository<Clientes>,
  ) { }

  async create(clienteDto: CreateClienteDto): Promise<{ message: string }> {

    if (await this.clienteRepository.findOneBy({ cuit: clienteDto.cuit })) {
      throw new ConflictException({ message: 'Ya existe otro Cliente con este Cuit !' })
    }
    try {
      const newCliente = new Clientes();
      Object.assign(newCliente, clienteDto);
      await this.clienteRepository.save(newCliente)
      return { message: `Cliente Creado con Exito...` }
    } catch (err) {
      throw new NotFoundException({ message: 'Error al Crear Cliente !', error: err })
    }
  }

  async findAll(): Promise<Clientes[]> {
    try {
      return await this.clienteRepository.find({
        where: { estado: estadoEnum.ACTIVO },
        order: { id_cliente: "DESC" },
        relations: ["vehiculos"],
      });
    } catch (err) {
      throw new NotFoundException({ message: `Error al Traer Los Usuarios !`, error: err })
    }
  }

  async findOne(id: number): Promise<Clientes> {
    if (!await this.clienteRepository.findOne({ where: { id_cliente: id } })) {
      throw new ForbiddenException(`Cliente no Encontrado !`)
    }
    return await this.clienteRepository.findOne({ where: { id_cliente: id } });
  }


  async findByPage(index: number, size: number, estado: number): Promise<{ total: number; data: Clientes[] }> {
    try {
      const queryBuilder = this.clienteRepository.createQueryBuilder('clientes');
      queryBuilder
        .leftJoinAndSelect('clientes.vehiculos', 'vehiculo')
        .where('clientes.estado = :valor', { valor: estado == 0 ? estadoEnum.BAJA : estadoEnum.ACTIVO }) // solucionar error
        .orderBy('clientes.id_cliente', 'DESC').skip(index).take(size)

      return { total: await queryBuilder.getCount(), data: await queryBuilder.getMany() };

    } catch (err) {
      throw new NotFoundException({ message: `Error al Retornar Paginas de Actividades !`, error: err })
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<{ message: string }> {
    const cliente: Clientes = await this.findOne(id)
    if (await this.clienteRepository.findOneBy({ cuit: updateClienteDto.cuit }) && (await this.clienteRepository.findOneBy({ cuit: updateClienteDto.cuit })).id_cliente !== cliente.id_cliente) {
      throw new ConflictException({ message: 'Ya existe otro Cliente con este Cuit !' })
    }
    try {
      Object.assign(cliente, updateClienteDto);
      await this.clienteRepository.save(cliente)
      return { message: `Cliente Editado con Exito...` };

    } catch (err) {
      throw new NotFoundException({ message: "Error al Actualizar actividad !", error: err });
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const cliente: Clientes = await this.findOne(id)
    try {
      cliente.estado = estadoEnum.BAJA;
      await this.clienteRepository.save(cliente)
      return { message: 'Cliente Eliminado con Exito...' };
    } catch (err) {
      throw new NotFoundException({ message: `Error al Eliminar Cliente !`, error: err })
    }
  }
}
