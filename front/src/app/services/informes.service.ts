import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { saveAs } from 'file-saver';
import { Auditoria } from '../interfaces/Auditoria';
import { environmentDev } from '../../environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class InformesService {

  constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService) { }

  #fecha_actual = new Date().toISOString().split('T')[0];
  longitud: number = 0
  loading: boolean = true
  informes: Auditoria[] = []

  pageInformes(index: number = 0, size: number = 10): void {
    this.http.get<any>(`${environmentDev.apiUrl}/auditorias/${index}/${size}`)
      .subscribe(res => {
        this.longitud = res.total;
        this.informes = res.data as Auditoria[]
        setTimeout(() => { this.loading = false }, 800)
      }, error => {
        console.log(error);
        setTimeout(() => { this.loading = false }, 800)
        if (!error.ok) this.toastr.error('Error al Traer Informes del Servidor!', "INFORMES", { timeOut: 5000, closeButton: true });
      })
  }

  downloadCSV(): void {

    try {
      const csvString = ['DESCRIPCIÓN', 'USUARIO_ACTUAL', 'USUARIO_MODIFICACIÓN', 'VEHICULO', 'PATENTE', 'FECHA-HORA', 'OPERACIÓN'].join(',')
        + '\n' + this.informes.map(informe => {
          return `${informe.descripcion},${informe.usuario_actual.apellido + " " + informe.usuario_actual.nombre},${informe.usuario_modificacion.apellido + " " + informe.usuario_modificacion.nombre},${informe.vehiculo.marca_modelo},${informe.vehiculo.patente}, ${informe.fecha_format}, ${informe.operacion}`;
        }).join('\n');

      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, `auditoria_${this.#fecha_actual}.text`);
    } catch (error) {
      this.toastr.error(`Error al Guardar CSV: ${error}`, "INFORMES", { timeOut: 5000, closeButton: true });
    }

  }

  downloadPDF(): void {
    try {
      const doc = new jsPDF();
      const heads: string[][] = [['ACTIVIDAD', 'USUARIO_ACTUAL', 'USUARIO_MODIFICACION', 'VEHICULO', 'PATENTE', 'FECHA_HORA', 'OPERACIÓN',]]
      let Body: any = [];

      this.informes.forEach((info) => {
        const row: any = [
          info.descripcion, info.usuario_actual.apellido + " " + info.usuario_actual.nombre,
          info.usuario_modificacion.apellido + " " + info.usuario_modificacion.nombre,
          info.vehiculo.marca_modelo, info.vehiculo.patente, info.fecha_format, info.operacion
        ];
        Body.push(row);
      });

      doc.setFontSize(16)

      doc.text(`INFORME de AUDITORIAS`, 70, 10);
      autoTable(doc, {
        head: heads, body: Body, startY: 20, theme: 'grid',
        margin: { top: 5 },
        styles: {
          overflow: 'linebreak',
          fontSize: 10,
          cellPadding: 1,
          halign: 'left',
        }
      });

      doc.save(`auditoria_${this.#fecha_actual}.pdf`);
    } catch (error) {
      this.toastr.error(`Error al Guardar PDF: ${error}`, "INFORMES", { timeOut: 5000, closeButton: true });
    }
  }

  sortData(sort: Sort) {
    const data = this.informes.slice();
    if (!sort.active || sort.direction === '') {
      this.informes = data;
      return;
    }

    this.informes = data.sort((a: Auditoria, b: Auditoria) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'descripcion':
          return compare(a.id_auditoria, b.id_auditoria, isAsc);
        case 'prioridad':
          return compare(a.prioridad, b.prioridad, isAsc);
        case 'usuario':
          return compare(a.usuario_actual.nombre_usuario, b.usuario_actual.nombre_usuario, isAsc);
        case 'vehiculo':
          return compare(a.vehiculo.marca_modelo, b.vehiculo.marca_modelo, isAsc);
        case 'patente':
          return compare(a.vehiculo.patente, b.vehiculo.patente, isAsc);
        case 'estado':
          return compare(a.estado, b.estado, isAsc);
        case 'fecha':
          return compare(a.fecha_modificacion, b.fecha_modificacion, isAsc);
        default:
          return 0;
      }
    });
  }

  optionsPageSize(longitud: number): number[] {
    const opcionesPageSize: number[] = [];
    // Define un tamaño de página base y un multiplicador para aumentar las opciones
    const tamanoPaginaBase = 10;
    const multiplicador = 2;
    // Calcula las opciones iniciales basadas en el tamanoPaginaBase y el multiplicador
    let tamanoPagina = tamanoPaginaBase;
    while (tamanoPagina <= longitud) {
      opcionesPageSize.push(tamanoPagina);
      tamanoPagina *= multiplicador;
    }
    // Agrega una opción más grande si es necesario
    if (opcionesPageSize.length < 4) {
      opcionesPageSize.push(longitud);
    }
    return opcionesPageSize;
  }

  selectClass(value: string): string {
    switch (value) {
      case "BAJA":
      case "TERMINADA":
        return "status green";
      case "MEDIA":
      case "EN PROCESO":
        return "status yellow";
      case "ALTA":
      case "PENDIENTE":
        return "status red";
      default:
        return "";
    }
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
