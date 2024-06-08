import { inject, Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { routes } from '../app.routes';

export function authGuard(): boolean | Observable<boolean> {

    const authService = inject(AuthService)
    const router = inject(Router);

    return authService.isLoggeIn()
        .pipe(
            tap(isLogin => {
                if (!isLogin) router.navigate(['/home'])
            })
        );
}


