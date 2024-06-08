
import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateActividadesDto {
    @IsString({ message: 'Descripcion debe ser una Cadena de Texto !' })
    @MinLength(5, { message: 'Descripcion debe Tener más de 5 letras !' })
    descripcion: string;

    @IsInt({ message: "ID de Usuario debe ser un Número !" })
    usuario_actual: number;

    @IsInt({ message: "ID del Vehiculo debe ser un Número !" })
    vehiculo: number;

    @IsString({ message: 'Prioridad debe ser una Cadena de Texto !' })
    @MinLength(4, { message: 'Prioridad debe Tener más de 4 letras !' })
    prioridad: string;

    @IsString({ message: 'Estado debe ser una Cadena de Texto !' })
    @IsOptional()
    @MinLength(4, { message: 'Prioridad debe Tener más de 4 letras !' })
    estado: string;
}
