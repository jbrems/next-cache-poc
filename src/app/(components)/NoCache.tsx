import { getPokemon } from "../(pokemon)/pokemon.service";
import { PokemonTeam } from "../(pokemon)/PokemonTeam";

export async function NoCache() {
  const pokemon1 = await getPokemon()
  const pokemon2 = await getPokemon()
  const pokemon3 = await getPokemon()
  const pokemon4 = await getPokemon()
  const pokemon5 = await getPokemon()

  return <div>
    <h3>No cache (unique fetch URLs)</h3>
    <PokemonTeam pokemons={[pokemon1, pokemon2, pokemon3, pokemon4, pokemon5]}></PokemonTeam>
  </div>
}