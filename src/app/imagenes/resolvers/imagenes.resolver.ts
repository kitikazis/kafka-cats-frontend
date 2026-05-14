import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Imagen } from '../models/imagen.model';
import { ImagenesService } from '../imagenes.service';

@Injectable({
  providedIn: 'root',
})
export class ImagenesResolver implements Resolve<Imagen[]> {
  constructor(private imagenesService: ImagenesService) {}

  resolve(): Observable<Imagen[]> {
    return this.imagenesService.getImagenes();
  }
}
