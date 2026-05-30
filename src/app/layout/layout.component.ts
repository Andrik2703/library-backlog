import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink, 
    RouterOutlet, 
    RouterLinkActive
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public loggedUser: {name: string; key:string; } = {
    name: 'andrik',
    key: 'admin',
  }

  public userOptions: Array<{
    label: string;
    icon: string;
  }> = [
{
  label: 'Profile',
  icon: 'acccount_circle'
},
{
  label: 'Notifications',
  icon: 'notifications'
},
{
  label: 'Activity Log',
  icon: 'history'
},
{
  label: 'Sign Out',
  icon: 'logout'
},
  ];
}
