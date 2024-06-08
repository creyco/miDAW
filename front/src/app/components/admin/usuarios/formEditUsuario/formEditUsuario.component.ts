import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GlobalService } from '../../../../services/Global.service';
import { UsuariosService } from '../../../../services/usuarios.service';

@Component({
  selector: 'app-formEditUsuario',
  templateUrl: './formEditUsuario.component.html',
  styleUrls: ['../usuarios.component.css', '../../actividades/actividades.component.css'],
  standalone: true,
  imports: [NgClass, NgIf]
})
export class FormEditUsuarioComponent {

  constructor(protected userService: UsuariosService, protected globalService: GlobalService) { }
  pass1: string = ''
  pass2: string = ''

}
