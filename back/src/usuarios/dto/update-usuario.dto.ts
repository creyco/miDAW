import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
}
