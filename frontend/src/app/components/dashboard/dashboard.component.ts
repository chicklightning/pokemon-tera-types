import { Component, OnInit } from '@angular/core';
import { PokemonType } from 'src/app/services/pokemontype';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedTeraType: PokemonType;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedTeraType(selectedType: PokemonType): void {
    this.selectedTeraType = selectedType;
  }
}
