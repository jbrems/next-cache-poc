import { PokemonInfo, Pokemon as PokemonType } from "./pokemon.types";
import { typeColors } from "./pokemon.utils";

const copyrightMode = process.env.COPYRIGHT_MODE === 'true'

export function Pokemon({ pokemon, info }: { pokemon: PokemonType, info: PokemonInfo }) {
  const copyrightClasses =  copyrightMode? 'brightness-0 contrast-[.2]' : ''
  
  return <div className="pokemon flex flex-col items-center bg-neutral-800 rounded-lg w-32 h-40 justify-center">
    <img src={pokemon.img} alt={pokemon.name} className={`h-28 w-28 -mt-2 drop-shadow-[2px_4px_6px_black] ${copyrightClasses}`} />
    {info === 'NAME' && <PokemonName pokemon={pokemon} />}
    {info === 'STATS' && <PokemonStats pokemon={pokemon} />}
    {info === 'TYPES' && <PokemonTypes pokemon={pokemon} />}
  </div>
}

function PokemonName({ pokemon }: { pokemon: PokemonType }) {
  return <p className="flex gap-2 -mt-4">
    <span className="font-bold">#{pokemon.id}</span>
    {!copyrightMode && <span className="capitalize">{pokemon.name}</span>}
  </p>
}

function PokemonStats({ pokemon }: { pokemon: PokemonType }) {
  return <div className="-mt-4">
    <PokemonStat pokemon={pokemon} stat="hp" label="hp" color="green" />
    <PokemonStat pokemon={pokemon} stat="attack" label="att" color="red" />
    <PokemonStat pokemon={pokemon} stat="defense" label="def" color="blue" />
    <PokemonStat pokemon={pokemon} stat="speed" label="spd" color="yellow" />
  </div>
}

function PokemonStat({ pokemon, stat, label, color }: { pokemon: PokemonType, stat: keyof PokemonType['stats'], label: string, color: string }) {
  // Tell Tailwind to bundle these classes (since they will be derived from the color) by adding them to the code
  const _bundleClasses = ['text-green-500', 'bg-green-500', 'bg-green-800', 'text-red-500', 'bg-red-500', 'bg-red-800', 'text-blue-500', 'bg-blue-500', 'bg-blue-800', 'text-yellow-500', 'bg-yellow-500', 'bg-yellow-800']
  
  return <div className="flex items-center gap-1">
    <span className={`w-5 uppercase font-bold text-[10px] text-${color}-500`}>{label}</span>
    <div className="relative">
      <div className={`w-[60px] h-1.5 rounded-full bg-${color}-800`}></div>
      <div className={`absolute top-0 h-1.5 rounded-full bg-${color}-500`} style={{ width: `${pokemon.stats[stat] / 3}px` }}></div>
    </div>
    <span className="text-[10px] text-neutral-400">{pokemon.stats[stat]}</span>
  </div>
}

function PokemonTypes({ pokemon }: { pokemon: PokemonType }) {
  return <p className="font-bold text-neutral-400 flex gap-2">
    {pokemon.types?.map(type => <span key={type} className={typeColors[type]}>{type}</span>)}
  </p>
}