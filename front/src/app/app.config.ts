import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  //Proporciona el enrutador con las rutas definidas en app.routes.

    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr({ maxOpened: 1 }),
  ]
};
/*
El AuthInterceptor está diseñado para añadir el encabezado Authorization a las solicitudes HTTP si hay un token disponible en sessionStorage, lo cual es una práctica común y adecuada para manejar la autenticación en aplicaciones web.
*/