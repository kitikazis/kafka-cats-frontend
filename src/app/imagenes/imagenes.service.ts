// imagenes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Imagen } from './models/imagen.model';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  private apiUrl = 'http://localhost:3000/imagenes';

  constructor(private http: HttpClient) {}

  getImagenes(): Observable<Imagen[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((response) =>
        response.map((img) => ({
          id: img.id,
          url: img.url,
          width: img.width,
          height: img.height,
        })),
      ),
    );
  }

  agregarFavorito(imageId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/favoritos`, { image_id: imageId });
  }

  getFavoritos(): Observable<Imagen[]> {
    return this.http.get<any[]>(`${this.apiUrl}/favoritos`);
  }
}
