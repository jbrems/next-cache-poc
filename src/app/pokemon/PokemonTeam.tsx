import { Pokemon } from "./Pokemon";
import { PokemonInfo, Pokemon as PokemonType } from './pokemon.types';

export function PokemonTeam({ pokemons, info }: { pokemons: PokemonType[], info: PokemonInfo }) {
  return <ul className="pokemon-team flex gap-5">
    {pokemons.map((p, i) => <li key={`${p.id}-${i}`}><Pokemon pokemon={p} info={info}/></li>)}
  </ul>
}