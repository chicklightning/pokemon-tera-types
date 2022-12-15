import { Component, Input, SimpleChanges } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Pokemon } from '../services/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { PokemonType } from '../services/pokemontype';
import { PokemonTypeService } from '../services/pokemontype.service';

@Component({
  selector: 'app-suggest-pokemon',
  templateUrl: './suggest-pokemon.component.html',
  styleUrls: ['./suggest-pokemon.component.css']
})
export class SuggestPokemonComponent {
  @Input() teraType: PokemonType;
  @Input() raidPokemon: Pokemon;

  suggestedTypes: Map<string, number>;
  suggestedPokemon: Map<string, number>;
  suggestedMoveTypes: Map<string, number>

  constructor(private pokemonService: PokemonService, private pokemonTypeService: PokemonTypeService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.suggestedTypes = new Map<string, number>();
    this.suggestedPokemon = new Map<string, number>();
    this.suggestedMoveTypes = new Map<string, number>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        let change = changes[propName];
        switch (propName) {
          case 'teraType': {
            if (this.raidPokemon) {
              this.determineRaidPokemonStrengthsAndWeaknesses(change.currentValue, this.raidPokemon);
            }
          }
          case 'raidPokemon': {
            if (this.teraType) {
              this.determineRaidPokemonStrengthsAndWeaknesses(this.teraType, change.currentValue);
            }
          }
        }
      }
    }
  }
  
  determineRaidPokemonStrengthsAndWeaknesses(teraType: PokemonType, raidPokemon: Pokemon): void {
    this.suggestedTypes = new Map<string, number>();
    this.suggestedPokemon = new Map<string, number>();
    this.suggestedMoveTypes = new Map<string, number>();

    // Get all of the base Pokemon's types as actual PokemonTypes
    let raidPokemonTypes: PokemonType[];
    for (let typeName of raidPokemon.types) {
      const pokemonType = this.pokemonTypeService.getPokemonType(typeName);
      raidPokemonTypes.push(pokemonType);
    }
    
    // We want to see what types the raid Pokemon's attacks are less effective against so we can
    //    recommend those types for the battle Pokemon
    for (let type of raidPokemonTypes) {
      for (let [typeName, multiplier] of type.attackWeaknesses) {
        // If there's a type that is immune to damage, increase its multiplier for higher recommendation
        let modifiedImmunityMultiplier = (multiplier === 0) ? 1 : multiplier;
        this.suggestedTypes.set(typeName, modifiedImmunityMultiplier);
      }
    }

    // Now, we want to see which types the Tera type's attack is less effective against so we can also recommend
    //    those types of Pokemon, and prioritize listing types and Pokemon that have a type in both this list and
    //    the previous list
    for (let [typeName, multiplier] of teraType.attackWeaknesses) {
      // If there's a type that is immune to damage, increase its multiplier for higher recommendation since it negates STAB
      let modifiedImmunityMultiplier = (multiplier === 0) ? 1 : multiplier;
      if (!this.suggestedTypes.has(typeName)) {
        this.suggestedTypes.set(typeName, modifiedImmunityMultiplier);
      } else {
        this.suggestedTypes[typeName] += modifiedImmunityMultiplier;
      }
    }

    // Now we want to see what types are super effective AGAINST the tera type; but if the type is also super weak to the tera
    //    type, we don't want to recommend it
    for (let [typeName, multiplier] of teraType.defenseWeaknesses) {
      this.suggestedMoveTypes.set(typeName, multiplier);

      if (!teraType.attackStrengths.has(typeName)) {
        if (!this.suggestedTypes.has(typeName)) {
          this.suggestedTypes.set(typeName, multiplier);
        } else {
          // That means this type is also resistant to attacks from the raid Pokemon, so prioritize recommendation for STAB
          this.suggestedMoveTypes[typeName] += multiplier;
          this.suggestedTypes[typeName] += multiplier;
        }
      }
    }

    // Now let's fetch Pokemon with these types that also do not have types that are defensively weak to the raid Pokemon:
    for (let [typeName, multiplier] of this.suggestedTypes) {
      const allPokemonOfType = this.pokemonService.getPokemonByType(typeName);
      for (let pokemon of allPokemonOfType) {
        for (let type of pokemon.types) {
          if (this.teraType.attackStrengths.has(type)) {
            continue;
          }

          if (!this.suggestedPokemon.has(pokemon.id)) {
            this.suggestedPokemon.set(pokemon.id, multiplier);
          } else {
            // If this Pokemon is already in the list, that means it has another type that the raid Pokemon is weak to, so increase
            //    recommendation priority
            this.suggestedPokemon[pokemon.id] += multiplier;
          }
        }
      }
    }
  }
}
