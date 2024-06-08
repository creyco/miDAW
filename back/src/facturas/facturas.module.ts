import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facturas } from './entities/factura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facturas])],
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class FacturasModule { }
