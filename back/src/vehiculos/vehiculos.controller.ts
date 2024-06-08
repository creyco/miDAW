import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors, UploadedFile, BadRequestException, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { rolesEnum } from 'src/enums/rol-user.enum';
import { Vehiculos } from './entities/vehiculos.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const renameImg = (req, file, callback) => {
  callback(null, `${file.originalname.split('.')[0]}_${Math.round(Math.random() * 9999999).toString()}.${file.mimetype.split('/')[1]}`)
}
export const fileFilter = (req, file, callback) => {
  const types: string[] = ['image/png', 'image/jpeg']
  if (!types.includes(file.mimetype)) {
    return callback(new BadRequestException('Formato de Imagen Invalido !'), false)
  }
  callback(null, true)
}
@ApiTags("Vehiculos")
@ApiBearerAuth()
@Controller('vehiculos')
@Roles(rolesEnum.ADMINISTRADOR)
@UseGuards(AuthGuard, RolesGuard)
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) { }

  @Post()
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './public/img', filename: renameImg,
    }), fileFilter: fileFilter
  }))
  create(@UploadedFile() imagen: Express.Multer.File, @Body() createVehiculoDto: CreateVehiculoDto): Promise<{ message: string }> {
    return this.vehiculosService.create(imagen, createVehiculoDto);
  }

  @Get()
  findAll(): Promise<Vehiculos[]> {
    return this.vehiculosService.findAll();
  }

  @Get(':index/:size')
  findByPage(@Param('index', ParseIntPipe) index: number, @Param('size', ParseIntPipe) size: number): Promise<{ total: number; data: Vehiculos[] }> {
    return this.vehiculosService.findByPage(index, size);
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Vehiculos> {
    return this.vehiculosService.findOne(id);
  }


  @Post('/buscar-patente')
  findByPatente(@Body() search: UpdateVehiculoDto): Promise<Vehiculos> {
    return this.vehiculosService.findByPatente(search);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './public/img', filename: renameImg,
    }), fileFilter: fileFilter
  }))
  update(@UploadedFile() imagen: Express.Multer.File, @Param('id', ParseIntPipe) id: number, @Body() updateVehiculoDto: UpdateVehiculoDto): Promise<{ message: string }> {
    return this.vehiculosService.update(imagen, id, updateVehiculoDto);
  }

}
