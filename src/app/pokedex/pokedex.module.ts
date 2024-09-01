import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PokedexComponent } from './pokedex.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonTypeComponent } from './components/pokemon-type/pokemon-type.component';
import { TranslatePipe } from './pipe/translate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { PokemonDetailDialogComponent } from './components/pokemon-detail-dialog/pokemon-detail-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PokemonStatComponent } from './components/pokemon-stat/pokemon-stat.component';
@NgModule({
  declarations: [
    // Components
    PokedexComponent,
    PokemonCardComponent,
    PokemonTypeComponent,

    // Pipes
    TranslatePipe,
    PokemonDetailDialogComponent,
    PokemonStatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgOptimizedImage,
    InfiniteScrollDirective,
  ]
})
export class PokedexModule { }
