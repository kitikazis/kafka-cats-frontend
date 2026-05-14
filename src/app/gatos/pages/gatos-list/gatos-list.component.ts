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
    this.gatos = this.route.snapshot.data['gatos'];
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
