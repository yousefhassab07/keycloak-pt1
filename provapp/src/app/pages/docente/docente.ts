import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroService } from '../../services/registro'; // <-- CONTROLLA CHE IL NOME SIA CORRETTO!

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docente.html',
  styleUrl: './docente.css'
})
export class Docente implements OnInit {
  private registroService = inject(RegistroService);

  voti = signal<any[]>([]);
  nome = '';
  materia = '';
  voto: number | null = null;
  errore = '';

  ngOnInit() {
    this.caricaVoti();
  }

  caricaVoti() {
    this.registroService.getVoti().subscribe({
      next: (res) => this.voti.set(res.voti),
      error: (err) => console.error('Errore nel caricamento', err)
    });
  }

  inserisciVoto() {
    if (!this.nome || !this.materia || !this.voto) {
        this.errore = 'Compila tutti i campi!';
        return;
    }
    this.errore = '';
    this.registroService.addVoto(this.nome, this.materia, this.voto).subscribe({
      next: () => {
        this.caricaVoti(); // ricarica la lista automatica
        this.nome = ''; this.materia = ''; this.voto = null; // svuota i campi
      },
      error: (err) => this.errore = 'Errore durante l\'inserimento'
    });
  }
}