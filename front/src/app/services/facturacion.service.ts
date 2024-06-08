import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './Global.service';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from '../interfaces/Vehiculo';
import { FacturaDto } from '../interfaces/FacturaDto';
import { Facturas } from '../interfaces/Facturas';
import { Sort } from '@angular/material/sort';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { environmentDev } from '../../environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(private http: HttpClient, private toastr: ToastrService, private globalService: GlobalService, protected vehiService: VehiculoService) { }
  tabFacturacion: boolean = true;
  formAdd: boolean = false;
  loading: boolean = true;
  longitud: number = 0;
  facturas: Facturas[] = [];
  vehiculoSearch?: Vehiculo
  msj?: string
  importeTotal: number = 0;

  getFacturas(index: number = 0, size: number = 10): void {
    this.http.get<{ total: number, data: Facturas[] }>(`${environmentDev.apiUrl}/facturas/${index}/${size}`)
      .subscribe(res => {
        this.facturas = res.data
        this.longitud = res.total
        setTimeout(() => { this.loading = false }, 600)
      }, error => {
        console.log(error);
        setTimeout(() => { this.loading = false }, 600)
        if (!error.ok) this.toastr.error('Error al Traer Facturas desde el Servidor!', "FACTURACIÓN", { timeOut: 5000, closeButton: true });
      })
  }

  createFactura(formulario: HTMLFormElement) {
    const form: FormData = new FormData(formulario)
    const newFacturaDto = new FacturaDto()
    newFacturaDto.vehiculo = this.vehiculoSearch?.id_vehiculo
    const aux = []
    for (let [key, value] of (form as any).entries()) {
      aux.push(value)
    }
    newFacturaDto.importes = aux.toString()
    newFacturaDto.total = this.importeTotal
    this.http.post<{ message: string }>(`${environmentDev.apiUrl}/facturas`, newFacturaDto)
      .subscribe(res => {
        this.toastr.success(res.message, "FACTURACIÓN", { timeOut: 5000, closeButton: true });
        this.vehiculoSearch = undefined
        this.getFacturas()
      }, error => {
        console.log(error.status);
        if (error.status == 404) {
          this.toastr.error(`${error.error.message}`, "FACTURACIÓN", { timeOut: 5000, closeButton: true });
        } else if (error.status != 404) {
          this.toastr.error(`Error al Crear Factura !`, "FACTURACIÓN", { timeOut: 5000, closeButton: true });
        }
      })
  }

  deleteFactura(id_factura: number) {
    this.http.delete<{ message: string }>(`${environmentDev.apiUrl}/facturas/${id_factura}`)
      .subscribe(res => {
        console.log("Res Delete Facturas >> ", res)
        this.toastr.success(res.message, "FACTURACIÓN", { timeOut: 5000, closeButton: true });
        this.getFacturas()
      }, error => {
        console.log(error);
        this.toastr.error(`Error al Eliminar Factura !`, "FACTURACIÓN", { timeOut: 5000, closeButton: true });

      })
  }


  searchVehiculo(patente: string) {
    patente = patente.replace(/\s/g, '').toUpperCase();

    this.http.post<Vehiculo>(`${environmentDev.apiUrl}/vehiculos/buscar-patente`, { patente })
      .subscribe(res => {
        this.vehiculoSearch = res
      }, error => {

        this.vehiculoSearch = undefined
        this.msj = "No se Encontraron Resultados !!";
      })
  }

  downloadFactura(factura: Facturas) {
    const fecha_actual = new Date().toISOString().split("T")[0]
    try {
      const doc = new jsPDF();
      doc.setFontSize(16)
      const heads: string[][] = [['DESCRIPCIÓN', 'PRECIO UNITARIO', "IVA", "TOTAL"]]
      let Body: any = [];
      let importeTotal = 0
      for (let i = 0; i < factura.vehiculo.actividades.length; i++) {
        Body.push([
          factura.vehiculo.actividades[i].descripcion, `$ ${factura.importes.split(",")[i]}`,
          `$ ${(Number(factura.importes.split(",")[i]) * 0.21)}`,
          `$ ${(Number(factura.importes.split(",")[i]) * 0.21) + (Number(factura.importes.split(",")[i]))}`
        ]);

        importeTotal += (Number(factura.importes.split(",")[i]) * 0.21) + (Number(factura.importes.split(",")[i]))
      }
      doc.setFontSize(24)
      doc.text(`FACTURA`, 140, 20);
      doc.text(`ASTRA MECANICA`, 15, 20);
      doc.text("________________", 15, 21)
      doc.setFontSize(12)
      doc.text(`Cuit: 30-70645678-9.`, 15, 35);
      doc.text(`Direccion: Av de las Americas 2390.`, 15, 45);
      doc.text(`Telefono: 422-192260.`, 15, 55);
      doc.text(`Email: astra_mecanica@gmail.com.`, 15, 65);
      doc.text(`Fecha: ${fecha_actual}.`, 140, 35);
      doc.text("_______________________", 140, 38)
      doc.text(`N° de Factura: ${factura.id_factura}.`, 140, 45);

      doc.text("________________________________", 15, 85)
      doc.text(`Cliente: ${factura.vehiculo.duenio.apellido} ${factura.vehiculo.duenio.nombre}.`, 15, 95);
      doc.text(`Cuit: ${factura.vehiculo.duenio.cuit}.`, 15, 105);
      doc.text(`Direccion: ${factura.vehiculo.duenio.domicilio}.`, 15, 115);
      doc.text("________________________________", 15, 120)


      doc.text("________________________", 140, 85)
      doc.text(`Vehiculo: ${factura.vehiculo.marca_modelo}.`, 140, 95);
      doc.text(`Patente: ${factura.vehiculo.patente}.`, 140, 105);
      doc.text("_______________________", 140, 120)

      autoTable(doc, {
        head: heads, body: Body, startY: 135, theme: 'striped',
        margin: { top: 5 },
        styles: {
          overflow: 'linebreak',
          fontSize: 11,
          cellPadding: 1,
          halign: 'left',
        }
      });

      doc.setFontSize(18)
      doc.text(`Importe Total: $ ${importeTotal}`, 120, (autoTable.length * 100));
      doc.text("___________", 130, (autoTable.length * 100) + 2)

      doc.save(`factura_${factura.id_factura}_${factura.vehiculo.duenio.apellido}_${factura.vehiculo.duenio.nombre}_${fecha_actual}.pdf`);

    } catch (error) {
      console.log("Error Download >> ", error)
    }
  }

  sortData(sort: Sort) {
    const data = this.facturas.slice();
    if (!sort.active || sort.direction === '') {
      this.facturas = data;
      return;
    }

    this.facturas = data.sort((a: Facturas, b: Facturas) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id_factura, b.id_factura, isAsc);
        case 'cuit':
          return compare(a.vehiculo.duenio.cuit, b.vehiculo.duenio.cuit, isAsc);
        case 'cliente':
          return compare(a.vehiculo.duenio.apellido, b.vehiculo.duenio.apellido, isAsc);
        case 'vehiculo':
          return compare(a.vehiculo.marca_modelo, b.vehiculo.marca_modelo, isAsc);
        case 'patente':
          return compare(a.vehiculo.patente, b.vehiculo.patente, isAsc);
        case 'importe':
          return compare(a.total, b.total, isAsc);
        case 'fecha':
          return compare(a.fecha_creacion, b.fecha_creacion, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}