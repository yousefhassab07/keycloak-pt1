import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegistroService {
  private http = inject(HttpClient);
  private keycloak = inject(Keycloak);
  
  // INSERISCI QUI IL TUO URL DI FLASK (Quello della porta 5000)
  private baseUrl = 'https://miniature-giggle-x567jw6j7xpqc6gv-5000.app.github.dev';

  private getHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.keycloak.token}` });
  }

  getVoti(): Observable<{voti: any[]}> {
    return this.http.get<{voti: any[]}>(`${this.baseUrl}/voti`, { headers: this.getHeaders() });
  }

  addVoto(nome_studente: string, materia: string, voto: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/voti`, 
      { nome_studente, materia, voto }, 
      { headers: this.getHeaders() }
    );
  }
}