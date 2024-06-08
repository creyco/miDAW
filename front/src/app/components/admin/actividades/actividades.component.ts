import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActividadesService } from '../../../services/actividades.service';
import { Tabla_actividadesComponent } from './tabla_actividades/tabla_actividades.component';
import { FormAddActComponent } from './formAddAct/formAddAct.component';
import { FormEditActComponent } from './formEditAct/formEditAct.component';
import { UsuariosService } from '../../../services/usuarios.service';
import { VehiculoService } from '../../../services/vehiculo.service';
@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, Tabla_actividadesComponent, BaseComponent,
    FormAddActComponent, FormEditActComponent]
})
export default class ActividadesComponent {
  constructor(protected actividadService: ActividadesService, protected userService: UsuariosService, protected vehiService: VehiculoService) { }


  ngOnInit(): void {
    this.actividadService.getActividades()
    this.userService.getUsuarios()
    this.vehiService.getVehiculos()
  }

}