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
    let raidPokemonType: PokemonType;
    if (raidPokemon.types.length === 1) {
      raidPokemonType = this.pokemonTypeService.getPokemonType(raidPokemon.types[0]);
    } else { // Dual type pokemon - initiate shenanigans
      let firstRaidPokemonType = this.pokemonTypeService.getPokemonType(raidPokemon.types[0]);
      let secondRaidPokemonType = this.pokemonTypeService.getPokemonType(raidPokemon.types[1]);
      
      // Calculate a temporary "dual type" that changes all of the types and values based on the dual types; let's
      //    calculate all the new values for attack strengths first; if an attack strength or weakness appears in
      //    other type's attack strengths or weaknesses, multiply the values together. Otherwise just add them.
      raidPokemonType = firstRaidPokemonType;
      for (let [typeName, multiplier] of secondRaidPokemonType.attackStrengths) {
        // Multiply the values to get the true multiplier for the dual type:
        if (raidPokemonType.attackStrengths.has(typeName)) {
          let firstTypeMultiplier = raidPokemonType.attackStrengths.get(typeName);
          raidPokemonType.attackStrengths.set(typeName, multiplier * firstTypeMultiplier);
        } else if (raidPokemonType.attackWeaknesses.has(typeName)) {
          // If it appears in attack weaknesses, they cancel out; an attack weakness is always 0.5 or 0,
          // and an attack strength is always 2; this means the result is 0 or 1 and we don't track it
          raidPokemonType.attackStrengths.delete(typeName);
        } else {
          // This attack strength only appears in the second Type, so just add it and its multiplier normally
          raidPokemonType.attackStrengths.set(typeName, multiplier);
        }
      }

      for (let [typeName, multiplier] of secondRaidPokemonType.attackWeaknesses) {
        // Multiply the values to get the true multiplier for the dual type:
        if (raidPokemonType.attackWeaknesses.has(typeName)) {
          let firstTypeMultiplier = raidPokemonType.attackWeaknesses.get(typeName);
          raidPokemonType.attackWeaknesses.set(typeName, multiplier * firstTypeMultiplier);
        } else if (raidPokemonType.attackStrengths.has(typeName)) {
          // If it appears in attack strengths, they cancel out; an attack weakness is always 0.5 or 0,
          // and an attack strength is always 2; this means the result is 0 or 1 and we don't track it
          raidPokemonType.attackWeaknesses.delete(typeName);
        } else {
          // This attack weakness only appears in the second Type, so just add it and its multiplier normally
          raidPokemonType.attackWeaknesses.set(typeName, multiplier);
        }
      }

      for (let [typeName, multiplier] of secondRaidPokemonType.defenseStrengths) {
        // Multiply the values to get the true multiplier for the dual type:
        if (raidPokemonType.defenseStrengths.has(typeName)) {
          let firstTypeMultiplier = raidPokemonType.defenseStrengths.get(typeName);
          raidPokemonType.defenseStrengths.set(typeName, multiplier * firstTypeMultiplier);
        } else if (raidPokemonType.defenseWeaknesses.has(typeName)) {
          // If it appears in defense weaknesses, they cancel out; a defense strength is always 0.5 or 0,
          // and a defense weakness is always 2; this means the result is 0 or 1 and we don't track it
          raidPokemonType.defenseStrengths.delete(typeName);
        } else {
          // This defense strength only appears in the second Type, so just add it and its multiplier normally
          raidPokemonType.defenseStrengths.set(typeName, multiplier);
        }
      }

      for (let [typeName, multiplier] of secondRaidPokemonType.defenseWeaknesses) {
        // Multiply the values to get the true multiplier for the dual type:
        if (raidPokemonType.defenseWeaknesses.has(typeName)) {
          let firstTypeMultiplier = raidPokemonType.defenseWeaknesses.get(typeName);
          raidPokemonType.defenseWeaknesses.set(typeName, multiplier * firstTypeMultiplier);
        } else if (raidPokemonType.defenseStrengths.has(typeName)) {
          // If it appears in defense strengths, they cancel out; a defense strength is always 0.5 or 0,
          // and a defense weakness is always 2; this means the result is 0 or 1 and we don't track it
          raidPokemonType.defenseWeaknesses.delete(typeName);
        } else {
          // This defense weakness only appears in the second Type, so just add it and its multiplier normally
          raidPokemonType.defenseWeaknesses.set(typeName, multiplier);
        }
      }
    }

    // Let's get a list of Pokemon types we don't want because the raid pokemon will
    //    be more effective against them:
    let teraAttackStrengthTypes = new Set(teraType.attackStrengths.keys());
    let baseAttackStrengthTypes = new Set(raidPokemonType.attackStrengths.keys());
    let disallowedPokemonTypes = new Set([...teraAttackStrengthTypes, ...baseAttackStrengthTypes]);

    // Let's get a list of move types we don't want because the raid Pokemon will be resistant to them:
    let teraDefenseStrengthTypes = new Set(teraType.defenseStrengths.keys());
    let baseDefenseStrengthTypes = new Set(raidPokemonType.defenseStrengths.keys());
    let disallowedMoveTypes = new Set([...teraDefenseStrengthTypes, ...baseDefenseStrengthTypes]);

    // Let's get a list of Pokemon types we DO want - we want Pokemon types that appear in the attack weaknesses
    //    of the raid pokemon (more resistant to attacks of its Tera type and its base types); if it appears as a weakness
    //    of both the Tera type AND base type, then increase the priority; if it appears as an attack/defense weakness of the base type
    //    but an attack/defense strength on the Tera type, don't recommend the type; if it does not appear as an attack or defense weakness
    //    of the base type and only on the Tera type, recommend the type; remove all 
    // Let's do resistances against the raid pokemon first:
    for (let [typeName, multiplier] of raidPokemonType.attackWeaknesses) {
      // If the Tera type does not have it as an attack strength, continue to add it to the list:
      if (!teraType.attackStrengths.has(typeName)) {
        // If the tera type also does less damage against this type, add it to the total multiplier:
        let modifiedSTABMultiplier = (teraType.attackWeaknesses.has(typeName)) ? 1 : 0;

        // If there's a type that is immune to damage, increase its multiplier for higher recommendation
        let modifiedImmunityMultiplier = (multiplier === 0) ? 1 + modifiedSTABMultiplier : multiplier + modifiedSTABMultiplier;
        if (!tempSuggestedTypes.has(typeName)) {
          tempSuggestedTypes.set(typeName, modifiedImmunityMultiplier);
        } else {
          let newTypeMultipler = tempSuggestedTypes.get(typeName) + modifiedImmunityMultiplier;
          tempSuggestedTypes.set(typeName, newTypeMultipler);
        }
      }
    }

    // Let's do damage against the raid pokemon:
    for (let [typeName, multiplier] of teraType.defenseWeaknesses) {
      // If the Tera type does not have it as an defense strength, continue to add it to the list:
      if (!disallowedPokemonTypes.has(typeName)) {
        // If the tera type also takes increased damage from type, add it to the total multiplier:
        let modifiedSTABMultiplier = (teraType.defenseWeaknesses.has(typeName)) ? multiplier + 2 : multiplier;

        if (!tempSuggestedTypes.has(typeName)) {
          tempSuggestedTypes.set(typeName, modifiedSTABMultiplier);
        } else {
          let newTypeMultipler = tempSuggestedTypes.get(typeName) + modifiedSTABMultiplier;
          tempSuggestedTypes.set(typeName, newTypeMultipler);
        }
      }

      if (!disallowedMoveTypes.has(typeName)) {
        // If the tera type also takes increased damage from type, add it to the total multiplier:
        let modifiedSTABMultiplier = (teraType.defenseWeaknesses.has(typeName)) ? multiplier + 2 : multiplier;
        if (!tempSuggestedMoveTypes.has(typeName)) {
          tempSuggestedMoveTypes.set(typeName, modifiedSTABMultiplier);
        } else {
          let newTypeMultipler = tempSuggestedMoveTypes.get(typeName) + modifiedSTABMultiplier;
          tempSuggestedMoveTypes.set(typeName, newTypeMultipler);
        }
      }
    }

    // Now let's fetch Pokemon that only include suggested types and do NOT have disallowed types:
    for (let [typeName, multiplier] of tempSuggestedTypes) {
      const allPokemonOfType = this.pokemonService.getPokemonByType(typeName);
      for (let pokemon of allPokemonOfType) {
        // If the raid pokemon has a type that's in the raid Pokemon's attack strengths,
        for (let type of pokemon.types) {
          if (disallowedPokemonTypes.has(type)) {
            break;
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
      }
    }

    this.suggestedPokemon = [...tempSuggestedPokemon.entries()].sort((a, b) => b[1] - a[1]);
    this.suggestedMoveTypes = [...tempSuggestedMoveTypes.entries()].sort((a, b) => b[1] - a[1]);
    this.suggestedTypes = [...tempSuggestedTypes.entries()].sort((a, b) => b[1] - a[1]);
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
