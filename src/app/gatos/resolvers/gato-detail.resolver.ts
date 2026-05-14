import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Gato } from '../models/gato.model';
import { GatosService } from '../gatos.service';

@Injectable({
  providedIn: 'root',
})
export class GatoDetailResolver implements Resolve<Gato> {
  constructor(private gatosService: GatosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Gato> {
    const id = route.paramMap.get('id') as string;
    return this.gatosService.getGato(id);
  }
}
