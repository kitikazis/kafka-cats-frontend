import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenesRoutingModule } from './imagenes-routing.module';
import { ImagenesListComponent } from './pages/imagenes-list/imagenes-list.component';

@NgModule({
  declarations: [ImagenesListComponent],
  imports: [CommonModule, ImagenesRoutingModule],
})
export class ImagenesModule {}
