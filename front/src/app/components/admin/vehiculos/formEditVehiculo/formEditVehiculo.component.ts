import { Component } from '@angular/core';
import { ClientesService } from '../../../../services/clientes.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

@Component({
  selector: 'app-formEditVehiculo',
  templateUrl: './formEditVehiculo.component.html',
  styleUrls: ['../../actividades/actividades.component.css', '../../clientes/clientes.component.css',
    '../../usuarios/usuarios.component.css'],
  standalone: true,
})
export class FormEditVehiculoComponent {

  constructor(protected vehiService: VehiculoService, protected cliService: ClientesService) { }


}
