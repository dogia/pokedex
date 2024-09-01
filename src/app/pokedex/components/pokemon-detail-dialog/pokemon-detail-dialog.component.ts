import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonInterface } from '../../interface/pokemon.interface';

@Component({
  selector: 'app-pokemon-detail-dialog',
  templateUrl: './pokemon-detail-dialog.component.html',
  styleUrl: './pokemon-detail-dialog.component.scss'
})
export class PokemonDetailDialogComponent {
  public pokemon: PokemonInterface;
  constructor(@Inject(MAT_DIALOG_DATA) private data: { pokemon: PokemonInterface}) {
    this.pokemon = this.data.pokemon;
  }
}
