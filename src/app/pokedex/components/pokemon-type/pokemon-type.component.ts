import { Component, Input } from '@angular/core';
import { PokemonTypeInterface } from '../../interface/pokemon-type';

@Component({
  selector: 'app-pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrl: './pokemon-type.component.scss'
})
export class PokemonTypeComponent {
  @Input() type!: PokemonTypeInterface;
}
