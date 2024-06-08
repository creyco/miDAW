import { Component } from '@angular/core';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { ClientesService } from '../../../../services/clientes.service';

@Component({
  selector: 'app-formAddVehiculo',
  templateUrl: './formAddVehiculo.component.html',
  styleUrls: ['../../actividades/actividades.component.css', '../../clientes/clientes.component.css',
    '../../usuarios/usuarios.component.css'],
  standalone: true,
})
export class FormAddVehiculoComponent {

  constructor(protected vehiService: VehiculoService, protected cliService: ClientesService) { }


}
