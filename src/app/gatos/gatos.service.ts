import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gato } from './models/gato.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GatosService {
  private apiUrl = `${environment.apiUrl}/gatos`;

  constructor(private http: HttpClient) {}

  getGatos(): Observable<Gato[]> {
    return this.http.get<Gato[]>(this.apiUrl);
  }

  getGato(id: string): Observable<Gato> {
    return this.http.get<Gato>(`${this.apiUrl}/${id}`);
  }

  createGato(gato: Gato): Observable<Gato> {
    return this.http.post<Gato>(this.apiUrl, gato);
  }

  updateGato(id: string, gato: Gato): Observable<Gato> {
    return this.http.put<Gato>(`${this.apiUrl}/${id}`, gato);
  }

  deleteGato(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
