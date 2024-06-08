import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const {
      id_usuario,
      nombre_usuario,
      nombre,
      apellido,
      rol,
      contrasenia,
    }: Usuarios = await this.userService.findByUserName(
      loginDto.nombre_usuario,
    );
    const contraseniaValida: string = await bcryptjs.compare(
      loginDto.contrasenia,
      contrasenia,
    );

    if (!contraseniaValida) {
      throw new UnauthorizedException('contrasenia Incorrecta !');
    }

    const payload = {
      nombre: nombre,
      apellido: apellido,
      nombre_usuario: loginDto.nombre_usuario,
      rol: rol,
      id: id_usuario,
    };
    const token: string = await this.jwtService.signAsync(payload);

    return { token: token };
  }
}
