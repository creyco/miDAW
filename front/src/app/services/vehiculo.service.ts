import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Vehiculo } from '../interfaces/Vehiculo';
import { Sort } from '@angular/material/sort';
import { GlobalService } from './Global.service';
import { ClientesService } from './clientes.service';
import { environmentDev } from '../../environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient, private toastr: ToastrService, private globalService: GlobalService
    , private clienteService: ClientesService) { }
  vehiculos: Vehiculo[] = []
  tabVehiculos: boolean = false;
  formAdd: boolean = false
  formEdit: boolean = false
  loading: boolean = true;
  longitud: number = 0
  imgVehiculo?: string
  vehiculoEdit?: Vehiculo | null

  getVehiculos(index: number = 0, size: number = 5): void {
    this.http.get<{ total: number, data: Vehiculo[] }>(`${environmentDev.apiUrl}/vehiculos/${index}/${size}`)
      .subscribe(res => {
        this.vehiculos = res.data
        this.longitud = res.total
        setTimeout(() => { this.loading = false }, 800)
      }, error => {
        console.log(error);
        setTimeout(() => { this.loading = false }, 800)
        if (!error.ok) this.toastr.error('Error al Traer Vehiculos desde el Servidor!', "VEHICULOS", { timeOut: 5000, closeButton: true });
      })
  }

  createVehiculo(e: Event): void {
    e.preventDefault()
    const form: FormData = new FormData((e.target as HTMLFormElement))

    this.http.post<{ message: string }>(`${environmentDev.apiUrl}/vehiculos`, form)
      .subscribe(res => {
        this.toastr.success(res.message, "VEHICULOS", { timeOut: 5000, closeButton: true });
        (e.target as HTMLFormElement).reset()
        this.imgVehiculo = ""
        this.getVehiculos()
      }, error => {
        console.log(error);
        if (!error.ok) this.toastr.error(`Error al Crear Vehiculo !`, "VEHICULOS", { timeOut: 5000, closeButton: true });
      })
  }

  editVehiculo(e: Event, id_vehiculo: number | undefined = this.vehiculoEdit?.id_vehiculo): void {
    e.preventDefault();
    const form: FormData = new FormData((e.target as HTMLFormElement))

    this.http.patch<{ message: string }>(`${environmentDev.apiUrl}/vehiculos/${id_vehiculo}`, form)
      .subscribe(res => {
        this.toastr.success(res.message, "VEHICULOS", { timeOut: 5000, closeButton: true });
        if (this.imgVehiculo) (this.vehiculoEdit as Vehiculo).pathImage = this.imgVehiculo as string; // consulto si existe una url de imagen insertada para no dejar vacio el contenedor de imagenes al resetear el form
        this.imgVehiculo = "";
        this.getVehiculos();
      }, error => {
        console.log(error);
        if (!error.ok) this.toastr.error(`Error al Actualizar Vehiculo !`, "VEHICULOS", { timeOut: 5000, closeButton: true });
      })
  }

  insertImg(e: Event): void {
    const lector = new FileReader()
    lector.onload = () => {
      (this.imgVehiculo as any) = lector.result
    }
    lector.readAsDataURL((e.target as any).files[0]);
  }

  sortData(sort: Sort) {
    const data = this.vehiculos.slice();
    if (!sort.active || sort.direction === '') {
      this.vehiculos = data;
      return;
    }

    this.vehiculos = data.sort((a: Vehiculo, b: Vehiculo) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'marca_modelo':
          return compare(a.marca_modelo, b.marca_modelo, isAsc);
        case 'patente':
          return compare(a.patente, b.patente, isAsc);
        case 'color':
          return compare(a.color, b.color, isAsc);
        case 'duenio':
          return compare(a.duenio.apellido, b.duenio.apellido, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

