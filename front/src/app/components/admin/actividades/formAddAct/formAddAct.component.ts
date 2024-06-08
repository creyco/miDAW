import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../../../services/actividades.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { UsuariosService } from '../../../../services/usuarios.service';

@Component({
  selector: 'app-formAddAct',
  templateUrl: './formAddAct.component.html',
  styleUrls: ['../actividades.component.css'],
  standalone: true
})
export class FormAddActComponent {

  constructor(protected actividadService: ActividadesService, protected vehiService: VehiculoService,
    protected userService: UsuariosService,) { }

}
