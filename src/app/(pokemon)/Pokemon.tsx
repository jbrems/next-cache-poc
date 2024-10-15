import { PokemonInfo, Pokemon as PokemonType } from "./pokemon.types";

export function Pokemon({ pokemon, info }: { pokemon: PokemonType, info: PokemonInfo }){
  return <div className="flex flex-col items-center">
    <img src={pokemon.img} alt={pokemon.name} className="h-28 w-28" />
    {info === 'NAME' && <PokemonName pokemon={pokemon} />}
    {info === 'STATS' && <PokemonStats pokemon={pokemon} />}
    {info === 'TYPES' && <PokemonTypes pokemon={pokemon} />}
  </div>
}

function PokemonName({ pokemon }: { pokemon: PokemonType }) {
  return <p className="flex gap-2 -mt-4">
    <span className="font-bold">#{pokemon.id}</span>
    <span className="capitalize">{pokemon.name}</span>
  </p>
}

function PokemonStats({ pokemon }: { pokemon: PokemonType }) {
  return <div>
    <PokemonStat pokemon={pokemon} stat="hp" label="hp" color="green" />
    <PokemonStat pokemon={pokemon} stat="attack" label="att" color="red" />
    <PokemonStat pokemon={pokemon} stat="defense" label="def" color="blue" />
    <PokemonStat pokemon={pokemon} stat="speed" label="spd" color="yellow" />
  </div>
}

function PokemonStat({ pokemon, stat, label, color }: { pokemon: PokemonType, stat: keyof PokemonType['stats'], label: string, color: string }) {
  const possibleClasses = [
    'text-green-500', 'bg-green-500', 'bg-green-800',
    'text-red-500', 'bg-red-500', 'bg-red-800',
    'text-blue-500', 'bg-blue-500', 'bg-blue-800',
    'text-yellow-500', 'bg-yellow-500', 'bg-yellow-800',
  ]
  
  return <div className="flex items-center gap-1">
    <span className={`w-7 uppercase font-bold text-sm text-${color}-500`}>{label}</span>
    <div className="relative">
      <div className={`w-[60px] h-2 rounded-full bg-${color}-800`}></div>
      <div className={`absolute top-0 h-2 rounded-full bg-${color}-500`} style={{ width: `${pokemon.stats[stat] / 3}px` }}></div>
    </div>
    <span className="text-xs text-neutral-400">{pokemon.stats[stat]}</span>
  </div>
}

function PokemonTypes({ pokemon }: { pokemon: PokemonType }) {
  return <span className="font-bold text-neutral-400">{pokemon.type}</span>
}