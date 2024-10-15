import { cookies } from "next/headers";
import { getRandomPokemon } from "./(pokemon)/pokemon.service";
import { PokemonTeam } from "./(pokemon)/PokemonTeam";

export async function NoCache() {
  const forceDynamic = cookies().get('dummy-cookie')?.value
  console.log(forceDynamic)

  const pokemon1 = await getRandomPokemon()
  const pokemon2 = await getRandomPokemon()
  const pokemon3 = await getRandomPokemon()
  const pokemon4 = await getRandomPokemon()
  const pokemon5 = await getRandomPokemon()

  return <div>
    <h3>No cache</h3>
    <PokemonTeam pokemons={[pokemon1, pokemon2, pokemon3, pokemon4, pokemon5]}></PokemonTeam>
  </div>
}