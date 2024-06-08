import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../../services/clientes.service';

@Component({
  selector: 'app-formAddCliente',
  templateUrl: './formAddCliente.component.html',
  styleUrls: ['../clientes.component.css'],
  standalone: true
})
export class FormAddClienteComponent {

  constructor(protected cliService: ClientesService) { }

}
