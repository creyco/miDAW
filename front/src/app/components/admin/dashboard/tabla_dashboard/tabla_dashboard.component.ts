import { Component, Input, OnInit } from '@angular/core';
import { Actividades } from '../../../../interfaces/Actividades';
import { ActividadesService } from '../../../../services/actividades.service';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-tabla_dashboard',
  templateUrl: './tabla_dashboard.component.html',
  styleUrls: ['../dashboard.component.css'],
  standalone: true,
  imports: [MatSortModule]
})
export class Tabla_Dashboard {

  constructor(protected actService: ActividadesService) { }

  @Input('data') actividades_Today!: Actividades[];

}
