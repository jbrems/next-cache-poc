import { Pokemon, PokemonData, PokemonType } from "./pokemon.types"

export function mapPokemonData(data: PokemonData): Pokemon {
  return {
    id: data.id,
    name: data.name,
    img: data.sprites.front_default,
    stats: {
      hp: getStat(data, 'hp'),
      attack: getStat(data, 'attack'),
      defense: getStat(data, 'defense'),
      speed: getStat(data, 'speed'),
    },
    types: data.types.map(type => type.type.name as PokemonType),
  }
}

function getStat(data: PokemonData, stat: keyof Pokemon['stats']): number {
  return data.stats.find(s => s.stat.name === stat)?.base_stat || 0
}

export function getRandomPokemonId(): number {
  const maxPokemonId = Math.min(Number(process.env.MAX_POKEMON_ID), 1025)
  return Math.ceil(Math.random() * maxPokemonId)
}

export const typeColors: Record<PokemonType, string> = {
  bug: 'text-green-400 border-green-400',
  dragon: 'text-yellow-600 border-yellow-600',
  electric: 'text-yellow-400 border-yellow-400',
  fairy: 'text-pink-600 border-pink-600',
  fighting: 'text-red-900 border-red-900',
  fire: 'text-red-600 border-red-600',
  flying: 'text-blue-100 border-blue-100',
  ghost: 'text-purple-200 border-purple-200',
  grass: 'text-green-600 border-green-600',
  ground: 'text-orange-800 border-orange-800',
  ice: 'text-blue-400 border-blue-400',
  normal: 'text-neutral-400 border-neutral-400',
  poison: 'text-purple-500 border-purple-500',
  psychic: 'text-purple-600 border-purple-600',
  rock: 'text-stone-600 border-stone-600',
  steel: 'text-neutral-100 border-neutral-100',
  water: 'text-blue-500 border-blue-500',
}