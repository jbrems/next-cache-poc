import { CacheInfo } from "../cache/cache.types";
import { CacheInfoLabel } from "../cache/CacheInfoLabel";
import { PokemonInfo, Pokemon as PokemonType } from "./pokemon.types";
import { typeColors } from "./pokemon.utils";

const copyrightMode = process.env.COPYRIGHT_MODE === 'true'

export function Pokemon({ pokemon, pokemonInfo, cacheInfo }: { pokemon: PokemonType, pokemonInfo: PokemonInfo, cacheInfo?: CacheInfo }) {
  const copyrightClasses =  copyrightMode? 'brightness-0 contrast-[.2]' : ''
  
  return <div className="pokemon flex flex-col items-center bg-neutral-800 rounded-lg w-32 h-36 p-2 justify-center">
    {cacheInfo && <CacheInfoLabel cacheInfo={cacheInfo} />}
    <img src={pokemon.img} alt={pokemon.name} className={`h-28 w-28 -mb-2 drop-shadow-[2px_4px_6px_black] ${copyrightClasses}`} />
    {pokemonInfo === 'NAME' && <PokemonName pokemon={pokemon} />}
    {pokemonInfo === 'STATS' && <PokemonStats pokemon={pokemon} />}
    {pokemonInfo === 'TYPES' && <PokemonTypes pokemon={pokemon} />}
  </div>
}

function PokemonName({ pokemon }: { pokemon: PokemonType }) {
  return <p className="flex gap-2 text-sm">
    <span className="font-bold">#{pokemon.id}</span>
    {!copyrightMode && <span className="capitalize">{pokemon.name}</span>}
  </p>
}

function PokemonStats({ pokemon }: { pokemon: PokemonType }) {
  return <div className="flex gap-1">
    <PokemonStat pokemon={pokemon} stat="hp" label="hp" color="green" />
    <PokemonStat pokemon={pokemon} stat="attack" label="att" color="red" />
    <PokemonStat pokemon={pokemon} stat="defense" label="def" color="blue" />
    <PokemonStat pokemon={pokemon} stat="speed" label="spd" color="yellow" />
  </div>
}

function PokemonStat({ pokemon, stat, label, color }: { pokemon: PokemonType, stat: keyof PokemonType['stats'], label: string, color: string }) {
  // Tell Tailwind to bundle these classes (since they will be derived from the color) by adding them to the code
  const _bundleClasses = ['text-green-500', 'border-green-800', 'text-red-500', 'border-red-800', 'text-blue-500', 'border-blue-800', 'text-yellow-500', 'border-yellow-800']
  
  return <div className={`rounded-full h-6 w-6 border-[4px] border-${color}-800 flex flex-col items-center justify-center relative`}>
    <span className={`text-[10px] text-${color}-500`}>{pokemon.stats[stat]}</span>
  </div>

}

function PokemonTypes({ pokemon }: { pokemon: PokemonType }) {
  return <p className="font-bold text-sm text-neutral-400 flex gap-2">
    {pokemon.types?.map(type => <span key={type} className={`${typeColors[type]} border border-white rounded-full px-2`}>{type}</span>)}
  </p>
}