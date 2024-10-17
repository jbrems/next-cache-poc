import { fetchRandomPokemon } from "../pokemon/pokemon.service";
import { PokemonInfo } from "../pokemon/pokemon.types";
import { PokemonTeam } from "../pokemon/PokemonTeam";

export async function NoCache({ info }: { info: PokemonInfo }) {
  const pokemon1 = await fetchRandomPokemon({ cache: 'no-store' })
  const pokemon2 = await fetchRandomPokemon({ cache: 'no-store' })
  const pokemon3 = await fetchRandomPokemon({ cache: 'no-store' })
  const pokemon4 = await fetchRandomPokemon({ cache: 'no-store' })
  const pokemon5 = await fetchRandomPokemon({ cache: 'no-store' })
  const pokemon6 = await fetchRandomPokemon({ cache: 'no-store' })

  return <div>
    <h3>No cache</h3>
    <PokemonTeam pokemons={[pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6]} info={info} />
  </div>
}