import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'Nombre de Usuario  debe ser una Cadena de AlfaNúmerica !',
  })
  @MinLength(5, {
    message: 'Nombre de Usuario debe Tener más de 5 caracteres !',
  })
  nombre_usuario: string;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'contrasenia debe ser una Cadena de AlfaNúmerica !' })
  @MinLength(5, { message: 'contrasenia debe Tener más de 5 caracteres !' })
  contrasenia: string;
}
