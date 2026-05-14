import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Favorito, Imagen } from '../../models/imagen.model';
import { ImagenesService } from '../../imagenes.service';

@Component({
  selector: 'app-imagenes-list',
  templateUrl: './imagenes-list.component.html',
  styleUrls: ['./imagenes-list.component.scss'],
  standalone: false,
})
export class ImagenesListComponent implements OnInit {
  imagenes: Imagen[] = [];
  favoritos: Favorito[] = [];
  selectedFavoritoId: number | null = null;
  showFavoritosPanel = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private imagenesService: ImagenesService,
  ) {}

  ngOnInit(): void {
    this.imagenes = this.route.snapshot.data['imagenes'];
    this.cargarFavoritos();
  }

  addFavorito(imageId: string): void {
    this.errorMessage = null;
    this.imagenesService.agregarFavorito(imageId).subscribe({
      next: () => this.cargarFavoritos(),
      error: (err) => {
        this.errorMessage = `No se pudo agregar a favoritos. ${this.getErrorDetail(err)}`;
      },
    });
  }

  cargarFavoritos(): void {
    this.errorMessage = null;
    this.imagenesService.getFavoritos().subscribe({
      next: (data) => (this.favoritos = data),
      error: (err) => {
        this.errorMessage = `No se pudieron cargar los favoritos. ${this.getErrorDetail(err)}`;
      },
    });
  }

  toggleFavoritosPanel(): void {
    this.showFavoritosPanel = !this.showFavoritosPanel;
  }

  seleccionarFavorito(favoritoId: number): void {
    this.selectedFavoritoId = favoritoId;
    this.copyFavoritoId(favoritoId);
  }

  recargarImagenes(): void {
    this.errorMessage = null;
    this.imagenesService.getImagenes(true).subscribe({
      next: (data) => {
        this.imagenes = data;
      },
      error: (err) => {
        this.errorMessage = `No se pudieron cargar las imágenes. ${this.getErrorDetail(err)}`;
      },
    });
  }

  copyFavoritoId(favoritoId: number): void {
    const texto = String(favoritoId);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(
        () => {
          alert(`ID de favorito copiado: ${texto}`);
        },
        () => {
          alert(`No se pudo copiar el ID ${texto}.`);
        },
      );
    } else {
      alert(`Copia manualmente este ID: ${texto}`);
    }
  }

  cerrarError(): void {
    this.errorMessage = null;
  }

  private getErrorDetail(err: HttpErrorResponse | Error | any): string {
    if (err?.status === 0)
      return 'No hay conexión con el servidor (verifique que el backend esté corriendo).';
    if (err?.status === 404) return 'Recurso no encontrado (404).';
    if (err?.status === 500) return 'Error interno del servidor (500).';
    if (err?.message) return err.message;
    return 'Error desconocido.';
  }
}
