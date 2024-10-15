import { getStoredPokemon } from "../(pokemon)/pokemon.service";
import { PokemonInfo } from "../(pokemon)/pokemon.types";
import { PokemonTeam } from "../(pokemon)/PokemonTeam";

export async function FetchCache({ info }: { info: PokemonInfo }) {
  const pokemon1 = await getStoredPokemon()
  const pokemon2 = await getStoredPokemon()
  const pokemon3 = await getStoredPokemon()
  const pokemon4 = await getStoredPokemon()
  const pokemon5 = await getStoredPokemon()
  const pokemon6 = await getStoredPokemon()

  return <div>
    <h3>Fetch cache</h3>
    <PokemonTeam pokemons={[pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6]} info={info} />
  </div>
}