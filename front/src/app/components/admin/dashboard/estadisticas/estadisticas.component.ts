import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['../dashboard.component.css'],
  standalone: true
})
export class EstadisticasComponent {

  @Input('canClientes') canClientes: number = 0;
  @Input('canPendientes') canPendientes: number = 0;
  @Input('canVehiculos') canVehiculos: number = 0;
  @Input('canFacturas') canFacturas: number = 0;
}
