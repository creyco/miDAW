import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadesDto } from './dto/create-actividades.dto';
import { UpdateActividadeDto } from './dto/update-actividades.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { rolesEnum } from 'src/enums/rol-user.enum';
import { Actividades } from './entities/actividades.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags("Actividades")
@ApiBearerAuth()
@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) { }

  @Post()
  @Roles(rolesEnum.ADMINISTRADOR)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Req() request: Request, @Body() createActividadeDto: CreateActividadesDto): Promise<{ message: string }> {

    return this.actividadesService.create(createActividadeDto, request['usuario']);
  }

  @Get()
  @Roles(rolesEnum.ADMINISTRADOR, rolesEnum.MECANICO)
  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Req() request: Request): Promise<Actividades[]> {
    return this.actividadesService.findAll(request['usuario']);
  }

  @Get(':index/:size')
  @Roles(rolesEnum.ADMINISTRADOR, rolesEnum.MECANICO)
  @UseGuards(AuthGuard, RolesGuard)
  findByPage(@Req() request: Request, @Param('index', ParseIntPipe) index: number, @Param('size', ParseIntPipe) size: number):
    Promise<{ total: number; data: Actividades[], pendientes: number, actToday: Actividades[] }> {
    return this.actividadesService.findByPage(request['usuario'], index, size);
  }

  @Get(':id')
  @Roles(rolesEnum.ADMINISTRADOR)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Actividades> {
    return this.actividadesService.findOne(id);
  }


  @Patch(':id')
  @Roles(rolesEnum.ADMINISTRADOR, rolesEnum.MECANICO)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id', ParseIntPipe) id: number, @Req() request: Request, @Body() updateActividadeDto: UpdateActividadeDto): Promise<{ message: string }> {
    return this.actividadesService.update(id, updateActividadeDto, request['usuario']);
  }


}
