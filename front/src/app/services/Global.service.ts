import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  optionsPageSize(longitud: number): number[] {
    const opcionesPageSize: number[] = [];
    // Define un tamaño de página base y un multiplicador para aumentar las opciones
    const tamanoPaginaBase = 10;
    const multiplicador = 2;
    // Calcula las opciones iniciales basadas en el tamanoPaginaBase y el multiplicador
    let tamanoPagina = tamanoPaginaBase;
    while (tamanoPagina <= longitud) {
      opcionesPageSize.push(tamanoPagina);
      tamanoPagina *= multiplicador;
    }
    // Agrega una opción más grande si es necesario
    if (opcionesPageSize.length < 4) {
      opcionesPageSize.push(longitud);
    }
    return opcionesPageSize;
  }

  showPassword: boolean = true
  togglePassword(inputField: HTMLInputElement): void {
    this.showPassword = !this.showPassword;
    inputField.type = this.showPassword ? 'password' : 'text';
  }
}
