import { Injectable } from '@angular/core';
import { PokemonInterface } from '../interface/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonStorageService {
  private static STORAGE: Set<string> = new Set();
  
  public static add(pokemon: PokemonInterface) {
    if(!pokemon)
      return;
  
    const pokeball = JSON.stringify(pokemon);
    this.STORAGE.add(pokeball);
  }

  public static get(): Array<PokemonInterface> {
    return [...this.STORAGE].map((pokeball: string) => JSON.parse(pokeball));
  }
}
