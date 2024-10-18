import { Pokemon } from "./Pokemon";
import { fetchRandomPokemon, fetchStaticPokemon, fetchUniquePokemon, getNextCachedPokemon, getReactCachedPokemon } from "./pokemon.service";
import { PokemonInfo } from './pokemon.types';

export async function PokemonTeam({ info }: { info: PokemonInfo }) {
  const notCachedPokemon = await fetchRandomPokemon({ cache: 'no-store' })
  const fetchCachedPokemon = await fetchRandomPokemon({ cache: 'force-cache' })
  const reactCachedPokemon = await getReactCachedPokemon()
  const nextCachedPokemon = await getNextCachedPokemon()
  const staticPokemon = await fetchStaticPokemon()
  // const cacheBustedPokemon = await fetchUniquePokemon()

  return <ul className="pokemon-team flex gap-5">
    <li><Pokemon pokemon={notCachedPokemon} pokemonInfo={info} cacheInfo="REQUEST_DEDUPLICATION" /></li>
    <li><Pokemon pokemon={fetchCachedPokemon} pokemonInfo={info} cacheInfo="FETCH_CACHE" /></li>
    <li><Pokemon pokemon={reactCachedPokemon} pokemonInfo={info} cacheInfo="REACT_CACHE" /></li>
    <li><Pokemon pokemon={nextCachedPokemon} pokemonInfo={info} cacheInfo="NEXTJS_CACHE" /></li>
    <li><Pokemon pokemon={staticPokemon} pokemonInfo={info} cacheInfo="STATIC_ENDPOINT" /></li>
    {/*<li><Pokemon pokemon={cacheBustedPokemon} pokemonInfo={info} cacheInfo="CACHE_BUST" /></li> */}
  </ul>
}