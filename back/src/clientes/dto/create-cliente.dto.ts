import { Transform } from 'class-transformer';
import { IsString, MinLength, IsEmail, IsOptional, Matches } from 'class-validator';

export class CreateClienteDto {
    @IsString({ message: 'Nombre debe ser una Cadena de Texto !' })
    @MinLength(3, { message: 'Nombre debe Tener más de 3 letras !' })
    nombre: string;

    @IsString({ message: 'Apellido debe ser una Cadena de Texto !' })
    @MinLength(3, { message: 'Apellido debe Tener más de 3 letras !' })
    apellido: string;

    @IsString({ message: 'Cuit debe ser una Cadena de Texto !' })
    @MinLength(12, { message: 'Cuit debe Tener más de 12 Caracteres !' })
    @Matches(/^(\d{2})-(\d{8})-(\d{1})$/, {
        message: 'Formato de Cuit Incorrecto !',
    })
    cuit: string;

    @Transform(({ value }) => value.trim())
    @IsString({ message: "N° de Telefono debe ser una cadena de Texto !" })
    @MinLength(5, { message: "N° de Telefono debe Tener más de 5 Números !" })
    telefono: string;

    @IsString({ message: "Domicilio debe ser una cadena de Texto !" })
    @MinLength(5, { message: "Domicilio debe Tener más de 5 Números !" })
    domicilio: string;

    @IsOptional()
    @IsString({ message: "Estado debe ser una cadena de Texto !" })
    estado: string;

}
