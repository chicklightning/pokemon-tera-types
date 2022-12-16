import { PokemonType } from './pokemontype';

export const POKEMONTYPES: PokemonType[] = [
    {
        id: "Bug",
        attackStrengths: new Map<string, number>([
            ["Grass", 2],
            ["Psychic", 2],
            ["Dark", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Fire", 0.5],
            ["Fighting", 0.5],
            ["Poison", 0.5],
            ["Flying", 0.5],
            ["Ghost", 0.5],
            ["Steel", 0.5],
            ["Fairy", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Fighting", 0.5],
            ["Ground", 0.5],
            ["Grass", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Flying", 2],
            ["Rock", 2],
            ["Fire", 2],
        ]),
    },
    {
        id: "Dark",
        attackStrengths: new Map<string, number>([
            ["Ghost", 2],
            ["Psychic", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Dark", 0.5],
            ["Fighting", 0.5],
            ["Fairy", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Ghost", 0.5],
            ["Psychic", 0.5],
            ["Dark", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Bug", 2],
            ["Fighting", 2],
            ["Fairy", 2],
        ]),
    },
    {
        id: "Dragon",
        attackStrengths: new Map<string, number>([
            ["Dragon", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Steel", 0.5],
            ["Fairy", 0],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Fire", 0.5],
            ["Water", 0.5],
            ["Grass", 0.5],
            ["Electric", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Ice", 2],
            ["Dragon", 2],
            ["Fairy", 2],
        ]),
    },
    {
        id: "Electric",
        attackStrengths: new Map<string, number>([
            ["Water", 2],
            ["Flying", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Grass", 0.5],
            ["Electric", 0.5],
            ["Dragon", 0.5],
            ["Ground", 0],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Flying", 0.5],
            ["Steel", 0.5],
            ["Electric", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Ground", 2],
        ]),
    },
    {
        id: "Fairy",
        attackStrengths: new Map<string, number>([
            ["Fighting", 2],
            ["Dragon", 2],
            ["Dark", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Fire", 0.5],
            ["Poison", 0.5],
            ["Steel", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Bug", 0.5],
            ["Fighting", 0.5],
            ["Dark", 0.5],
            ["Dragon", 0],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Poison", 2],
            ["Steel", 2],
        ]),
    },
    {
        id: "Fighting",
        attackStrengths: new Map<string, number>([
            ["Normal", 2],
            ["Rock", 2],
            ["Steel", 2],
            ["Ice", 2],
            ["Dark", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Flying", 0.5],
            ["Poison", 0.5],
            ["Bug", 0.5],
            ["Psychic", 0.5],
            ["Fairy", 0.5],
            ["Ghost", 0],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Rock", 0.5],
            ["Bug", 0.5],
            ["Dark", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Flying", 2],
            ["Psychic", 2],
            ["Fairy", 2],
        ]),
    },
    {
        id: "Fire",
        attackStrengths: new Map<string, number>([
            ["Bug", 2],
            ["Steel", 2],
            ["Grass", 2],
            ["Ice", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Fire", 0.5],
            ["Rock", 0.5],
            ["Water", 0.5],
            ["Dragon", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Bug", 0.5],
            ["Steel", 0.5],
            ["Fire", 0.5],
            ["Grass", 0.5],
            ["Ice", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Ground", 2],
            ["Rock", 2],
            ["Water", 2],
        ]),
    },
    {
        id: "Flying",
        attackStrengths: new Map<string, number>([
            ["Fighting", 2],
            ["Bug", 2],
            ["Grass", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Rock", 0.5],
            ["Steel", 0.5],
            ["Electric", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Bug", 0.5],
            ["Fighting", 0.5],
            ["Grass", 0.5],
            ["Ground", 0],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Rock", 2],
            ["Electric", 2],
            ["Ice", 2],
        ]),
    },
    {
        id: "Ghost",
        attackStrengths: new Map<string, number>([
            ["Ghost", 2],
            ["Psychic", 2]
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Normal", 0],
            ["Dark", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Bug", 0.5],
            ["Poison", 0.5],
            ["Normal", 0],
            ["Fighting", 0],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Ghost", 2],
            ["Dark", 2],
        ]),
    },
    {
        id: "Grass",
        attackStrengths: new Map<string, number>([
            ["Ground", 2],
            ["Rock", 2],
            ["Water", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Flying", 0.5],
            ["Poison", 0.5],
            ["Steel", 0.5],
            ["Bug", 0.5],
            ["Fire", 0.5],
            ["Grass", 0.5],
            ["Dragon", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Ground", 0.5],
            ["Water", 0.5],
            ["Grass", 0.5],
            ["Electric", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Poison", 2],
            ["Flying", 2],
            ["Bug", 2],
            ["Fire", 2],
            ["Ice", 2],
        ]),
    },
    {
        id: "Ground",
        attackStrengths: new Map<string, number>([
            ["Poison", 2],
            ["Rock", 2],
            ["Steel", 2],
            ["Fire", 2],
            ["Electric", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Bug", 0.5],
            ["Grass", 0.5],
            ["Flying", 0],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Poison", 0.5],
            ["Rock", 0.5],
            ["Electric", 0],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Water", 2],
            ["Grass", 2],
            ["Ice", 2],
        ]),
    },
    {
        id: "Ice",
        attackStrengths: new Map<string, number>([
            ["Flying", 2],
            ["Dragon", 2],
            ["Grass", 2],
            ["Ground", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Fire", 0.5],
            ["Water", 0.5],
            ["Steel", 0.5],
            ["Ice", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Ice", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Fighting", 2],
            ["Steel", 2],
            ["Rock", 2],
            ["Fire", 2],
        ]),
    },
    {
        id: "Normal",
        attackStrengths: new Map<string, number>([]),
        attackWeaknesses: new Map<string, number>([
            ["Rock", 0.5],
            ["Steel", 0.5],
            ["Ghost", 0],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Ghost", 0],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Fighting", 2],
        ]),
    },
    {
        id: "Poison",
        attackStrengths: new Map<string, number>([
            ["Grass", 2],
            ["Fairy", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Poison", 0.5],
            ["Ground", 0.5],
            ["Steel", 0],
            ["Rock", 0.5],
            ["Ghost", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Poison", 0.5],
            ["Fighting", 0.5],
            ["Grass", 0.5],
            ["Fairy", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Ground", 2],
            ["Psychic", 2],
        ]),
    },
    {
        id: "Psychic",
        attackStrengths: new Map<string, number>([
            ["Fighting", 2],
            ["Poison", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Psychic", 0.5],
            ["Dark", 0],
            ["Steel", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Fighting", 0.5],
            ["Psychic", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Bug", 2],
            ["Ghost", 2],
            ["Dark", 2],
        ]),
    },
    {
        id: "Rock",
        attackStrengths: new Map<string, number>([
            ["Flying", 2],
            ["Bug", 2],
            ["Fire", 2],
            ["Ice", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Fighting", 0.5],
            ["Ground", 0.5],
            ["Steel", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Normal", 0.5],
            ["Flying", 0.5],
            ["Poison", 0.5],
            ["Fire", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Fighting", 2],
            ["Ground", 2],
            ["Steel", 2],
            ["Water", 2],
            ["Grass", 2],
        ]),
    },
    {
        id: "Steel",
        attackStrengths: new Map<string, number>([
            ["Rock", 2],
            ["Ice", 2],
            ["Fairy", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Fire", 0.5],
            ["Water", 0.5],
            ["Steel", 0.5],
            ["Electric", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Normal", 0.5],
            ["Flying", 0.5],
            ["Rock", 0.5],
            ["Bug", 0.5],
            ["Steel", 0.5],
            ["Grass", 0.5],
            ["Psychic", 0.5],
            ["Ice", 0.5],
            ["Dragon", 0.5],
            ["Fairy", 0.5],
            ["Poison", 0],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Fighting", 2],
            ["Ground", 2],
            ["Fire", 2],
        ]),
    },
    {
        id: "Water",
        attackStrengths: new Map<string, number>([
            ["Ground", 2],
            ["Rock", 2],
            ["Fire", 2],
        ]),
        attackWeaknesses: new Map<string, number>([
            ["Water", 0.5],
            ["Grass", 0.5],
            ["Dragon", 0.5],
        ]),
        defenseStrengths: new Map<string, number>([
            ["Steel", 0.5],
            ["Fire", 0.5],
            ["Water", 0.5],
            ["Ice", 0.5],
        ]),
        defenseWeaknesses: new Map<string, number>([
            ["Grass", 2],
            ["Electric", 2],
        ]),
    },

];