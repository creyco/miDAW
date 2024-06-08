import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Cliente } from '../../../../interfaces/Cliente';
import { ClientesService } from '../../../../services/clientes.service';


@Component({
  selector: 'modal-delete-cliente',
  templateUrl: '../delete-cliente.html',
  styleUrls: ['../../actividades/actividades.component.css', '../clientes.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogDataDelete {
  constructor(@Inject(MAT_DIALOG_DATA) protected cliente: Cliente, protected cliService: ClientesService) { }
}
