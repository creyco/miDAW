import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadesDto } from './create-actividades.dto';

export class UpdateActividadeDto extends PartialType(CreateActividadesDto) { }
