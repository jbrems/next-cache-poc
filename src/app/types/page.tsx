import { ClearNextjsCacheForm } from "../cache/clear-cache/ClearNextjsCacheForm";
import { ClearPathCacheForm } from "../cache/clear-cache/ClearPathCacheForm";
import { PokemonTeam } from "../pokemon/PokemonTeam";

// Since this page relies on data fetched from the api endpoints this app exposes, it cannot be rendered at build time
export const dynamic = 'force-dynamic'

export default function TypesPage() {
  return <>
    <h3>Team 1</h3>
    <PokemonTeam info="TYPES" />
    <h3>Team 2</h3>
    <PokemonTeam info="TYPES" />
    <h3>Team 3</h3>
    <PokemonTeam info="TYPES" />
    <div className="flex gap-4">
      <ClearNextjsCacheForm />
      <ClearPathCacheForm />
    </div>
  </>
}