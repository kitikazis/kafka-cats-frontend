import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagenesListComponent } from './pages/imagenes-list/imagenes-list.component';
import { ImagenesResolver } from './resolvers/imagenes.resolver';

const routes: Routes = [
  {
    path: '',
    component: ImagenesListComponent,
    resolve: { imagenes: ImagenesResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenesRoutingModule {}
