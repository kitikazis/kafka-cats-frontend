// imagenes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Imagen, Favorito } from './models/imagen.model';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  private apiUrl = 'http://localhost:3000/imagenes';

  private imagenesCache$: Observable<Imagen[]> | null = null;
  private favoritosCache$: Observable<Favorito[]> | null = null;

  constructor(private http: HttpClient) {}

  getImagenes(forceReload = false): Observable<Imagen[]> {
    if (!this.imagenesCache$ || forceReload) {
      this.imagenesCache$ = this.http.get<Imagen[]>(this.apiUrl).pipe(
        map((response) =>
          response.map((img) => ({
            id: img.id,
            url: img.url,
            width: img.width,
            height: img.height,
          })),
        ),
        shareReplay(1), // <-- Guarda la respuesta en memoria para futuros suscriptores
      );
    }
    return this.imagenesCache$;
  }

  agregarFavorito(imageId: string): Observable<Favorito> {
    // Al agregar un nuevo favorito, borramos la caché para forzar la descarga de la lista actualizada
    this.favoritosCache$ = null;
    return this.http.post<Favorito>(`${this.apiUrl}/favoritos`, { image_id: imageId });
  }

  getFavoritos(forceReload = false): Observable<Favorito[]> {
    if (!this.favoritosCache$ || forceReload) {
      this.favoritosCache$ = this.http
        .get<Favorito[]>(`${this.apiUrl}/favoritos`)
        .pipe(shareReplay(1));
    }
    return this.favoritosCache$;
  }
}
