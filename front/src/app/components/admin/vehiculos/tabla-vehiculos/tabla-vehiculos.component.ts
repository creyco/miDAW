import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { GlobalService } from '../../../../services/Global.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-tabla-vehiculos',
  templateUrl: './tabla-vehiculos.component.html',
  styleUrls: ['../../actividades/actividades.component.css', '../../clientes/clientes.component.css', '../../usuarios/usuarios.component.css'],
  standalone: true,
  imports: [MatPaginatorModule, MatSortModule]
})
export class TablaVehiculosComponent {

  constructor(protected globalService: GlobalService, protected vehiService: VehiculoService) { }


}
