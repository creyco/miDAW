import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { rolesEnum } from 'src/enums/rol-user.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Clientes } from './entities/cliente.entity';

@Controller('clientes')
@Roles(rolesEnum.ADMINISTRADOR)
@UseGuards(AuthGuard, RolesGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @Post()
  create(@Body() createClienteDto: CreateClienteDto): Promise<{ message: string }> {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Clientes> {
    return this.clientesService.findOne(id);
  }

  @Get(':index/:size/:estado')
  findByPage(@Param('index', ParseIntPipe) index: number, @Param('size', ParseIntPipe) size: number,
    @Param('estado', ParseIntPipe) estado: number): Promise<{ total: number; data: Clientes[] }> {
    return this.clientesService.findByPage(index, size, estado);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto): Promise<{ message: string }> {
    return this.clientesService.update(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.clientesService.remove(id);
  }
}
