import { NextRequest, NextResponse } from "next/server";
import { PokemonData } from "../random/route";
import { mapPokemonData } from "@/app/(pokemon)/pokemon.utils";

export async function GET(_request: NextRequest, { params }: { params: { id: string }}) {
  const pokemonId = params.id
  const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  const pokemonData: PokemonData = await apiResponse.json()
  return NextResponse.json(mapPokemonData(pokemonData))
}