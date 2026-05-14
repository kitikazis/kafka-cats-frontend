import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Imagen } from '../../models/imagen.model';
import { ImagenesService } from '../../imagenes.service';

@Component({
  selector: 'app-imagenes-list',
  templateUrl: './imagenes-list.component.html',
  styleUrls: ['./imagenes-list.component.scss'],
  standalone: false,
})
export class ImagenesListComponent implements OnInit {
  imagenes: Imagen[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private imagenesService: ImagenesService,
  ) {}

  ngOnInit(): void {
    this.imagenes = this.route.snapshot.data['imagenes'];
    console.log('Imágenes cargadas:', this.imagenes);
  }

  addFavorito(imageId: string): void {
    this.errorMessage = null;
    this.imagenesService.agregarFavorito(imageId).subscribe({
      next: () => alert('Imagen agregada a favoritos ✅'),
      error: (err) => {
        this.errorMessage = `No se pudo agregar a favoritos. ${this.getErrorDetail(err)}`;
      },
    });
  }

  recargarImagenes(): void {
    this.errorMessage = null;
    this.imagenesService.getImagenes().subscribe({
      next: (data) => (this.imagenes = data),
      error: (err) => {
        this.errorMessage = `No se pudieron cargar las imágenes. ${this.getErrorDetail(err)}`;
      },
    });
  }

  cerrarError(): void {
    this.errorMessage = null;
  }

  private getErrorDetail(err: any): string {
    if (err?.status === 0)
      return 'No hay conexión con el servidor (verifique que el backend esté corriendo).';
    if (err?.status === 404) return 'Recurso no encontrado (404).';
    if (err?.status === 500) return 'Error interno del servidor (500).';
    if (err?.message) return err.message;
    return 'Error desconocido.';
  }
}
