import { Component, Input } from '@angular/core';
import { PokemonInterface } from '../../interface/pokemon.interface';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input() pokemon!: PokemonInterface;
}
