import { Injectable } from '@angular/core';
import { POKEMON } from './allpokemon';
import { MessageService } from './message.service';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private messageService: MessageService) { }

  getAllPokemon(): Pokemon[] {
    return POKEMON;
  }

  getPokemon(id: string): Pokemon {
    return POKEMON.find(pokemon => pokemon.id === id);
  }

  getPokemonByType(type: string) : Pokemon[] {
    return POKEMON.filter(
      (pokemon) => pokemon.types.includes(type)
    );
  }
}
