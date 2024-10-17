import { unstable_cache } from "next/cache"
import { cache } from "react"
import { Pokemon, PokemonData } from "./pokemon.types"
import { getRandomPokemonId, mapPokemonData } from "./pokemon.utils"

export async function fetchRandomPokemon(fetchOptions?: RequestInit): Promise<Pokemon> {
  return fetch(`${process.env.NEXT_URL}/api/pokemon/random`, fetchOptions).then(res => res.json())
}

export async function fetchStaticPokemon(fetchOptions?: RequestInit): Promise<Pokemon> {
  return fetch(`${process.env.NEXT_URL}/api/pokemon/static`, fetchOptions).then(res => res.json())
}

export async function fetchUniquePokemon(): Promise<Pokemon> {
  return fetch(`${process.env.NEXT_URL}/api/pokemon/random?cache-buster=${Math.random()}`).then(res => res.json())
}

export async function fetchPokemon(): Promise<Pokemon> {
  const pokemonId = getRandomPokemonId()
  console.log(`🆔 Fetching pokemon with id ${pokemonId} from PokeAPI`)
  const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  const pokemonData: PokemonData = await apiResponse.json()
  return mapPokemonData(pokemonData)
}

export const getStoredPokemon = () => fetchRandomPokemon({ cache: 'force-cache' })
export const getMemoizedPokemon = cache(fetchPokemon)
export const getCachedPokemon = unstable_cache(fetchPokemon, ['pokemon'], { tags: ['pokemon'] })

