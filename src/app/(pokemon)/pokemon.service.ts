import { unstable_cache } from "next/cache"
import { cache } from "react"
import { Pokemon } from "./pokemon.types"

export async function getRandomPokemon(fetchOptions: RequestInit = { cache: 'no-store' }): Promise<Pokemon> {
  console.log('Getting random pokemon')
  return fetch(`${process.env.NEXT_URL}/api/pokemon/random`, fetchOptions).then(res => res.json())
}

export const getStoredPokemon = () => getRandomPokemon({ cache: 'force-cache' })
export const getMemoizedPokemon = cache(getRandomPokemon)
export const getCachedPokemon = unstable_cache(getRandomPokemon, ['pokemons'], { tags: ['pokemons'] })

