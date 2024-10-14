import { getMemoizedPokemon } from "./(pokemon)/pokemon.service";
import { PokemonTeam } from "./(pokemon)/PokemonTeam";

export async function ReactCache() {
  const pokemon1 = await getMemoizedPokemon()
  const pokemon2 = await getMemoizedPokemon()
  const pokemon3 = await getMemoizedPokemon()
  const pokemon4 = await getMemoizedPokemon()
  const pokemon5 = await getMemoizedPokemon()

  return <div>
    <h3>React cache (memoization)</h3>
    <PokemonTeam pokemons={[pokemon1, pokemon2, pokemon3, pokemon4, pokemon5]}></PokemonTeam>
  </div>
}