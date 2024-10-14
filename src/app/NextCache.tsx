import { getCachedPokemon } from "./(pokemon)/pokemon.service";
import { PokemonTeam } from "./(pokemon)/PokemonTeam";

export async function NextCache() {
  const pokemon1 = await getCachedPokemon()
  const pokemon2 = await getCachedPokemon()
  const pokemon3 = await getCachedPokemon()
  const pokemon4 = await getCachedPokemon()
  const pokemon5 = await getCachedPokemon()

  return <div>
    <h3>Next cache</h3>
    <PokemonTeam pokemons={[pokemon1, pokemon2, pokemon3, pokemon4, pokemon5]}></PokemonTeam>
  </div>
}