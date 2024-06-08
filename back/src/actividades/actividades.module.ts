import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividades } from './entities/actividades.entity';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Actividades, Usuarios])],
  controllers: [ActividadesController],
  providers: [ActividadesService],
})
export class ActividadesModule { }
