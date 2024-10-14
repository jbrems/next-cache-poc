import { unstable_cache } from "next/cache"
import { cache } from "react"

export type PokemonData = {
  id: number
  name: string
  sprites: { front_default: string }
  stats: { stat: { name: string }, base_stat: number }[]
  types: { type: { name: string } }[]
}

export type Pokemon = {
  id: number
  name: string
  img: string
  stats: {
    hp: number
    attack: number
    defence: number
    speed: number
  }
  type: string
}

export async function getRandomPokemon(): Promise<PokemonData> {
  const randomNumber = Math.ceil(Math.random() * 151)
  return fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`).then(res => res.json())
}

export const getMemoizedPokemon = cache(getRandomPokemon)
export const getCachedPokemon = unstable_cache(getRandomPokemon, ['pokemons'], { tags: ['pokemons'], revalidate: 10 })

export function mapPokemonData(data: PokemonData): Pokemon {
  return {
    id: data.id,
    name: data.name,
    img: data.sprites.front_default,
    stats: {
      hp: getStat(data, 'hp'),
      attack: getStat(data, 'attack'),
      defence: getStat(data, 'defence'),
      speed: getStat(data, 'speed'),
    },
    type: data.types.map(t => t.type.name).join(', '),
  }
}

function getStat(data: PokemonData, stat: keyof Pokemon['stats']): number {
  return data.stats.find(s => s.stat.name === stat)?.base_stat || 0
}

