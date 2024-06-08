import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { FormAddUsuarioComponent } from './formAddUsuario/formAddUsuario.component';
import { FormEditUsuarioComponent } from './formEditUsuario/formEditUsuario.component';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css', '../actividades/actividades.component.css'],
  standalone: true,
  imports: [CommonModule, BaseComponent, TablaUsuariosComponent, FormAddUsuarioComponent, FormEditUsuarioComponent, MatProgressBarModule]
})
export default class UsuariosComponent {
  constructor(protected userService: UsuariosService, private paginatorIntl: MatPaginatorIntl) { }

  ngOnInit(): void {
    this.userService.getUsuarios()
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por Página';
    this.paginatorIntl.nextPageLabel = 'Página Siguiente';
    this.paginatorIntl.previousPageLabel = 'Página Anterior';
  }

}
