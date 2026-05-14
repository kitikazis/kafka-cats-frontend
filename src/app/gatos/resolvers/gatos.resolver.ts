import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Gato } from '../models/gato.model';
import { GatosService } from '../gatos.service';

@Injectable({
  providedIn: 'root',
})
export class GatosResolver implements Resolve<Gato[]> {
  constructor(private gatosService: GatosService) {}

  resolve(): Observable<Gato[]> {
    return this.gatosService.getGatos();
  }
}
