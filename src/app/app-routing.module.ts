import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'imagenes',
    loadChildren: () =>
      import('./imagenes/imagenes-routing.module').then((m) => m.ImagenesRoutingModule),
  },
  {
    path: 'gatos',
    loadChildren: () => import('./gatos/gatos-routing.module').then((m) => m.GatosRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
