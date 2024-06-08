import { Component } from '@angular/core';
import { FacturacionService } from '../../../../services/facturacion.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-formAddFactura',
  templateUrl: './formAddFactura.component.html',
  standalone: true,
  styleUrls: ['../../actividades/actividades.component.css', '../../clientes/clientes.component.css', '../../usuarios/usuarios.component.css', '../facturacion.component.css'],
  imports: [CurrencyPipe]
})
export class FormAddFacturaComponent {

  constructor(protected facService: FacturacionService,) { }

  btn_activate: boolean = true;
  index: number = 0;

  calcularImporte(e: Event) {
    e.preventDefault();
    const form: FormData = new FormData((e.target as HTMLFormElement))
    for (let [key, value] of (form as any).entries()) {
      this.facService.importeTotal += parseInt(value);
    }
    this.btn_activate = false;
  }

}
