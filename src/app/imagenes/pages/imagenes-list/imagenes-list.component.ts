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

  constructor(
    private route: ActivatedRoute,
    private imagenesService: ImagenesService,
  ) {}

  ngOnInit(): void {
    this.imagenes = this.route.snapshot.data['imagenes'];
  }

  addFavorito(imageId: string): void {
    this.imagenesService.addFavorito(imageId).subscribe({
      next: () => alert('Imagen agregada a favoritos ✅'),
      error: () => alert('Error al agregar a favoritos ❌'),
    });
  }
}
