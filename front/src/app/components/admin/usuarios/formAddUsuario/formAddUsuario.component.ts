import { Component } from '@angular/core';
import { UsuariosService } from '../../../../services/usuarios.service';
import { GlobalService } from '../../../../services/Global.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-formAddUsuario',
  templateUrl: './formAddUsuario.component.html',
  styleUrls: ['../usuarios.component.css', '../../actividades/actividades.component.css'],
  standalone: true,
  imports: [NgClass]
})
export class FormAddUsuarioComponent {

  constructor(protected userService: UsuariosService, protected globalService: GlobalService) { }


}
