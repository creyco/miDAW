import { Component, Inject } from '@angular/core';
import { ClientesService } from '../../../../services/clientes.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { GlobalService } from '../../../../services/Global.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Cliente } from '../../../../interfaces/Cliente';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['../../actividades/actividades.component.css', '../clientes.component.css'],
  standalone: true,
  imports: [MatMenuModule, MatSortModule, MatPaginatorModule]
})
export class TablaClientesComponent {

  constructor(protected cliService: ClientesService, protected globalService: GlobalService,
    private paginatorIntl: MatPaginatorIntl, public dialogDelete: MatDialog
  ) { }

  ngOnInit(): void {
    this.paginatorIntl.itemsPerPageLabel = "Elementos por Pagina";
    this.paginatorIntl.nextPageLabel = 'Página Siguiente';
    this.paginatorIntl.previousPageLabel = 'Página Anterior';
  }
  index: number = 0


  irSiguiente() {
    if (this.cliService.clienteSelected?.vehiculos && this.index < this.cliService.clienteSelected.vehiculos.length - 1) {
      this.index++;
    }
  }
  irAnterior() {
    if (this.cliService.clienteSelected?.vehiculos && this.index > 0) {
      this.index--;
    }
  }

  openDialog(cliente: Cliente): void {
    this.dialogDelete.open(DialogDataDelete, {
      width: '35%',
      data: cliente
    });
  }
}

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

