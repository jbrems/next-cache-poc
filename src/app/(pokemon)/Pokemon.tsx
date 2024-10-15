import { Pokemon as PokemonType } from "./pokemon.types";

export function Pokemon({ pokemon, position }: { pokemon: PokemonType, position: number }){
  return <div className="flex flex-col items-center">
    <img src={pokemon.img} alt={pokemon.name} className="h-32 w-32" />
    <p className="flex gap-2 -mt-4">
      <span className="font-bold">#{pokemon.id}</span>
      <span className="capitalize">{pokemon.name}</span>
    </p>
  </div>
}