import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { InformesService } from '../../../services/informes.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css', '../actividades/actividades.component.css'],
  standalone: true,
  imports: [CommonModule, BaseComponent, MatPaginator, MatSortModule, MatProgressBarModule]
})
export default class InformesComponent implements OnInit {

  constructor(protected infoService: InformesService, private paginatorIntl: MatPaginatorIntl) { }

  ngOnInit(): void {
    this.infoService.pageInformes()
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por Página';
    this.paginatorIntl.nextPageLabel = 'Página Siguiente';
    this.paginatorIntl.previousPageLabel = 'Página Anterior';
  }

}

