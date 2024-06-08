import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { ActividadesService } from '../../../services/actividades.service';
import { GlobalService } from '../../../services/Global.service';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { estadoActEnum } from '../../../enums/estadoAct.enum';

@Component({
  selector: 'app-activadesMec',
  templateUrl: './activadesMec.component.html',
  styleUrls: ['../../admin/actividades/actividades.component.css'],
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatSortModule, MatProgressBarModule, BaseComponent]
})
export default class ActivadesMecComponent {

  constructor(protected actividadService: ActividadesService, protected globalService: GlobalService,
    private paginatorIntl: MatPaginatorIntl,) { }

  ngOnInit() {
    this.actividadService.getActividades()
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por Página';
    this.paginatorIntl.nextPageLabel = 'Página Siguiente';
    this.paginatorIntl.previousPageLabel = 'Página Anterior';
  }

  estado = Object.values(estadoActEnum)

  onSubmit(form: HTMLFormElement) {
    console.log("Form submission", form)
    form.submit();
  }
}
