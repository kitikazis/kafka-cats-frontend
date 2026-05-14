import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatosRoutingModule } from './gatos-routing.module';
import { GatosListComponent } from './pages/gatos-list/gatos-list.component';
import { GatoFormComponent } from './pages/gato-form/gato-form.component';

@NgModule({
  declarations: [GatosListComponent, GatoFormComponent],
  imports: [CommonModule, GatosRoutingModule],
})
export class GatosModule {}
