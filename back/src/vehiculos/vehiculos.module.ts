import { Module } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculos } from './entities/vehiculos.entity';
import { ClientesModule } from 'src/clientes/clientes.module';
@Module({
  imports: [ClientesModule, TypeOrmModule.forFeature([Vehiculos])],
  controllers: [VehiculosController],
  providers: [VehiculosService],
})
export class VehiculosModule { }
