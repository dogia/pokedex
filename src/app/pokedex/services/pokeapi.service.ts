import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { PokemonInterface } from '../interface/pokemon.interface';
import { PokemonApiResultInterface } from '../interface/pokemon-api-result';
import { PokemonResourceInterface } from '../interface/pokemon-resource';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  private readonly API_URL = 'https://pokeapi.co/api/v2/pokemon';
  private page = 0;
  

  constructor(private http: HttpClient) { }

  getNextPage() {
    return this.listPokemons((this.page++) * 20)
      .pipe(
        switchMap(
          (results: Array<PokemonResourceInterface>) =>
            results.map((result) => this.http.get<PokemonInterface>(result.url))
        )
      );
  }

  listPokemons(offset: number = 0, limit: number = 20) {
    let params = new HttpParams();
    params = params.appendAll({limit, offset});

    return this.http
      .get<PokemonApiResultInterface>(`${this.API_URL}`, {params})
      .pipe(
        map((response: PokemonApiResultInterface) => response.results)
      );
  }

  getPokemon(pokemon:string): Observable<PokemonInterface> {
    return this.http.get<PokemonInterface>(`${this.API_URL}/${pokemon}`);
  }
}