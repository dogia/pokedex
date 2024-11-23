import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatComponent } from './pokemon-stat.component';
import { PokemonStatInterface } from '../../interface/pokemon-stat';
import { TranslatePipe } from '../../pipe/translate.pipe';

describe('PokemonStatComponent', () => {
  let component: PokemonStatComponent;
  let fixture: ComponentFixture<PokemonStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonStatComponent, TranslatePipe],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonStatComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar correctamente el nombre y valor del stat', () => {
    // Simulando datos de entrada
    const mockStat: PokemonStatInterface = {
      base_stat: 120,
      effort: 2,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/'
      }
    };

    component.stat = mockStat;

    // Detección de cambios para actualizar la vista
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar que el nombre del stat aparece en el HTML (ya traducido y con titlecase)
    expect(compiled.querySelector('small')?.textContent?.trim()).toBe('Agilidad');

    // Verificar que el progreso tiene el valor correcto
    const progressElement = compiled.querySelector('progress') as HTMLProgressElement;
    expect(progressElement).toBeTruthy();
    expect(progressElement.value).toBe(120);
    expect(progressElement.max).toBe(255);
  });
});
