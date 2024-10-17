import { NextResponse } from "next/server";
import { fetchPokemon } from "@/app/pokemon/pokemon.service";

export async function GET() {
  console.log('🟧 Fetching pokemon via /api/pokemon/static route handler')
  const pokemon = await fetchPokemon()
  return NextResponse.json(pokemon)
}