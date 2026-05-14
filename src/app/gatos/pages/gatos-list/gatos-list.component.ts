import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gato } from '../../models/gato.model';
import { GatosService } from '../../gatos.service';

@Component({
  selector: 'app-gatos-list',
  templateUrl: './gatos-list.component.html',
  styleUrls: ['./gatos-list.component.scss'],
  standalone: false,
})
export class GatosListComponent implements OnInit {
  gatos: Gato[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gatosService: GatosService,
  ) {}

  ngOnInit(): void {
    // Toma los datos que el GatosResolver ya cargó antes de renderizar la vista.
    this.gatos = this.route.snapshot.data['gatos'] || [];
  }

  loadGatos(): void {
    this.gatosService.getGatos().subscribe({
      next: (data) => {
        this.gatos = data;
      },
      error: () => {
        alert('Error al cargar los gatos.');
      },
    });
  }

  nuevoGato(): void {
    this.router.navigate(['/gatos/nuevo']);
  }

  editarGato(id: string): void {
    this.router.navigate(['/gatos/editar', id]);
  }

  eliminarGato(id: string): void {
    if (confirm('¿Estás seguro de eliminar este gato?')) {
      this.gatosService.deleteGato(id).subscribe({
        next: () => {
          this.gatos = this.gatos.filter((g) => g._id !== id);
        },
        error: () => alert('Error al eliminar el gato ❌'),
      });
    }
  }
}
