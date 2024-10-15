import { Pokemon } from "./Pokemon";
import { Pokemon as PokemonType } from './pokemon.types';

export function PokemonTeam({ pokemons }: { pokemons: PokemonType[]}) {
  return <ul className="flex">
    {pokemons.map((p, i) => <li key={p.id}><Pokemon pokemon={p} position={i + 1}/></li>)}
  </ul>
}