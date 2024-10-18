import { unstable_cache } from "next/cache"
import { cache } from "react"
import { Pokemon } from "./pokemon.types"

export async function fetchRandomPokemon(fetchOptions?: RequestInit): Promise<Pokemon> {
  return fetch(`${process.env.NEXT_URL}/api/pokemon/random`, fetchOptions).then(res => res.json())
}

export async function fetchStaticPokemon(): Promise<Pokemon> {
  return fetch(`${process.env.NEXT_URL}/api/pokemon/static`).then(res => res.json())
}

export async function fetchUniquePokemon(): Promise<Pokemon> {
  return fetch(`${process.env.NEXT_URL}/api/pokemon/random?cache-buster=${Math.random()}`).then(res => res.json())
}

export const getReactCachedPokemon = cache(() => { 
  console.log('🚀 React cache miss')
  return fetch(`${process.env.NEXT_URL}/api/pokemon/random?from=react-cache`).then(res => res.json()) 
})

export const getNextCachedPokemon = unstable_cache(async () => {
  console.log('🛸 Nextjs cache miss')
  return fetch(`${process.env.NEXT_URL}/api/pokemon/random?from=nextjs-cache`).then(res => res.json())
}, ['pokemon'], { tags: ['pokemon'] })
