import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Usuario } from '../interfaces/Usuario';
import { Sort } from '@angular/material/sort';
import { UsuarioDto } from '../interfaces/UsuarioDto';
import { estadosUser } from '../enums/estado-user.enum';
import { environmentDev } from '../../environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService) { }

  longitud: number = 0
  loading: boolean = true
  usuarios: Usuario[] = []
  userEdit?: Usuario
  tabUser: boolean = true
  formAdd: boolean = false
  formEdit: boolean = false
  imgUsuario?: string

  getUsuarios(index: number = 0, size: number = 10): void {
    this.http.get<any>(`${environmentDev.apiUrl}/usuarios/${index}/${size}`)
    .subscribe(res => {

        this.longitud = res.total;
        this.usuarios = res.data as Usuario[]
        setTimeout(() => { this.loading = false }, 800)

      }, error => {
        console.log(error);
        setTimeout(() => { this.loading = false }, 800)
        if (!error.ok) this.toastr.error('Error al Traer Usuarios desde el Servidor!', "USUARIOS", { timeOut: 5000, closeButton: true });
      })
  }

  createUser(e: Event): void {
    e.preventDefault();
    const form: FormData = new FormData((e.target as HTMLFormElement))
    const newUserDto = new UsuarioDto()
    for (let [key, value] of (form as any).entries()) {
      (newUserDto as any)[key] = value;
    }

    this.http.post(`${environmentDev.apiUrl}/usuarios`, newUserDto)
      .subscribe(res => {
        this.toastr.success((res as any).message, "USUARIOS", { timeOut: 5000, closeButton: true });
        (e.target as HTMLFormElement).reset()
        this.imgUsuario = ""
        this.getUsuarios()
      }, error => {
        console.log(error);
        if (!error.ok) this.toastr.error(`Error al Crear Usuario !`, "USUARIOS", { timeOut: 5000, closeButton: true });
      })

  }

  editUser(e: Event, id_usuario: number | undefined = this.userEdit?.id_usuario): void {
    e.preventDefault()
    const form: FormData = new FormData((e.target as HTMLFormElement))
    const editUserDto = new UsuarioDto()
    for (let [key, value] of (form as any).entries()) {
      (editUserDto as any)[key] = value;
    }
    if (!editUserDto.contrasenia) editUserDto.contrasenia = this.userEdit?.contrasenia

    this.http.patch(`${environmentDev.apiUrl}/usuarios/${id_usuario}`, editUserDto)
      .subscribe(res => {
        this.toastr.success((res as any).message, "USUARIOS", { timeOut: 5000, closeButton: true });
        
        //pathImage = this.imgUsuario as string;
        //this.imgUsuario = "";
        this.getUsuarios();
      }, error => {
        console.log(error);
        if (!error.ok) this.toastr.error(`Error al Actualizar Usuario !`, "USUARIOS", { timeOut: 5000, closeButton: true });
      })
  }

  findUser(id_usuario: number | undefined) {
    this.http.get <Usuario>(`${environmentDev.apiUrl}/usuarios/${id_usuario}`)
     .subscribe(usuario => {
      if (usuario) this.userEdit = usuario;      
      }, error => {
        console.log(error);
        if (!error.ok) this.toastr.error('Error al Traer Usuario desde el Servidor!', "USUARIOS", { timeOut: 5000, closeButton: true });
      })
  }


  insertImg(e: Event): void {
    const lector = new FileReader()
    lector.onload = () => {
      (this.imgUsuario as any) = lector.result
    }
    lector.readAsDataURL((e.target as any).files[0]);
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

  sortData(sort: Sort) {
    const data = this.usuarios.slice();
    if (!sort.active || sort.direction === '') {
      this.usuarios = data;
      return;
    }

    this.usuarios = data.sort((a: Usuario, b: Usuario) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'apellido':
          return compare(a.apellido, b.apellido, isAsc);
        case 'nombre':
          return compare(a.nombre, b.nombre, isAsc);
        case 'nombre_usuario':
          return compare(a.nombre_usuario, b.nombre_usuario, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'rol':
          return compare(a.rol, b.rol, isAsc);
        case 'estado':
          return compare(a.estado, b.estado, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}