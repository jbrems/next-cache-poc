import { ClearCacheForm } from "./cache/clear-cache/ClearCacheForm"
import { PokemonTeam } from "./pokemon/PokemonTeam"

// Since this page relies on data fetched from the api endpoints this app exposes, it cannot be rendered at build time
export const dynamic = 'force-dynamic'

export default async function Home() {
  return <>
    <h3>Team 1</h3>
    <PokemonTeam info="NAME" />
    <h3>Team 2</h3>
    <PokemonTeam info="NAME" />
    <h3>Team 3</h3>
    <PokemonTeam info="NAME" />
    <ClearCacheForm />
  </>
}
