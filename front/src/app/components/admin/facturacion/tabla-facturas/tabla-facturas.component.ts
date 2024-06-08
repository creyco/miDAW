import { DatePipe, CurrencyPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Facturas } from '../../../../interfaces/Facturas';
import { FacturacionService } from '../../../../services/facturacion.service';
import { GlobalService } from '../../../../services/Global.service';

@Component({
  selector: 'app-tabla-facturas',
  templateUrl: './tabla-facturas.component.html',
  styleUrls: ['../../actividades/actividades.component.css', '../../clientes/clientes.component.css', '../../usuarios/usuarios.component.css', '../facturacion.component.css'],
  standalone: true,
  imports: [DatePipe, CurrencyPipe, MatSortModule, MatMenuModule, MatPaginatorModule]
})
export class TablaFacturasComponent {

  constructor(protected facService: FacturacionService, protected globalService: GlobalService,
    public dialogDeleteFactura: MatDialog,) { }

  openDialog(factura: Facturas): void {
    console.log("Factura delete: ", factura)
    this.dialogDeleteFactura.open(DialogFacturas, {
      width: '60%',
      data: factura
    });
  }

}
@Component({
  selector: 'delete-factura',
  templateUrl: '../delete-factura.html',
  styleUrls: ['../../actividades/actividades.component.css', '../facturacion.component.css'],
  standalone: true,
  imports: [DatePipe, CurrencyPipe, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogFacturas {
  constructor(@Inject(MAT_DIALOG_DATA) protected factura: Facturas, protected facService: FacturacionService) { }
  index2: number = 0;
}

