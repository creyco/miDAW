import { IsInt, IsOptional, IsString } from "class-validator"

export class CreateFacturaDto {
    @IsInt()
    vehiculo: number

    @IsString()
    importes: string

    @IsInt()
    total: number
}
