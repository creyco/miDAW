import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadesModule } from './actividades/actividades.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { FacturasModule } from './facturas/facturas.module';

require('dotenv').config();

@Module({
  imports: [
    ActividadesModule,
    AuditoriaModule,
    UsuariosModule,
    VehiculosModule,
    AuthModule,
    ClientesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.USER_DB,
      password: process.env.PASS_DB,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    FacturasModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
