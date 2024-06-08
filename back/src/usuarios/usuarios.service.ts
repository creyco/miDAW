import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { join, resolve } from 'path';
import { Repository } from 'typeorm';
import { estadoEnum } from '../enums/estado-user.enum';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuarios } from './entities/usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly userRepository: Repository<Usuarios>,
  ) {}

  async create(
    imagen: Express.Multer.File,
    usuarioDto: CreateUsuarioDto,
  ): Promise<{ message: string }> {
    if (
      await this.userRepository.findOne({
        where: {
          nombre_usuario: usuarioDto.nombre_usuario,
          estado: estadoEnum.ACTIVO,
        },
      })
    ) {
      throw new ConflictException('Este nombre de usuario ya existe !');
    }
    try {
      const newUsuario = new Usuarios();
      Object.assign(newUsuario, usuarioDto);
      newUsuario.contrasenia = await bcryptjs.hash(usuarioDto.contrasenia, 10);
      if (imagen) newUsuario.imagen = imagen ? imagen.filename: 'userDefault.png';
      await this.userRepository.save(newUsuario);

      this.sendMail(usuarioDto);
      return { message: 'Usuario Creado con Exito...' };
    } catch (err) {
      throw new NotFoundException({
        message: `Error al Crear Usuario !`,
        error: err,
      });
    }
  }

  async findAll(): Promise<Usuarios[]> {
    try {
      return await this.userRepository.find({
        where: { estado: estadoEnum.ACTIVO },
      });
    } catch (err) {
      throw new NotFoundException({
        message: `Error al Traer Los Usuarios !`,
        error: err,
      });
    }
  }

  async findOne(id: number): Promise<Usuarios> {
    const usuario: Usuarios = await this.userRepository.findOne({
      where: { id_usuario: id }});      
    if (!usuario) {
      throw new ForbiddenException('No se Encontro el Usuario !');
    }
    return usuario;
  }

  async findByPage(
    index: number,
    size: number,
  ): Promise<{ total: number; data: Usuarios[] }> {
    try {
      const queryBuilder = this.userRepository.createQueryBuilder('usuarios');
      queryBuilder
        .skip(index)
        .take(size)
        .orderBy('usuarios.rol', 'ASC')
        .orderBy('usuarios.estado', 'ASC')
        .orderBy('usuarios.apellido', 'ASC');

      return {
        total: await queryBuilder.getCount(),
        data: await queryBuilder.getMany(),
      };
    } catch (err) {
      throw new NotFoundException({
        message: `Error al Retornar Paginas de Usuarios !`,
        error: err,
      });
    }
  }

  async findByUserName(user_name: string): Promise<Usuarios> {
    const usuario: Usuarios = await this.userRepository.findOne({
      where: { nombre_usuario: user_name, estado: estadoEnum.ACTIVO },
    });
    if (!usuario) {
      throw new NotFoundException('Usuario Incorrecto !');
    }
    return usuario;
  }

  async update(
    imagen: Express.Multer.File,
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ) {
    const usuario: Usuarios = await this.findOne(id);

    try {
      //deberia comparar usuario
      if (
        updateUsuarioDto.contrasenia &&
        !(await bcryptjs.compare(
          updateUsuarioDto.contrasenia,
          usuario.contrasenia,
        ))
      )
        this.sendMail(updateUsuarioDto, 'EDICION');

      Object.assign(usuario, updateUsuarioDto);
      if (usuario.contrasenia)
        usuario.contrasenia = await bcryptjs.hash(usuario.contrasenia, 10);
      if (imagen) {
        const rutaImagen = resolve(
          join(__dirname, '../../public/img', usuario.imagen),
        );
        fs.unlinkSync(rutaImagen);
        usuario.imagen = imagen.filename;
      }

      await this.userRepository.save(usuario);
      return { message: 'Usuario Actualizado con Exito...' };
    } catch (err) {
      throw new NotFoundException({
        message: `Error al Actualizar el Usuario !`,
        error: err,
      });
    }
  }

  async sendMail(
    { nombre, apellido, nombre_usuario, email, contrasenia }: UpdateUsuarioDto,
    tipo: string = 'CREACION',
  ) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tpfinalprog3@gmail.com',
          pass: 'gukvytwujhjqgqup',
        },
      });

      const plantillaMail =
        tipo === 'CREACION'
          ? fs.readFileSync(path.resolve('public/plantillaCreate.hbs'), 'utf8')
          : fs.readFileSync(path.resolve('public/plantillaEdit.hbs'), 'utf8');

      const correoTemplate = handlebars.compile(plantillaMail);

      const datos = {
        nombre: nombre,
        apellido: apellido,
        nombre_usuario: nombre_usuario,
        contrasenia: contrasenia,
      };

      const cuerpoHtml = correoTemplate(datos);

      const opciones = {
        from: 'API DAW',
        to: email,
        subject:
          tipo === 'CREACION'
            ? 'Creación de Usuario'
            : 'Actualización de Usuario',
        html: cuerpoHtml,
      };

      await transporter.sendMail(opciones, (err, info) => {
        if (err) {
          throw new BadRequestException({
            message: 'Error al Enviar Correo de Confirmacion !',
            error: err,
          });
        }
      });
    } catch (err) {
      throw new BadRequestException({
        message: 'Error al Enviar Correo de Confirmacion !',
        error: err,
      });
    }
  }
}
