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
  return Math.ceil(Math.random() * 151)
}

export const typeColors: Record<PokemonType, string> = {
  bug: 'text-green-400',
  dragon: 'text-yellow-600',
  electric: 'text-yellow-400',
  fairy: 'text-pink-600',
  fighting: 'text-red-900',
  fire: 'text-red-600',
  flying: 'text-blue-100',
  ghost: 'text-purple-200',
  grass: 'text-green-600',
  ground: 'text-orange-800',
  ice: 'text-blue-400',
  normal: 'text-neutral-400',
  poison: 'text-purple-500',
  psychic: 'text-purple-600',
  rock: 'text-stone-600',
  steel: 'text-neutral-100',
  water: 'text-blue-500',
}