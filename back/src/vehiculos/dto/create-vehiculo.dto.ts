import { File } from "buffer";
import { IsOptional, IsString, MinLength } from "class-validator";
export class CreateVehiculoDto {
    @IsString({ message: "Marca_Modelo debe ser una cadena de Texto !" })
    @MinLength(5, { message: "Marca_Modelo debe Tener más de 5 Letras !" })
    marca_modelo: string;

    @IsOptional()
    @IsString({ message: "Dueño debe ser una cadena de Texto !" })
    @MinLength(1, { message: "Dueño debe Tener más 1 caracter !" })
    duenio: string | number;

    @IsString({ message: "Patente debe ser una cadena de Texto AlfaNúmerica !" })
    @MinLength(5, { message: "Patente debe Tener más de 5 Caracteres !" })
    patente: string;

    @IsString({ message: "Color debe ser una cadena de Texto !" })
    @MinLength(3, { message: "Color debe Tener más de 3 Letras !" })
    color: string;

    @IsOptional()
    imagen: string | File;
}
