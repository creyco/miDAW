import { Component, Inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserData } from '../../interfaces/UserData';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-sideNav',
  templateUrl: './sideNav.component.html',
  styleUrls: ['./sideNav.component.css'],
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatMenuModule]
})
export class AngularNavComponent {

  constructor(protected authService: AuthService, private activatedRoute: ActivatedRoute, public dialogUserProfile: MatDialog, protected userService: UsuariosService ) { }
  currentPath = this.activatedRoute.snapshot.url[0].path;
  userData?: UserData | null;
  
  openDialog(userData?: UserData | null): void {
    this.dialogUserProfile.open(userProfileDialog, {
      width: '250px',
      data: userData
    });
  } 

  ngOnInit() {
    if (sessionStorage.getItem('sesionData')) this.userData = new JwtHelperService().decodeToken(sessionStorage.getItem('sesionData') as string);
  }
}

@Component({
  selector: 'modal-profile-usuario',
  templateUrl: './usuario.dialog.html',
  styleUrls: ['../admin/usuarios/usuarios.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class userProfileDialog {
  constructor(@Inject(MAT_DIALOG_DATA) protected usuario: UserData) { }
}
