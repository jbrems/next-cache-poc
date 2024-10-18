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
    <li><Pokemon pokemon={notCachedPokemon} pokemonInfo={info} cacheInfo="NO_CACHE" /></li>
    <li><Pokemon pokemon={reactCachedPokemon} pokemonInfo={info} cacheInfo="REACT_CACHE" /></li>
    <li><Pokemon pokemon={fetchCachedPokemon} pokemonInfo={info} cacheInfo="FETCH_CACHE" /></li>
    <li><Pokemon pokemon={nextCachedPokemon} pokemonInfo={info} cacheInfo="NEXT_CACHE" /></li>
    <li><Pokemon pokemon={staticPokemon} pokemonInfo={info} cacheInfo="STATIC_ENDPOINT" /></li>
    <li><Pokemon pokemon={cacheBustedPokemon} pokemonInfo={info} cacheInfo="CACHE_BUST" /></li>
  </ul>
}