import { Controller, Get, Post, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuditoriaService } from './auditoria.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { rolesEnum } from 'src/enums/rol-user.enum';
import { Auditoria } from './entities/auditoria.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Auditorias')
@ApiBearerAuth()
@Controller('auditorias')
export class AuditoriaController {
  constructor(private readonly auditoriaService: AuditoriaService) { }

  @Get()
  @Roles(rolesEnum.ADMINISTRADOR)
  @UseGuards(AuthGuard, RolesGuard)
  findAll(): Promise<Auditoria[]> {
    return this.auditoriaService.findAll();
  }

  @Get(':id')
  @Roles(rolesEnum.ADMINISTRADOR)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Auditoria> {
    return this.auditoriaService.findOne(id);
  }
  @Get(':index/:size')
  @Roles(rolesEnum.ADMINISTRADOR)
  @UseGuards(AuthGuard, RolesGuard)
  findByPage(@Param('index', ParseIntPipe) index: number, @Param('size', ParseIntPipe) size: number): Promise<{ total: number; data: Auditoria[] }> {
    return this.auditoriaService.findByPage(index, size);
  }
}
