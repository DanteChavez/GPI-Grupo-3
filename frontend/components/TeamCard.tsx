import Link from "next/link";

interface TeamCardProps {
  id: string;
  name: string;
  league: string;
  position?: number;
  stadium_name?: string;
  squad_size?: number;
}

export default function TeamCard({ id, name, league, position, stadium_name, squad_size }: TeamCardProps) {
  return (
    <Link href={`/teams/${id}`}>
      <div className="group glass-card rounded-2xl p-6 transition-all duration-500 cursor-pointer flex flex-col hover-lift hover-glow">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center text-2xl font-bold text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20">
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors duration-300 line-clamp-1">{name}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">{league}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {stadium_name && (
            <div className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 line-clamp-1">
              🏟️ {stadium_name}
            </div>
          )}
          {squad_size && (
            <div className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
              👥 {squad_size} Jugadores
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
