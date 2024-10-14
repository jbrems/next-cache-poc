import { Pokemon as PokemonType } from "./pokemon.service";

export function Pokemon({ pokemon, position }: { pokemon: PokemonType, position: number }){
  const size = 3 - Math.abs(3 - position)

  return <div className="flex flex-col">
    <img src={pokemon.img} alt={pokemon.name} className="h-40 w-40" />
    <p className="flex gap-2 justify-center">
      <span className="font-bold">#{pokemon.id}</span>
      <span className="capitalize">{pokemon.name}</span>
    </p>
  </div>
}