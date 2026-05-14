import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatosListComponent } from './pages/gatos-list/gatos-list.component';
import { GatoFormComponent } from './pages/gato-form/gato-form.component';
import { GatosResolver } from './resolvers/gatos.resolver';
import { GatoDetailResolver } from './resolvers/gato-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: GatosListComponent,
    resolve: { gatos: GatosResolver },
  },
  {
    path: 'nuevo',
    component: GatoFormComponent,
  },
  {
    path: 'editar/:id',
    component: GatoFormComponent,
    resolve: { gato: GatoDetailResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GatosRoutingModule {}
