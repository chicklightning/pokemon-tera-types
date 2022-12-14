export interface PokemonType {
    id: string;
    attackStrengths: Map<string, number>;
    attackWeaknesses: Map<string, number>;
    defenseStrengths: Map<string, number>;
    defenseWeaknesses: Map<string, number>;
}
