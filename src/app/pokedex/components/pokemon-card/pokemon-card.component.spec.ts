import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card.component';
import { PokemonInterface } from '../../interface/pokemon.interface';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';
import { TranslatePipe } from '../../pipe/translate.pipe';

@Component({
  template: `<app-pokemon-card [pokemon]="mockPokemon"></app-pokemon-card>`,
})
class TestHostComponent {
  mockPokemon: PokemonInterface = {
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
      latest: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg",
      legacy: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg"
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
}

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent, TestHostComponent, PokemonTypeComponent, TranslatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PokemonCardComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Pokémon name in titlecase', () => {
    const nameElement = fixture.debugElement.query(By.css('.pokemon-card-header span:first-child'));
    expect(nameElement.nativeElement.textContent.trim()).toBe('Bulbasaur');
  });

  it('should render the Pokémon ID', () => {
    const idElement = fixture.debugElement.query(By.css('.pokemon-card-header span.text-nowrap'));
    expect(idElement.nativeElement.textContent.trim()).toBe('N.º 1');
  });

  it('should set the background class based on the first type', () => {
    const mainElement = fixture.debugElement.query(By.css('.pokemon-card-body'));
    expect(mainElement.nativeElement.classList).toContain('grass');
  });

  it('should render the Pokémon image with correct src and alt', () => {
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement.nativeElement.src).toContain(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    );
    expect(imgElement.nativeElement.alt).toBe('Imagen del pokemón bulbasaur');
  });

  it('should render all Pokémon types using app-pokemon-type component', () => {
    const typeComponents = fixture.debugElement.queryAll(By.directive(PokemonTypeComponent));
    expect(typeComponents.length).toBe(2);

    const firstTypeComponent = typeComponents[0].componentInstance;
    const secondTypeComponent = typeComponents[1].componentInstance;

    expect(firstTypeComponent.type.type.name).toBe('grass');
    expect(secondTypeComponent.type.type.name).toBe('poison');
  });

  it('should update when input changes', () => {
    hostComponent.mockPokemon = {
      ...hostComponent.mockPokemon,
      name: 'ivysaur',
      id: 2,
      types: [
        {
          slot: 1,
          type: {
            name: 'poison',
            url: 'https://pokeapi.co/api/v2/type/4/'
          }
        }
      ],
      weight: 130,
      height: 10
    };

    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('.pokemon-card-header span:first-child'));
    const mainElement = fixture.debugElement.query(By.css('.pokemon-card-body'));
    const heightElement = fixture.debugElement.query(By.css('.pokemon-card-footer .d-flex:nth-child(3) span:last-child'));

    expect(nameElement.nativeElement.textContent.trim()).toBe('Ivysaur');
    expect(mainElement.nativeElement.classList).toContain('poison');
  });
});