import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { BaseComponent } from '../../base/base.component';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { ClientesService } from '../../../services/clientes.service';
import { ActividadesService } from '../../../services/actividades.service';
import { MatSortModule } from '@angular/material/sort';
import { GlobalService } from '../../../services/Global.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { FacturacionService } from '../../../services/facturacion.service';
import { Tabla_Dashboard } from './tabla_dashboard/tabla_dashboard.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [CommonModule, BaseComponent, MatSortModule, Tabla_Dashboard, EstadisticasComponent]
})
export default class DashboardComponent {
  constructor(protected userService: UsuariosService, protected globalService: GlobalService,
    protected clienteService: ClientesService, protected actService: ActividadesService, protected vehiService: VehiculoService,
    protected facService: FacturacionService) { }

  ngOnInit() {
    this.userService.getUsuarios()
    this.clienteService.getClientes()
    this.actService.getActividades(0, 5)
    this.vehiService.getVehiculos()
    this.facService.getFacturas()
  }
}
