import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './pages/home/home.component';
import { Component } from '@angular/compiler';
import { ExploreComponent } from './pages/explore/explore.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
},
{
path: '',
component: LayoutComponent,
children: [
{
    path: 'home',
    component: HomeComponent
},

{
    path:'explore',
    component: ExploreComponent
},

{
    path: 'settings',      // 👈 Ruta para la página de configuración
                component: SettingsComponent
},

]

},
{
    path: '**',
    component: NotFoundComponent
}
]



