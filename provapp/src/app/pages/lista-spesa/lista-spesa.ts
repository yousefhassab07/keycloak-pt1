import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpesaService } from '../../services/spesa';

@Component({  
  selector: 'app-lista-spesa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-spesa.html',
  styleUrl: './lista-spesa.css'
})
export class ListaSpesaComponent implements OnInit {
  private spesaService = inject(SpesaService);

  items = signal<string[]>([]);
  newItem = signal('');
  error = signal('');

  ngOnInit(): void {
    this.spesaService.getItems().subscribe({
      next: (res) => this.items.set(res.items),
      error: () => this.error.set('Errore nel caricamento della lista'),
    });
  }

  addItem(): void {
    if (!this.newItem().trim()) return;

    this.spesaService.addItem(this.newItem().trim()).subscribe({
      next: (res) => {
        this.items.set(res.items);
        this.newItem.set('');
        this.error.set('');
      },
      error: () => this.error.set("Errore durante l'aggiunta"),
    });
  }
}