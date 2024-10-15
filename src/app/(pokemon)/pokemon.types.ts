export type Pokemon = {
  id: number
  name: string
  img: string
  stats: {
    hp: number
    attack: number
    defense: number
    speed: number
  }
  types: PokemonType[]
}

export type PokemonInfo = 'NAME' | 'STATS' | 'TYPES'

export type PokemonType = 'bug' | 'dragon' | 'electric' | 'fairy' | 'fighting' | 'fire' | 'flying' | 'ghost' | 'grass' | 'ground' | 'ice' | 'normal' | 'poison' | 'psychic' | 'rock' | 'water'