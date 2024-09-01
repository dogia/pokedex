import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  // Estoy conciente que esto no es la mejor manera pero por el tiempo
  // no voy a implementar i18n

  private readonly dictionary = {
    es: {
      'normal':'normal',
      'fire':'fuego',
      'water':'agua',
      'electric':'eléctrico',
      'grass':'hierba',
      'ice':'hielo',
      'fighting':'pelea',
      'poison':'veneo',
      'ground':'tierra',
      'flying':'volador',
      'psychic':'psíquico',
      'bug':'insecto',
      'rock':'roca',
      'ghost':'fantasma',
      'dragon':'dragón',
      'dark':'oscuridad',
      'steel':'metal',
      'fairy':'hada',
      'hp': 'vida',
      'attack': 'ataque',
      'defense': 'defensa',
      'special-attack': 'ataque especial',
      'special-defense': 'defensa especial',
      'speed': 'agilidad'
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  transform(value: string, language: string): string {
    return this.dictionary[language][value] || value;
  }

}
