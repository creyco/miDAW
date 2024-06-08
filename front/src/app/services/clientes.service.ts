import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './Global.service';
import { Cliente } from '../interfaces/Cliente';
import { Sort } from '@angular/material/sort';
import { ClienteDto } from '../interfaces/ClienteDto';
import { estadosUser } from '../enums/estado-user.enum';
import { environmentDev } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient, private toastr: ToastrService, private globalService: GlobalService) { }

  tabClientes: boolean = true;
  formAdd: boolean = false
  formEdit: boolean = false
  clientes: Cliente[] = []
  loading: boolean = true;
  longitud: number = 0
  clienteEdit?: Cliente | null
  isActive: boolean = true;
  clienteSelected?: any

  getClientes(index: number = 0, size: number = 10, estado: number = 1): void {
    this.isActive = true;
    this.http.get<{ total: number, data: Cliente[] }>(`${environmentDev.apiUrl}/clientes/${index}/${size}/${estado}`)
      .subscribe(res => {
        this.clientes = res.data
        this.longitud = res.total
        setTimeout(() => { this.loading = false }, 600)
      }, error => {
        console.log(error);
        setTimeout(() => { this.loading = false }, 600)
        if (!error.ok) this.toastr.error('Error al Traer Clientes desde el Servidor!', "CLIENTES", { timeOut: 5000, closeButton: true });
      })
  }

  createCliente(e: Event): void {
    e.preventDefault()
    const form: FormData = new FormData((e.target as HTMLFormElement))
    const newClienteDto = new ClienteDto()
    for (let [key, value] of (form as any).entries()) {
      (newClienteDto as any)[key] = value
    }

    this.http.post<{ message: string }>(`${environmentDev.apiUrl}/clientes`, newClienteDto)
      .subscribe(res => {
        this.toastr.success(res.message, "CLIENTES", { timeOut: 5000, closeButton: true });
        (e.target as HTMLFormElement).reset()
        this.getClientes()
      }, error => {
        console.log(error);
        if (!error.ok) this.toastr.error(`Error al Crear Cliente !`, "CLIENTES", { timeOut: 5000, closeButton: true });
      })
  }

  editCliente(e: Event, id_cliente: number | undefined = this.clienteEdit?.id_cliente): void {
    e.preventDefault();
    const form: FormData = new FormData((e.target as HTMLFormElement))
    const newClienteDto = new ClienteDto()
    for (let [key, value] of (form as any).entries()) {
      (newClienteDto as any)[key] = value
    }
    this.http.patch<{ message: string }>(`${environmentDev.apiUrl}/clientes/${id_cliente}`, newClienteDto)
      .subscribe(res => {
        this.toastr.success(res.message, "CLIENTES", { timeOut: 5000, closeButton: true });
        this.getClientes()
      }, error => {
        console.log(error);
        if (!error.ok) this.toastr.error(`Error al Crear Cliente !`, "CLIENTES", { timeOut: 5000, closeButton: true });
      })
  }

  deleteCliente(id_cliente: number) {

    this.http.delete<{ message: string }>(`${environmentDev.apiUrl}/clientes/${id_cliente}`)
      .subscribe(res => {

        this.toastr.success(res.message, "CLIENTES", { timeOut: 5000, closeButton: true });
        this.getClientes()
      }, error => {
        console.log(error);
        if (!error.ok) this.toastr.error(`Error al Eliminar Cliente !`, "CLIENTES", { timeOut: 5000, closeButton: true });
      })
  }

  sortData(sort: Sort) {
    const data = this.clientes.slice();
    if (!sort.active || sort.direction === '') {
      this.clientes = data;
      return;
    }

    this.clientes = data.sort((a: Cliente, b: Cliente) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'apellido':
          return compare(a.apellido, b.apellido, isAsc);
        case 'cuit':
          return compare(a.cuit, b.cuit, isAsc);
        case 'telefono':
          return compare(a.telefono, b.telefono, isAsc);
        case 'domicilio':
          return compare(a.domicilio, b.domicilio, isAsc);
        default:
          return 0;
      }
    });
  }

  selectClass(value: string): string {
    value = value.toUpperCase()
    switch (value) {
      case estadosUser.BAJA:
        return "status red";
      case estadosUser.ACTIVO:
        return "status green";
      default:
        return "";
    }
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

