import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Pokemon } from '../services/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-raid-pokemon',
  templateUrl: './raid-pokemon.component.html',
  styleUrls: ['./raid-pokemon.component.css']
})
export class RaidPokemonComponent {
  pokemon: Pokemon[];
  selectedRaidPokemon: Pokemon;
  @Output() onSelected = new EventEmitter<Pokemon>();

  constructor(private pokemonService: PokemonService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllPokemon();
    this.selectedRaidPokemon = null;
  }

  onSelect(selectedPokemon: Pokemon): void {
    this.onSelected.emit(selectedPokemon);
    this.selectedRaidPokemon = selectedPokemon;
  }

  getAllPokemon(): void {
    this.pokemon = this.pokemonService.getAllPokemon();
  }
}
