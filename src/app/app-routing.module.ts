import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gatos',
    pathMatch: 'full',
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
