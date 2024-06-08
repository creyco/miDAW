import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors, UploadedFile, BadRequestException, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { rolesEnum } from '../enums/rol-user.enum';
import { Usuarios } from './entities/usuarios.entity';
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

@ApiTags("Usuarios")
@ApiBearerAuth()
@Controller('usuarios')
@Roles(rolesEnum.ADMINISTRADOR)
@UseGuards(AuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './public/img', filename: renameImg,
    }), fileFilter: fileFilter
  }))
  create(@UploadedFile() imagen: Express.Multer.File, @Body() createUsuarioDto: CreateUsuarioDto): Promise<{ message: string }> {
    return this.usuariosService.create(imagen, createUsuarioDto);
  }
 /*  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  } */

  @Get()
  findAll(): Promise<Usuarios[]> {
    return this.usuariosService.findAll();
  }

  @Get(':index/:size')
  findByPage(@Param('index', ParseIntPipe) index: number, @Param('size', ParseIntPipe) size: number): Promise<{ total: number; data: Usuarios[] }> {
    return this.usuariosService.findByPage(index, size);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuarios> {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './public/img', filename: renameImg,
    }), fileFilter: fileFilter
  }))
  update(@UploadedFile() imagen: Express.Multer.File, @Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) : Promise<{ message: string }> {  
    return this.usuariosService.update(imagen, id, updateUsuarioDto);
 }
}
