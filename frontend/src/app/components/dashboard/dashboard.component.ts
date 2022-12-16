import { Component, OnInit, Renderer2 } from '@angular/core';
import { Pokemon } from 'src/app/services/pokemon';
import { PokemonType } from 'src/app/services/pokemontype';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedTeraType: PokemonType;
  selectedRaidPokemon: Pokemon;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  onSelectedTeraType(selectedType: PokemonType): void {
    this.selectedTeraType = selectedType;
    document.getElementById("raid").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  onSelectedRaidPokemon(selectedPokemon: Pokemon): void {
    this.selectedRaidPokemon = selectedPokemon;
    document.getElementById("suggestions").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
}
