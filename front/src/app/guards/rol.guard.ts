import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserData } from '../interfaces/UserData';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {

    const rolesAllowed: string[] = route.data['rolesAllowed'];

    return this.authService.data.pipe(
      map((userData: UserData | null) => {
        if (!rolesAllowed.includes(userData?.rol as string)) {
          this.router.navigate(['/home'])
          return false;
        }
        return true;
      })
    );
  }
}
