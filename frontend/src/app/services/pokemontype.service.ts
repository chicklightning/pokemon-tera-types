import { Injectable } from '@angular/core';

import { PokemonType } from './pokemontype';
import { POKEMONTYPES } from './pokemontypes';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonTypeService {

  constructor(private messageService: MessageService) { }

  getPokemonTypes(): PokemonType[] {
    return POKEMONTYPES;
  }

  getPokemonType(id: string): PokemonType {
    return POKEMONTYPES.find(pokemonType => pokemonType.id === id);
  }
}
