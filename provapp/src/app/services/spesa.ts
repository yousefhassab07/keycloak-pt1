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

  // USA IL TUO URL FLASK (Porta 5000)
  private baseUrl = 'https://miniature-giggle-x567jw6j7xpqc6gv-5000.app.github.dev';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.keycloak.token}`,
    });
  }

  // Restituisce any perché ora gli oggetti hanno {id, item}
  getItems(): Observable<{ items: any[]; user: string }> {
    return this.http.get<{ items: any[]; user: string }>(
      `${this.baseUrl}/items`,
      { headers: this.getHeaders() }
    );
  }

  addItem(item: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/items`,
      { item },
      { headers: this.getHeaders() }
    );
  }

  // NUOVA FUNZIONE PER ELIMINARE
  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/items/${id}`,
      { headers: this.getHeaders() }
    );
  }
}