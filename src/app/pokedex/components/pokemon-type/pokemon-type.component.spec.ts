import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { PokemonTypeComponent } from './pokemon-type.component';
import { PokemonTypeInterface } from '../../interface/pokemon-type';
import { TranslatePipe } from '../../pipe/translate.pipe';

@Component({
  template: `<app-pokemon-type [type]="mockType"></app-pokemon-type>`,
})
class TestHostComponent {
  mockType: PokemonTypeInterface = {
    slot: 1,
    type: {
      name: 'fire',
      url: 'https://pokeapi.co/api/v2/type/10/'
    }
  };
}

describe('PokemonTypeComponent', () => {
  let component: PokemonTypeComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PokemonTypeComponent,
        TestHostComponent,
        TranslatePipe
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PokemonTypeComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the type name', () => {
    const smallElement = fixture.debugElement.query(By.css('small.pokemon-type'));
    expect(smallElement.nativeElement.textContent.trim()).toBe('Fuego'); // Según tu pipe de `titlecase`
  });

  it('should apply the correct class based on the type', () => {
    const smallElement = fixture.debugElement.query(By.css('small.pokemon-type'));
    expect(smallElement.nativeElement.classList).toContain('fire');
  });

  it('should update when input changes', () => {
    hostComponent.mockType = {
      slot: 1,
      type: {
        name: 'water',
        url: 'https://pokeapi.co/api/v2/type/11/'
      }
    };
    fixture.detectChanges();

    const smallElement = fixture.debugElement.query(By.css('small.pokemon-type'));
    expect(smallElement.nativeElement.textContent.trim()).toBe('Agua');
    expect(smallElement.nativeElement.classList).toContain('water');
  });
});