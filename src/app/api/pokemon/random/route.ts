import { fetchPokemon } from "@/app/pokemon/pokemon.service"
import { unstable_noStore } from "next/cache"
import { NextResponse } from "next/server"

export async function GET() {
  unstable_noStore()
  console.log('💚 Fetching pokemon via /api/pokemon/random route handler')
  const pokemon = await fetchPokemon()
  return NextResponse.json(pokemon)
}