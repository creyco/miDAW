import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../../services/clientes.service';

@Component({
  selector: 'app-formEditCliente',
  templateUrl: './formEditCliente.component.html',
  styleUrls: ['../clientes.component.css'],
  standalone: true
})
export class FormEditClienteComponent {

  constructor(protected cliService: ClientesService) { }

}
