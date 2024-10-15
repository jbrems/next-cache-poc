import { getPokemon } from "../(pokemon)/pokemon.service";
import { PokemonInfo } from "../(pokemon)/pokemon.types";
import { PokemonTeam } from "../(pokemon)/PokemonTeam";

export async function NoCache({ info }: { info: PokemonInfo }) {
  const pokemon1 = await getPokemon()
  const pokemon2 = await getPokemon()
  const pokemon3 = await getPokemon()
  const pokemon4 = await getPokemon()
  const pokemon5 = await getPokemon()
  const pokemon6 = await getPokemon()

  return <div>
    <h3>No cache</h3>
    <PokemonTeam pokemons={[pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6]} info={info} />
  </div>
}