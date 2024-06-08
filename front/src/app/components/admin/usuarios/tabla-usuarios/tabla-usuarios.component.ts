import { Component } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsuariosService } from '../../../../services/usuarios.service';
import { GlobalService } from '../../../../services/Global.service';
@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['../usuarios.component.css', '../../actividades/actividades.component.css'],
  standalone: true,
  imports: [MatSortModule, MatPaginatorModule]
})
export class TablaUsuariosComponent {

  constructor(protected userService: UsuariosService, protected globalService: GlobalService) { }


}
