import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, map, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserData } from '../interfaces/UserData';
import { LoginDto } from '../interfaces/LoginDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { rolesUser } from '../enums/rol-user.enum';
import { environmentDev } from '../../environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  get currentUserData(): UserData | null {

    const token: string | null = sessionStorage.getItem('sesionData');
    return token ? new JwtHelperService().decodeToken(token) : null;
  }

  private userSubject = new BehaviorSubject<UserData | null>(null);

  get data(): Observable<UserData | null> {
    return this.userSubject.asObservable().pipe(
      map(() => {
        const token: string | null = sessionStorage.getItem('sesionData');
        return token ? new JwtHelperService().decodeToken(token) : null;
      })
    );
  }

  login(loginData: LoginDto): void {
    this.http.post<{ token: string }>(`${environmentDev.apiUrl}/auth/login`, loginData).pipe(delay(1000))
      .subscribe(res => {
        sessionStorage.setItem('sesionData', res.token);
        if (new JwtHelperService().decodeToken(res.token)['rol'] === rolesUser.ADMINISTRADOR) {
          this.router.navigate(['/dashboard'])
        } else {
          this.router.navigate(['/actividadesMec'])
        }
      }, error => {
        console.log("Error", error)
        this.toastr.error(error.error.message, "",
          { timeOut: 4000, closeButton: true, positionClass: 'toast-bottom-center', });
      });
  }

  isLoggeIn(): Observable<boolean> {
    const token: string | null = sessionStorage.getItem('sesionData');
    return !token ? of(false) : of(true);
  }

  logout(): void {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 600)
    sessionStorage.removeItem('sesionData');
  }

}
