import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: HomeComponent,
  },
  {
    path: 'imagenes',
    loadChildren: () => import('./imagenes/imagenes.module').then((m) => m.ImagenesModule),
  },
  {
    path: 'gatos',
    loadChildren: () => import('./gatos/gatos.module').then((m) => m.GatosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
