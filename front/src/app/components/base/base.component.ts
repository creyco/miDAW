import { Component, OnInit } from '@angular/core';
import { AngularNavComponent } from '../sideNav/sideNav.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  standalone: true, imports: [AngularNavComponent]
})
export class BaseComponent {

}
