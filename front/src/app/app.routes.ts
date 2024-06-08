import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import HomeComponent from './components/home/home.component';
import { RolGuard } from './guards/rol.guard';
import ClientesComponent from './components/admin/clientes/clientes.component';
import UsuariosComponent from './components/admin/usuarios/usuarios.component';
import InformesComponent from './components/admin/informes/informes.component';
import DashboardComponent from './components/admin/dashboard/dashboard.component';
import ActividadesComponent from './components/admin/actividades/actividades.component';
import { FacturacionComponent } from './components/admin/facturacion/facturacion.component';
import ActivadesMecComponent from './components/mecanico/activadesMec/activadesMec.component';
import { rolesUser } from './enums/rol-user.enum';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard, RolGuard],
        data: {
            rolesAllowed: [rolesUser.ADMINISTRADOR]
        }
    },
    {
        path: 'actividades',
        component: ActividadesComponent,
        canActivate: [authGuard, RolGuard],
        data: {
            rolesAllowed: [rolesUser.ADMINISTRADOR]
        }
    },
    {
        path: 'actividadesMec',
        component: ActivadesMecComponent,
        canActivate: [authGuard, RolGuard],
        data: {
            rolesAllowed: [rolesUser.ADMINISTRADOR, rolesUser.MECANICO]
        }
    },
    {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [authGuard, RolGuard],
        data: {
            rolesAllowed: [rolesUser.ADMINISTRADOR]
        }
    }
    ,
    {
        path: 'usuarios',
        component: UsuariosComponent,        
        canActivate: [authGuard, RolGuard],
        data: {
            rolesAllowed: [rolesUser.ADMINISTRADOR]
        }
    },
    {
        path: 'facturacion',
        component: FacturacionComponent,
        canActivate: [authGuard, RolGuard],
        data: {
            rolesAllowed: [rolesUser.ADMINISTRADOR]
        }
    },
    {
        path: 'informes',
        component: InformesComponent,
        canActivate: [authGuard, RolGuard],
        data: {
            rolesAllowed: [rolesUser.ADMINISTRADOR]
        }
    },

    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    },

];
