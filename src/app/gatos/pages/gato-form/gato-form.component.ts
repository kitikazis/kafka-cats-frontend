import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenesService } from '../../../imagenes/imagenes.service';
import { Favorito } from '../../../imagenes/models/imagen.model';
import { GatosService } from '../../gatos.service';
import { Gato } from '../../models/gato.model';

@Component({
  selector: 'app-gato-form',
  templateUrl: './gato-form.component.html',
  styleUrls: ['./gato-form.component.scss'],
  standalone: false,
})
export class GatoFormComponent implements OnInit {
  gatoForm: FormGroup;
  favoritos: Favorito[] = [];
  selectedFavorito: Favorito | null = null;
  detalleVisible: number | null = null;
  isEdit = false;
  gatoId: string | null = null;
  errorMessage: string | null = null;
  showModal = false;
  currentPage = 1;
  pageSize = 6;
  paginatedFavoritosList: Favorito[] = [];
  totalPagesCount: number = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gatosService: GatosService,
    private imagenesService: ImagenesService,
  ) {
    this.gatoForm = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      edad: [0, [Validators.required, Validators.min(0)]],
      foto: ['', Validators.required],
      favoritoId: [null],
    });
  }

  ngOnInit(): void {
    this.gatoId = this.route.snapshot.paramMap.get('id');
    if (this.gatoId) {
      this.isEdit = true;
      const gato = this.route.snapshot.data['gato'] as Gato;
      if (gato) {
        this.gatoForm.patchValue(gato);
      }
    }
    this.cargarFavoritos();
  }

  cargarFavoritos(): void {
    this.imagenesService.getFavoritos().subscribe({
      next: (data) => {
        this.favoritos = data;
        const favoritoId = this.gatoForm.get('favoritoId')?.value;
        if (favoritoId != null) {
          this.selectedFavorito = this.favoritos.find((f) => f.id === favoritoId) ?? null;
        }
        this.updatePagination();
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar los favoritos.';
      },
    });
  }

  usarFavorito(favorito: Favorito): void {
    this.selectedFavorito = favorito;
    this.gatoForm.patchValue({ foto: favorito.image.url, favoritoId: favorito.id });
    this.closeModal();
  }

  toggleDetalle(favoritoId: number): void {
    this.detalleVisible = this.detalleVisible === favoritoId ? null : favoritoId;
  }

  updatePagination(): void {
    this.totalPagesCount = Math.max(1, Math.ceil(this.favoritos.length / this.pageSize));
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedFavoritosList = this.favoritos.slice(start, start + this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPagesCount) {
      this.currentPage += 1;
      this.updatePagination();
    }
  }

  openModal(): void {
    this.showModal = true;
    this.currentPage = 1;
    this.updatePagination();
  }

  closeModal(): void {
    this.showModal = false;
  }

  onSubmit(): void {
    if (this.gatoForm.invalid) {
      this.gatoForm.markAllAsTouched();
      return;
    }

    const rawFoto = this.gatoForm.get('foto')?.value as string;
    const resolved = this.resolveFotoFromInput(rawFoto);
    if (!resolved) {
      return;
    }

    const gato: Gato = {
      ...this.gatoForm.value,
      foto: resolved.foto,
      favoritoId: resolved.favoritoId,
    };
    console.log('Guardando gato:', gato);

    if (this.isEdit && this.gatoId) {
      this.gatosService.updateGato(this.gatoId, gato).subscribe({
        next: () => {
          alert('Gato actualizado ✅');
          this.router.navigate(['/gatos']);
        },
        error: () => alert('Error al actualizar el gato ❌'),
      });
    } else {
      this.gatosService.createGato(gato).subscribe({
        next: () => {
          alert('Gato creado ✅');
          this.router.navigate(['/gatos']);
        },
        error: () => alert('Error al crear el gato ❌'),
      });
    }
  }

  private resolveFotoFromInput(value: string): { foto: string; favoritoId: number | null } | null {
    const trimmed = value?.trim();
    if (!trimmed) {
      alert('Debes ingresar una URL o un ID de favorito.');
      return null;
    }

    const favoritoId = Number(trimmed);
    const isNumericId = /^\d+$/.test(trimmed);
    if (isNumericId) {
      const favorito = this.favoritos.find((f) => f.id === favoritoId);
      if (!favorito) {
        alert(
          `No se encontró un favorito con ID ${favoritoId}. Usa una URL o selecciona un favorito válido.`,
        );
        return null;
      }
      return { foto: favorito.image.url, favoritoId: favorito.id };
    }

    return { foto: trimmed, favoritoId: this.gatoForm.get('favoritoId')?.value ?? null };
  }

  cancelar(): void {
    this.router.navigate(['/gatos']);
  }
}
