import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Sort } from '@angular/material/sort';
import { Actividades } from '../interfaces/Actividades';
import { Vehiculo } from '../interfaces/Vehiculo';
import saveAs from 'file-saver';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { GlobalService } from './Global.service';
import { ActividadesDto } from '../interfaces/ActividadesDto';
import { estadoActEnum } from '../enums/estadoAct.enum';
import { prioridadEnum } from '../enums/prioridad.enum';
import { VehiculoService } from './vehiculo.service';
import { environmentDev } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http: HttpClient, private toastr: ToastrService, private vehiService: VehiculoService, private globalService: GlobalService) { }

  #fecha_actual = new Date().toISOString().split('T')[0];
  longitud: number = 0
  loading: boolean = true
  actividades: Actividades[] = []
  actividades_Today: Actividades[] = []
  actividadEdit?: Actividades
  vehiculoSelected?: Vehiculo | null
  pendientes: number = 0
  tabActividades = true
  formAdd = false
  formEdit = false

  getActividades(index: number = 0, size: number = 10): void {
    this.http.get<{ total: number, data: Actividades[], pendientes: number, actToday: Actividades[] }>(`${environmentDev.apiUrl}/actividades/${index}/${size}`)
      .subscribe(res => {
        this.longitud = res.total;
        this.actividades = res.data
        this.actividades_Today = res.actToday;
        this.pendientes = res.pendientes
        setTimeout(() => { this.loading = false }, 800)
      }, error => {
        console.log(error);
        setTimeout(() => { this.loading = false }, 800)
        if (!error.ok) this.toastr.error('Error al Traer Actividades desde el Servidor!', "ACTIVIDADES", { timeOut: 5000, closeButton: true });
      })
  }

  createActividad(e: Event): void {
    e.preventDefault()
    const form: FormData = new FormData((e.target as HTMLFormElement))
    const newActividadDto = new ActividadesDto()
    for (let [key, value] of (form as any).entries()) {
      if (key === "usuario_actual" || key === "vehiculo") {
        (newActividadDto as any)[key] = parseInt(value);
      } else { (newActividadDto as any)[key] = value; }

    }
    console.log("Actividad Dto", newActividadDto)
    this.http.post<{ message: string }>(`${environmentDev.apiUrl}/actividades`, newActividadDto)
      .subscribe(res => {
        console.log("Res Create Actividad >> ", res)
        this.toastr.success(res.message, "ACTIVIDADES", { timeOut: 5000, closeButton: true });
        (e.target as HTMLFormElement).reset()
        this.getActividades()
      }, error => {
        console.log(error);
        if (!error.ok) this.toastr.error(`Error al Crear Actividad !`, "ACTIVIDADES", { timeOut: 5000, closeButton: true });
      })
  }

  editActividad(e: Event, id_actividad: number | undefined = this.actividadEdit?.id_actividad): void {
    e.preventDefault()
    const form: FormData = new FormData((e.target as HTMLFormElement))
    const editActividadDto = new ActividadesDto()

    for (let [key, value] of (form as any).entries()) {
      if (key === "usuario_actual" || key === "vehiculo") {
        (editActividadDto as any)[key] = parseInt(value);
      } else { (editActividadDto as any)[key] = value; }
    }
    this.http.patch<{ message: string }>(`${environmentDev.apiUrl}/actividades/${id_actividad}`, editActividadDto)
      .subscribe(res => {
        this.toastr.success(res.message, "ACTIVIDADES", { timeOut: 5000, closeButton: true });
        this.getActividades()
      }, error => {
        console.log(error);
        if (!error.ok) this.toastr.error(`Error al Actualizar Actividad !`, "ACTIVIDADES", { timeOut: 5000, closeButton: true });
      })
  }

  editEstadoAct(estado: string, id_actividad: number): void {

    const editActividadDto = new ActividadesDto()
    editActividadDto.estado = estado
    this.http.patch<{ message: string }>(`${environmentDev.apiUrl}/actividades/${id_actividad}`, editActividadDto)
      .subscribe(res => {
        this.toastr.success(res.message, "ACTIVIDADES", { timeOut: 5000, closeButton: true });
        this.getActividades()
      }, error => {
        console.log(error);
        if (!error.ok) this.toastr.error(`Error al Actualizar Actividad !`, "ACTIVIDADES", { timeOut: 5000, closeButton: true });
      })
  }

  resetForm(e: Event): void {
    (e.target as HTMLFormElement).reset()
    this.vehiculoSelected = null
    const select_prioridad = document.getElementById("prioridad")
    const select_estado = document.getElementById("estado")
    select_prioridad?.removeAttribute("class")
    select_estado?.removeAttribute("class")
  }

  downloadCSV(): void {

    try {
      const csvString = ['DESCRIPCIÓN', 'PRIORIDAD', 'USUARIO_ACTUAL', 'VEHICULO', 'ESTADO', 'FECHA-HORA'].join(',')
        + '\n' + this.actividades.map(act => {
          return `${act.descripcion},${act.prioridad},${act.usuario_actual.apellido + " " + act.usuario_actual.nombre},${act.vehiculo.marca_modelo},${act.estado},${act.fecha_format}`;
        }).join('\n');

      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, `actividades_${this.#fecha_actual
        }.text`);
    } catch (error) {
      this.toastr.error(`Error al Guardar CSV: ${error} `, "ACTIVIDADES", { timeOut: 5000, closeButton: true });
    }

  }

  downloadPDF(): void {
    try {
      const doc = new jsPDF();
      const heads: string[][] = [["N°", 'DESCRIPCIÓN', 'PRIORIDAD', 'USUARIO_ACTUAL', 'VEHICULO', 'ESTADO', 'FECHA-HORA']]
      let Body: any = [];

      this.actividades.forEach((act) => {
        const row: any = [
          act.id_actividad, act.descripcion, act.prioridad, act.usuario_actual.apellido + " " + act.usuario_actual.nombre,
          act.vehiculo.marca_modelo, act.estado, `${act.fecha_format} `
        ];
        Body.push(row);
      });

      doc.setFontSize(18)
      doc.text(`LISTA DE ACTIVIDADES: ${this.#fecha_actual} `, 55, 10);
      autoTable(doc, {
        head: heads, body: Body, startY: 20, theme: 'striped',
        margin: { top: 5 },
        styles: {
          overflow: 'linebreak',
          fontSize: 10,
          cellPadding: 1,
          halign: 'left',
        }
      });

      doc.save(`actividades_${this.#fecha_actual}.pdf`);
    } catch (error) {
      this.toastr.error(`Error al Guardar PDF: ${error} `, "ACTIVIDADES", { timeOut: 5000, closeButton: true });
    }
  }

  changeVehiculo(id: string | null): void {
    this.vehiculoSelected = this.vehiService.vehiculos.filter(vehiculo => vehiculo.id_vehiculo === Number(id))[0]
  }


  sortData(sort: Sort) {
    const data = this.actividades.slice();
    if (!sort.active || sort.direction === '') {
      this.actividades = data;
      return;
    }

    this.actividades = data.sort((a: Actividades, b: Actividades) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'descripcion':
          return compare(a.id_actividad, b.id_actividad, isAsc);
        case 'prioridad':
          return compare(a.prioridad, b.prioridad, isAsc);
        case 'mecanico':
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
      case prioridadEnum.BAJA:
      case estadoActEnum.TERMINADA:
        return "status green";
      case prioridadEnum.MEDIA:
      case estadoActEnum.ENPROCESO:
        return "status yellow";
      case prioridadEnum.ALTA:
      case estadoActEnum.PENDIENTE:
        return "status red";
      default:
        return "";
    }
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
