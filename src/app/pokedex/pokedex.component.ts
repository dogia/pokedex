import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from './services/pokeapi.service';
import { PokemonInterface } from './interface/pokemon.interface';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PokemonStorageService } from './services/pokemon-storage.service';
import { PokemonDetailDialogComponent } from './components/pokemon-detail-dialog/pokemon-detail-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
})
export class PokedexComponent implements OnInit {
  pokemons: Array<PokemonInterface> = [];
  searchControl: FormControl = new FormControl('');
  selectedPokemon: string = '';

  constructor(
    private pokeAPIService: PokeAPIService,
    private dialog: MatDialog
  ) {
    this.nextPage();
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged((previous, current) => previous === current),
        debounceTime(600)
      )
      .subscribe(() => {
        const search: string = this.searchControl.value.toLocaleLowerCase();
        if (search) {
          this.filterPokemons(search);

          // Si no tenemos el pokemon en el storage
          if (this.pokemons.length == 0)
            this.pokeAPIService.getPokemon(search).subscribe({
              next: (pokemon: PokemonInterface) => {
                PokemonStorageService.add(pokemon);
                this.filterPokemons(search);
              },
              error: () => {
                // TODO: Handle server error
                // Generalmente 404 no hay problema
              },
              complete: () => {
                this.sortPokemons();
              },
            });
        } else {
          // No hay valor de búsqueda
          this.pokemons = PokemonStorageService.get();
        }

        this.sortPokemons();
      });
  }

  filterPokemons(search: string) {
    this.pokemons = PokemonStorageService.get().filter((pokemon) => {
      const id = pokemon.id.toString();
      const name = pokemon.name.toLocaleLowerCase();

      return id.includes(search) || name.includes(search);
    });
  }

  sortPokemons() {
    this.pokemons.sort((a, b) => a.id - b.id);
  }

  nextPage() {
    this.pokeAPIService.getNextPage().subscribe({
      next: (pokemon$: Observable<PokemonInterface>) => {
        pokemon$.subscribe({
          next: (pokemon: PokemonInterface) => {
            PokemonStorageService.add(pokemon);
            this.pokemons = PokemonStorageService.get();
          },
          error: () => {
            // TODO: Handle error
          },
          complete: () => {
            this.sortPokemons();
          },
        });
      },
      error: () => {
        // TODO: Handle error
      },
      complete: () => {
        this.sortPokemons();
      },
    });
  }

  onSubmitSearch(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  openPokemonDetail(pokemon: PokemonInterface) {
    const config = new MatDialogConfig();
    config.data = { pokemon };
    this.dialog.open(PokemonDetailDialogComponent, config);
  }
}
