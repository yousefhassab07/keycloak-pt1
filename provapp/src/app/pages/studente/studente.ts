import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro'; // <-- CONTROLLA IL NOME

@Component({
  selector: 'app-studente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studente.html',
  styleUrl: './studente.css'
})
export class Studente implements OnInit {
  private registroService = inject(RegistroService);
  voti = signal<any[]>([]);

  ngOnInit() {
    this.registroService.getVoti().subscribe({
      next: (res) => this.voti.set(res.voti),
      error: (err) => console.error('Errore', err)
    });
  }
}