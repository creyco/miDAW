import { Component } from '@angular/core';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ClientesService } from '../../../services/clientes.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { TablaVehiculosComponent } from './tabla-vehiculos/tabla-vehiculos.component';
import { FormAddVehiculoComponent } from './formAddVehiculo/formAddVehiculo.component';
import { FormEditVehiculoComponent } from './formEditVehiculo/formEditVehiculo.component';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['../actividades/actividades.component.css', '../clientes/clientes.component.css', '../usuarios/usuarios.component.css'],
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, TablaVehiculosComponent, FormAddVehiculoComponent, FormEditVehiculoComponent]
})
export class VehiculosComponent {
  constructor(protected vehiService: VehiculoService, protected cliService: ClientesService,
    private paginatorIntl: MatPaginatorIntl
  ) { }

  ngOnInit(): void {
    this.vehiService.getVehiculos()
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por Página';
    this.paginatorIntl.nextPageLabel = 'Página Siguiente';
    this.paginatorIntl.previousPageLabel = 'Página Anterior';
  }

}


