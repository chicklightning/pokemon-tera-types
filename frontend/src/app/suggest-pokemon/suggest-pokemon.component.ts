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

  suggestedTypes: any;
  suggestedPokemon: any;
  suggestedMoveTypes: any;
  searchText;

  constructor(private pokemonService: PokemonService, private pokemonTypeService: PokemonTypeService, private messageService: MessageService) { }

  ngOnInit(): void {
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
            break;
          }
          case 'raidPokemon': {
            if (this.teraType) {
              this.determineRaidPokemonStrengthsAndWeaknesses(this.teraType, change.currentValue);
            }
            break;
          }
        }
      }
    }
  }
  
  determineRaidPokemonStrengthsAndWeaknesses(teraType: PokemonType, raidPokemon: Pokemon): void {
    const tempSuggestedTypes = new Map<string, number>();
    const tempSuggestedPokemon = new Map<string, number>();
    const tempSuggestedMoveTypes = new Map<string, number>();

    // Get all of the base Pokemon's types as actual PokemonTypes
    let raidPokemonTypes: PokemonType[] = [];
    raidPokemon.types.forEach((typeName) => {
      const pokemonType = this.pokemonTypeService.getPokemonType(typeName);
      raidPokemonTypes.push(pokemonType);
    });
    
    // We want to see what types the raid Pokemon's attacks are less effective against so we can
    //    recommend those types for the battle Pokemon
    raidPokemonTypes.forEach((type) => {
      for (let [typeName, multiplier] of type.attackWeaknesses) {
        // If there's a type that is immune to damage, increase its multiplier for higher recommendation
        let modifiedImmunityMultiplier = (multiplier === 0) ? 1 : multiplier;
        tempSuggestedTypes.set(typeName, modifiedImmunityMultiplier);
      }
    });

    // Now, we want to see which types the Tera type's attack is less effective against so we can also recommend
    //    those types of Pokemon, and prioritize listing types and Pokemon that have a type in both this list and
    //    the previous list
    for (let [typeName, multiplier] of teraType.attackWeaknesses) {
      // If there's a type that is immune to damage, increase its multiplier for higher recommendation since it negates STAB
      let modifiedImmunityMultiplier = (multiplier === 0) ? 1 : multiplier;
      if (!tempSuggestedTypes.has(typeName)) {
        tempSuggestedTypes.set(typeName, modifiedImmunityMultiplier);
      } else {
        let newTypeMultipler = tempSuggestedTypes.get(typeName) + multiplier;
        tempSuggestedTypes.set(typeName, newTypeMultipler);
      }
    }

    // Now we want to see what types are super effective AGAINST the tera type; but if the type is also super weak to the tera
    //    type, we don't want to recommend it
    for (let [typeName, multiplier] of teraType.defenseWeaknesses) {
      tempSuggestedMoveTypes.set(typeName, multiplier);

      if (!teraType.attackStrengths.has(typeName)) {
        if (!tempSuggestedTypes.has(typeName)) {
          tempSuggestedTypes.set(typeName, multiplier);
        } else {
          // That means this type is also resistant to attacks from the raid Pokemon, so prioritize recommendation for STAB
          let newMoveMultipler = tempSuggestedMoveTypes.get(typeName) + multiplier;
          tempSuggestedMoveTypes.set(typeName, newMoveMultipler);
         
          let newTypeMultipler = tempSuggestedTypes.get(typeName) + multiplier;
          tempSuggestedTypes.set(typeName, newTypeMultipler);
        }
      }
    }

    // Now let's fetch Pokemon with these types that also do not have types that are defensively weak to the raid Pokemon:
    for (let [typeName, multiplier] of tempSuggestedTypes) {
      const allPokemonOfType = this.pokemonService.getPokemonByType(typeName);
      for (let pokemon of allPokemonOfType) {
        for (let type of pokemon.types) {
          if (this.teraType.attackStrengths.has(type)) {
            continue;
          }

          if (!tempSuggestedPokemon.has(pokemon.id)) {
            tempSuggestedPokemon.set(pokemon.id, multiplier);
          } else {
            // If this Pokemon is already in the list, that means it has another type that the raid Pokemon is weak to, so increase
            //    recommendation priority
            let newMultipler = tempSuggestedPokemon.get(pokemon.id) + multiplier;
            tempSuggestedPokemon.set(pokemon.id, newMultipler);
          }
        }

        this.suggestedPokemon = [...tempSuggestedPokemon.entries()].sort((a, b) => b[1] - a[1]);
        this.suggestedMoveTypes = [...tempSuggestedMoveTypes.entries()].sort((a, b) => b[1] - a[1]);
        this.suggestedTypes = [...tempSuggestedTypes.entries()].sort((a, b) => b[1] - a[1]);
      }
    }
  }

  determineTypeDropShadow(multiplier: number) {
    if (multiplier >= 4) {
      return '0 0 5px 5px rgba(255, 0, 0, .8)';
    } else if (multiplier < 4 && multiplier >= 3) {
      return '0 0 5px 5px rgba(255, 119, 0, .8)';
    } else if (multiplier < 3 && multiplier >= 2) {
      return '0 0 5px 5px rgba(255, 166, 0, .8)';
    } else {
      return '0 0 5px 5px rgba(255, 230, 0, .8)';
    }
  }

  determinePokemonDropShadow(multiplier: number) {
    if (multiplier >= 12) {
      return '0px 2px 5px rgba(255, 0, 0, .8)';
    } else if (multiplier < 12 && multiplier >= 11) {
      return '0px 2px 5px rgba(255, 119, 0, .8)';
    } else if (multiplier < 11 && multiplier >= 10) {
      return '0px 2px 5px rgba(255, 166, 0, .8)';
    } else if (multiplier < 10 && multiplier >= 9) {
      return '0px 2px 5px rgba(255, 230, 0, .8)';
    } else if (multiplier < 9 && multiplier >= 8) {
      return '0px 2px 5px rgba(232, 255, 0, .8)';
    } else if (multiplier < 8 && multiplier >= 7) {
      return '0px 2px 5px rgba(174, 255, 0, .8)';
    } else {
      return '0px 2px 5px rgba(0, 255, 76, .8)';
    }
  }
}
