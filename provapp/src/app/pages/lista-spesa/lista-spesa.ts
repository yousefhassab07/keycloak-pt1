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

  // Usiamo any[] perché ora ogni elemento ha {id, item}
  items = signal<any[]>([]);
  newItem = signal('');
  error = signal('');

  ngOnInit(): void {
    this.caricaLista();
  }

  caricaLista(): void {
    this.spesaService.getItems().subscribe({
      next: (res) => this.items.set(res.items),
      error: () => this.error.set('Errore nel caricamento della lista'),
    });
  }

  addItem(): void {
    if (!this.newItem().trim()) return;

    this.spesaService.addItem(this.newItem().trim()).subscribe({
      next: () => {
        this.newItem.set('');
        this.error.set('');
        this.caricaLista(); // Ricarica la lista dal database dopo l'aggiunta
      },
      error: () => this.error.set("Errore durante l'aggiunta"),
    });
  }

  deleteItem(id: number): void {
    this.spesaService.deleteItem(id).subscribe({
      next: () => {
        this.error.set('');
        this.caricaLista(); // Ricarica la lista dopo l'eliminazione
      },
      error: () => this.error.set("Errore durante l'eliminazione"),
    });
  }
}