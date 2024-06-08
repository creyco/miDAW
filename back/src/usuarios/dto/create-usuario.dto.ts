import { File } from 'buffer';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
export class CreateUsuarioDto {
  @IsString({ message: 'Apellido debe ser una cadena de Texto !' })
  @MinLength(3, { message: 'Apellido debe Tener más de 3 Letras !' })
  @Matches(/^[a-zA-ZáéíóúñÑ]+$/, {
    message: 'Apellido no debe Contener Caracteres o Numeros !',
  })
  apellido: string;

  @IsString({ message: 'Nombre debe ser una cadena de Texto  !' })
  @MinLength(2, { message: 'Nombre debe Tener más de 3 Letras !' })
  @Matches(/^[a-zA-ZáéíóúñÑ ]+$/, {
    message: 'Nombre no debe contener caracteres especiales o números.',
  })
  nombre: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Nombre de Usuario debe ser una cadena de Texto !' })
  @MinLength(5, {
    message: 'Nombre de Usuario debe Tener más de 5 Caracteres !',
  })
  nombre_usuario: string;

  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'contrasenia debe ser una Cadena de Texto Alfanumérico !',
  })
  @MinLength(5, { message: 'contrasenia debe Tener más de 5 Caracteres !' })
  contrasenia: string;

  @IsString({ message: 'Estado debe ser una cadena de Texto!' })
  @IsOptional()
  estado: string;

  @IsString({ message: 'Estado debe ser una cadena de Texto!' })
  @IsOptional()
  rol: string;

  @IsOptional()
  imagen: string | File;
}
