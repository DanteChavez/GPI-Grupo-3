import Link from "next/link";
import Image from "next/image";
import PlayerImage from "./PlayerImage";

interface PlayerCardProps {
  id: string;
  name: string;
  team: string;
  position: string;
  number?: number;
  image_url?: string;
  market_value_in_eur?: number;
  country_of_citizenship?: string;
}

export default function PlayerCard({ id, name, team, position, number, image_url, market_value_in_eur, country_of_citizenship }: PlayerCardProps) {
  const formattedValue = market_value_in_eur 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', notation: 'compact', maximumFractionDigits: 1 }).format(market_value_in_eur) 
    : 'N/A';

  return (
    <Link href={`/players/${id}`}>
      <div className="group glass-card rounded-2xl p-6 transition-all duration-500 cursor-pointer flex flex-col items-center text-center hover-lift hover-glow relative overflow-hidden">
        
        {country_of_citizenship && (
          <span className="absolute top-4 left-4 text-xs font-semibold px-2 py-1 rounded bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 backdrop-blur-sm z-10 border border-black/5 dark:border-white/10">
            {country_of_citizenship}
          </span>
        )}

        <div className="relative w-28 h-28 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 mb-4 overflow-hidden border-4 border-white/50 dark:border-zinc-950/50 shadow-sm group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-500 z-10">
          {image_url ? (
            <PlayerImage 
              src={image_url} 
              alt={name} 
              className="object-cover" 
              sizes="(max-width: 112px) 100vw, 112px" 
              fallbackNode={
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-zinc-300 dark:text-zinc-600 group-hover:text-emerald-400 transition-colors duration-300">
                  {name.charAt(0)}
                </div>
              }
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-zinc-300 dark:text-zinc-600 group-hover:text-emerald-400 transition-colors duration-300">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors duration-300 z-10">{name}</h3>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium z-10 line-clamp-1">{team}</p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-4 w-full z-10">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/40 transition-colors duration-300 border border-transparent dark:group-hover:border-emerald-500/30">
            {position}
          </span>
          {market_value_in_eur && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 group-hover:border-emerald-400 transition-all duration-300">
              {formattedValue}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
