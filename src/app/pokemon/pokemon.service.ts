import { unstable_cache } from "next/cache"
import { cache } from "react"
import { Pokemon } from "./pokemon.types"
import { getRandomPokemonId } from "./pokemon.utils"

export async function getRandomPokemon(): Promise<Pokemon> {
  return fetch(`${process.env.NEXT_URL}/api/pokemon/random`).then(res => res.json())
}

export async function getPokemon(): Promise<Pokemon> {
  const pokemonId = getRandomPokemonId()
  return fetch(`${process.env.NEXT_URL}/api/pokemon/${pokemonId}`).then(res => res.json())
}

export const getStoredPokemon = () => getRandomPokemon()
export const getMemoizedPokemon = cache(getPokemon)
export const getCachedPokemon = unstable_cache(getPokemon, ['pokemon'], { tags: ['pokemon'] })

