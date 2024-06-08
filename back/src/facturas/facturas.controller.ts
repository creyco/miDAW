import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { rolesEnum } from 'src/enums/rol-user.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Facturas } from './entities/factura.entity';

@Controller('facturas')
@Roles(rolesEnum.ADMINISTRADOR)
@UseGuards(AuthGuard, RolesGuard)
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) { }

  @Post()
  create(@Body() createFacturaDto: CreateFacturaDto): Promise<{ message: string; }> {
    return this.facturasService.create(createFacturaDto);
  }

  @Get()
  findAll(): Promise<Facturas[]> {
    return this.facturasService.findAll();
  }

  @Get(':index/:size')

  findByPage(@Param('index', ParseIntPipe) index: number, @Param('size', ParseIntPipe) size: number): Promise<{ total: number; data: Facturas[] }> {
    return this.facturasService.findByPage(index, size);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Facturas> {
    return this.facturasService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.facturasService.remove(id);
  }

}
