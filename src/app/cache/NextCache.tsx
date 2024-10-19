import { getCachedPokemon } from "../pokemon/pokemon.service";
import { PokemonInfo } from "../pokemon/pokemon.types";
import { PokemonTeam } from "../pokemon/PokemonTeam";
import { ClearNextjsCacheForm } from "./clear-cache/ClearNextjsCacheForm";

export async function NextCache({ info }: { info: PokemonInfo }) {
  const pokemon1 = await getCachedPokemon()
  const pokemon2 = await getCachedPokemon()
  const pokemon3 = await getCachedPokemon()
  const pokemon4 = await getCachedPokemon()
  const pokemon5 = await getCachedPokemon()
  const pokemon6 = await getCachedPokemon()

  return <div>
    <h3>Next cache</h3>
    <PokemonTeam pokemons={[pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6]} info={info} />
    <ClearNextjsCacheForm />
  </div>
}