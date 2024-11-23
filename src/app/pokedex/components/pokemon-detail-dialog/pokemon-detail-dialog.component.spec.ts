import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PokemonDetailDialogComponent } from './pokemon-detail-dialog.component';
import { PokemonInterface } from '../../interface/pokemon.interface';

const mockPokemon: PokemonInterface = {
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/'
      },
      is_hidden: false,
      slot: 1
    }
  ],
  base_experience: 64,
  cries: {
    latest: 'latest-cry.mp3',
    legacy: 'legacy-cry.mp3'
  },
  forms: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-form/1/'
    }
  ],
  game_indices: [
    {
      game_index: 1,
      version: {
        name: 'red',
        url: 'https://pokeapi.co/api/v2/version/1/'
      }
    }
  ],
  height: 7,
  held_items: [],
  id: 1,
  is_default: true,
  location_area_encounters: '/encounters',
  moves: [],
  name: 'bulbasaur',
  order: 1,
  past_abilities: [],
  past_types: [],
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
  },
  sprites: {
    back_default: '',
    back_female: '',
    back_shiny: '',
    back_shiny_female: '',
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    front_female: '',
    front_shiny: '',
    front_shiny_female: ''
  },
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/'
      }
    }
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/'
      }
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/'
      }
    }
  ],
  weight: 69
};

describe('PokemonDetailDialogComponent', () => {
  let component: PokemonDetailDialogComponent;
  let fixture: ComponentFixture<PokemonDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetailDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {
            pokemon: mockPokemon
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora componentes secundarios en esta prueba
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el nombre y el ID del Pokémon', () => {
    const header = fixture.debugElement.query(By.css('header .d-flex'));
    const nameElement = header.query(By.css('span.w-100')).nativeElement;
    const idElement = header.query(By.css('span.text-nowrap')).nativeElement;

    expect(nameElement.textContent).toContain('Bulbasaur'); // Mock tiene este nombre
    expect(idElement.textContent).toContain('N.º 1'); // Mock tiene este ID
  });

  it('debería mostrar los tipos de Pokémon', () => {
    const typeComponents = fixture.debugElement.queryAll(By.css('app-pokemon-type'));

    expect(typeComponents.length).toBe(mockPokemon.types.length);
    expect(typeComponents[0].properties['type']).toEqual(mockPokemon.types[0]);
  });

  it('debería mostrar las estadísticas del Pokémon', () => {
    const statComponents = fixture.debugElement.queryAll(By.css('app-pokemon-stat'));

    expect(statComponents.length).toBe(mockPokemon.stats.length);
    expect(statComponents[0].properties['stat']).toEqual(mockPokemon.stats[0]);
  });

  it('debería mostrar peso y altura correctamente', () => {
    const smallElements = fixture.debugElement.queryAll(By.css('main .d-flex small'));

    expect(smallElements[0].nativeElement.textContent).toContain('Peso: 6.9 kg');
    expect(smallElements[1].nativeElement.textContent).toContain('Altura: 0.7 m');
  });

  it('no debería renderizar el audio si no hay cries disponibles', () => {
    component.pokemon.cries = { latest: '', legacy: '' }; // Sin cries
    fixture.detectChanges();

    const audio = fixture.debugElement.query(By.css('audio'));
    expect(audio).toBeNull();
  });
});
