import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlobalService } from '../../services/Global.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-home',
  standalone: true,
 imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export default class HomeComponent {
  constructor(private authService: AuthService, protected globalService: GlobalService) { }

  protected sendLoginForm(e: Event, formulario: HTMLFormElement) {
    e.preventDefault();
    const form = new FormData(formulario);
    this.authService.login({ nombre_usuario: form.get('username')?.toString(), contrasenia: form.get('password')?.toString() })
  }
}
