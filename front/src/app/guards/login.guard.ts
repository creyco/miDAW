import { inject } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { UserData } from "../interfaces/UserData";
import { rolesUser } from "../enums/rol-user.enum";


export const loginGuard = (): Observable<boolean> | boolean => {
    const authService = inject(AuthService)
    const router = inject(Router);
    return authService.data
        .pipe(
            tap(data => {
                if (data && authService.currentUserData?.rol === rolesUser.ADMINISTRADOR) router.navigate(['/dashboard'])
                if (data && authService.currentUserData?.rol === rolesUser.MECANICO) router.navigate(['/actividadesMec']);
            }),
            map(data => !data)
        );
}