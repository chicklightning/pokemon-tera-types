import { Component, EventEmitter, Output } from '@angular/core';

import { PokemonType } from '../../services/pokemontype';
import { PokemonTypeService } from '../../services/pokemontype.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-tera-type',
  templateUrl: './tera-type.component.html',
  styleUrls: ['./tera-type.component.css']
})
export class TeraTypeComponent {
  teraTypes: PokemonType[];
  selectedType: PokemonType;
  @Output() onSelected = new EventEmitter<PokemonType>();

  constructor(private pokemonTypeService: PokemonTypeService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPokemonTypes();
    this.selectedType = null;
  }

  onSelect(selectedType: PokemonType): void {
    this.onSelected.emit(selectedType);
    this.selectedType = selectedType;
  }

  getPokemonTypes(): void {
    this.teraTypes = this.pokemonTypeService.getPokemonTypes();
  }
}
