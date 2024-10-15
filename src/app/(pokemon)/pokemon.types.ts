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
  type: string
}

export type PokemonInfo = 'NAME' | 'STATS' | 'TYPES'