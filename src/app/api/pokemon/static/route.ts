import { fetchPokemon } from "@/app/pokemon/pokemon.utils";
import { NextResponse } from "next/server";

export async function GET() {
  const pokemon = await fetchPokemon()
  return NextResponse.json(pokemon)
}