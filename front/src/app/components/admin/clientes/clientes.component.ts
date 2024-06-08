import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VehiculoService } from '../../../services/vehiculo.service';
import { VehiculosComponent } from '../vehiculos/vehiculos.component';
import { ClientesService } from '../../../services/clientes.service';
import { BaseComponent } from '../../base/base.component';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';
import { FormAddClienteComponent } from './formAddCliente/formAddCliente.component';
import { FormEditClienteComponent } from './formEditCliente/formEditCliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  standalone: true,
  styleUrls: ['./clientes.component.css'],
  imports: [CommonModule, BaseComponent, VehiculosComponent, TablaClientesComponent, FormAddClienteComponent, FormEditClienteComponent, MatProgressBarModule]
})
export default class ClientesComponent {

  constructor(protected vehiService: VehiculoService, protected cliService: ClientesService) { }

  ngOnInit(): void {
    this.vehiService.getVehiculos()
    this.cliService.getClientes()
  }

}

