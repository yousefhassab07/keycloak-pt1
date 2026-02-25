import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpesaService {
  private http = inject(HttpClient);
  private keycloak = inject(Keycloak);

  // INSERISCI QUI IL TUO URL DI FLASK (Porta 5000)
  // Esempio: 'https://miniature-giggle-...-5000.app.github.dev'
  private baseUrl = 'https://miniature-giggle-x567jw6j7xpqc6gv-5000.app.github.dev';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.keycloak.token}`,
    });
  }

  getItems(): Observable<{ items: string[]; user: string }> {
    return this.http.get<{ items: string[]; user: string }>(
      `${this.baseUrl}/items`,
      { headers: this.getHeaders() }
    );
  }

  addItem(item: string): Observable<{ items: string[] }> {
    return this.http.post<{ items: string[] }>(
      `${this.baseUrl}/items`,
      { item },
      { headers: this.getHeaders() }
    );
  }
}