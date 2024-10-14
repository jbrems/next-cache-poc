import { Pokemon } from "./Pokemon";
import { mapPokemonData, PokemonData } from "./pokemon.service";

export function PokemonTeam({ pokemons }: { pokemons: PokemonData[]}) {
  return <ul className="flex">
    {pokemons.map((p, i) => <li key={p.id}><Pokemon pokemon={mapPokemonData(p)} position={i + 1}/></li>)}
  </ul>
}