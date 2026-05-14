import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imagen, Favorito } from './models/imagen.model';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  private apiUrl = 'http://localhost:3000/imagenes';

  constructor(private http: HttpClient) {}

  getImagenes(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.apiUrl);
  }

  addFavorito(imageId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/favoritos`, { image_id: imageId });
  }

  getFavoritos(): Observable<Favorito[]> {
    return this.http.get<Favorito[]>(`${this.apiUrl}/favoritos`);
  }
}
