import { getRandomPokemonId, mapPokemonData } from "@/app/pokemon/pokemon.utils"
import { NextResponse } from "next/server"

export type PokemonData = {
  id: number
  name: string
  sprites: { front_default: string }
  stats: { stat: { name: string }, base_stat: number }[]
  types: { type: { name: string } }[]
}

export async function GET() {
  const pokemonId = getRandomPokemonId()
  const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  const pokemonData: PokemonData = await apiResponse.json()
  return NextResponse.json(mapPokemonData(pokemonData))
}