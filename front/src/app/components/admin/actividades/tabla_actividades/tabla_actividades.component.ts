import { Component, Inject } from '@angular/core';
import { ActividadesService } from '../../../../services/actividades.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { GlobalService } from '../../../../services/Global.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Auditoria } from '../../../../interfaces/Auditoria';
@Component({
  selector: 'app-tabla_actividades',
  templateUrl: './tabla_actividades.component.html',
  styleUrls: ['../actividades.component.css'],
  standalone: true,
  imports: [DatePipe, MatMenuModule, MatSortModule, MatPaginatorModule]
})
export class Tabla_actividadesComponent {

  constructor(protected actividadService: ActividadesService, private paginatorIntl: MatPaginatorIntl,
    protected globalService: GlobalService, public dialogAuditoria: MatDialog,) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por Página';
    this.paginatorIntl.nextPageLabel = 'Página Siguiente';
    this.paginatorIntl.previousPageLabel = 'Página Anterior';
  }

  openDialog(auditorias: Auditoria[]): void {
    this.dialogAuditoria.open(DialogAuditoria, {
      width: 'fit-content',
      data: auditorias
    });
  }

}

@Component({
  selector: 'dialog-auditoria',
  templateUrl: '../detalles-actividad.html',
  styleUrls: ['../../actividades/actividades.component.css'],
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAuditoria {
  constructor(@Inject(MAT_DIALOG_DATA) protected auditorias: Auditoria[], protected actService: ActividadesService) { }
}
