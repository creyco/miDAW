import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { TablaFacturasComponent } from './tabla-facturas/tabla-facturas.component';
import { FormAddFacturaComponent } from './formAddFactura/formAddFactura.component';
import { FacturacionService } from '../../../services/facturacion.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorIntl } from '@angular/material/paginator';


@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['../actividades/actividades.component.css', '../clientes/clientes.component.css', '../usuarios/usuarios.component.css', './facturacion.component.css'],
  standalone: true,
  imports: [CommonModule, BaseComponent, TablaFacturasComponent, FormAddFacturaComponent, MatProgressBarModule]
})
export class FacturacionComponent implements OnInit {

  constructor(protected facService: FacturacionService, private paginatorIntl: MatPaginatorIntl,
  ) { }

  ngOnInit() {
    this.facService.getFacturas()
    this.paginatorIntl.itemsPerPageLabel = "Elementos por Pagina";
    this.paginatorIntl.nextPageLabel = 'Página Siguiente';
    this.paginatorIntl.previousPageLabel = 'Página Anterior';
  }


}

