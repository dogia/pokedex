import { Component, Input } from '@angular/core';
import { PokemonStatInterface } from '../../interface/pokemon-stat';

@Component({
  selector: 'app-pokemon-stat',
  templateUrl: './pokemon-stat.component.html',
  styleUrl: './pokemon-stat.component.scss'
})
export class PokemonStatComponent {
  @Input() stat!: PokemonStatInterface;
}
