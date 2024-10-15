import { PokemonData } from "../api/pokemon/random/route"
import { Pokemon, PokemonType } from "./pokemon.types"

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