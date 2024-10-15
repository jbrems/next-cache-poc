import { PokemonInfo, Pokemon as PokemonType, PokemonType as PokemonTypeType } from "./pokemon.types";

export function Pokemon({ pokemon, info }: { pokemon: PokemonType, info: PokemonInfo }) {
  const copyrightClasses = process.env.COPYRIGHT_MODE === 'true' ? 'brightness-0 contrast-50' : ''
  
  return <div className="flex flex-col items-center bg-neutral-800 rounded-lg w-32 h-40 justify-center">
    <img src={pokemon.img} alt={pokemon.name} className={`h-28 w-28 drop-shadow-[2px_4px_6px_black] ${copyrightClasses}`} />
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
  return <div className="-mt-4">
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
  
  return <div className="flex items-center gap-1 -mt-1">
    <span className={`w-7 uppercase font-bold text-sm text-${color}-500`}>{label}</span>
    <div className="relative">
      <div className={`w-[60px] h-2 rounded-full bg-${color}-800`}></div>
      <div className={`absolute top-0 h-2 rounded-full bg-${color}-500`} style={{ width: `${pokemon.stats[stat] / 3}px` }}></div>
    </div>
    <span className="text-xs text-neutral-400">{pokemon.stats[stat]}</span>
  </div>
}

function PokemonTypes({ pokemon }: { pokemon: PokemonType }) {
  const colors: Record<PokemonTypeType, string> = {
    bug: 'text-green-400',
    dragon: 'text-yellow-600',
    electric: 'text-yellow-400',
    fairy: 'text-pink-600',
    fighting: 'text-red-900',
    fire: 'text-red-600',
    flying: 'text-blue-100',
    ghost: 'text-purple-200',
    grass: 'text-green-600',
    ground: 'text-orange-800',
    ice: 'text-blue-400',
    normal: 'text-neutral-400',
    poison: 'text-purple-500',
    psychic: 'text-purple-600',
    rock: 'text-stone-600',
    water: 'text-blue-500',
  }

  return <p className="font-bold text-neutral-400 flex gap-2">
    {pokemon.types?.map(type => <span key={type} className={colors[type]}>{type}</span>)}
  </p>
}