import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
require('dotenv').config();

async function bootstrap() {
  const server = express();
  server.use(express.static(join(__dirname, '..', 'public')));
  //Se crea una instancia de Express.
  //Se configura Express para servir archivos estáticos desde el directorio public.
  //
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  // Creación de la aplicación Nest con un adaptador Express:
  app.setGlobalPrefix("api/v1");
  // Se establece el prefijo global para todas las rutas de la aplicación.
  // Todas las rutas de la API estarán precedidas por /api/v1.
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization']
  })
  // Se habilita CORS para permitir el acceso desde el front-end.

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  // ClassSerializerInterceptor: Maneja la serialización de las respuestas.
  // ValidationPipe: Valida las solicitudes entrantes:
    // whitelist: Remueve propiedades no especificadas en los DTOs.
    // forbidNonWhitelisted: Lanza errores si hay propiedades no permitidas.
    // transform: Transforma los datos entrantes al tipo esperado

  const config = new DocumentBuilder()
    .setTitle('Api DAW')
    .setDescription('Documentacion Correspondiente a la Api desarrollada para el Proyecto Final de la Materia Desarrollo de Aplicaciones Web 2024.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, document);
  // Se crea el módulo de documentación de Swagger.

  await app.listen(process.env.PUERTO);
  // Iniciar la aplicación en el puerto especificado en las variables de entorno:
}
bootstrap();
