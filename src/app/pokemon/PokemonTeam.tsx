import { Pokemon } from "./Pokemon";
import { fetchRandomPokemon, fetchStaticPokemon, fetchUniquePokemon, getCachedPokemon, getMemoizedPokemon } from "./pokemon.service";
import { PokemonInfo } from './pokemon.types';

export async function PokemonTeam({ info }: { info: PokemonInfo }) {
  const notCachedPokemon = await fetchRandomPokemon({ cache: 'no-store' })
  const reactCachedPokemon = await getMemoizedPokemon()
  const fetchCachedPokemon = await fetchRandomPokemon({ cache: 'force-cache' }) // 'force-cache' should be the default but there seems to be an issue whit fetchRandomPokemon being called before with 'no-store'
  const nextCachedPokemon = await getCachedPokemon()
  const staticPokemon = await fetchStaticPokemon()
  const cacheBustedPokemon = await fetchUniquePokemon()

  return <ul className="pokemon-team flex gap-5">
    <li><Pokemon pokemon={notCachedPokemon} info={info} /></li>
    <li><Pokemon pokemon={reactCachedPokemon} info={info} /></li>
    <li><Pokemon pokemon={fetchCachedPokemon} info={info} /></li>
    <li><Pokemon pokemon={nextCachedPokemon} info={info} /></li>
    <li><Pokemon pokemon={staticPokemon} info={info} /></li>
    <li><Pokemon pokemon={cacheBustedPokemon} info={info} /></li>
  </ul>
}